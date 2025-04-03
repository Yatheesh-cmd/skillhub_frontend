import React, { useState, useContext, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { cartContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import { initiatePaymentApi, verifyPaymentApi, updateCartApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from 'react-razorpay';

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    console.log('Cart.jsx version: Updated with Razorpay');
    console.log('Current cart:', cart);
    const ids = cart.map(item => item._id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.warn('Duplicate IDs in cart:', duplicates);
    }
  }, [cart]);

  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (cart.length > 0 && sessionStorage.getItem('token')) {
        const validCart = cart.filter(item => {
          const isValidId = item._id && /^[0-9a-fA-F]{24}$/.test(item._id);
          if (!isValidId) {
            console.warn('Invalid course ID detected:', item);
            toast.error(`Invalid course ID: ${item._id || 'unknown'}`);
          }
          return isValidId;
        });

        if (validCart.length === 0) {
          console.log('No valid cart items to sync');
          return;
        }

        try {
          const cartData = validCart.map(item => ({
            courseId: item._id,
            quantity: item.quantity || 1,
          }));
          console.log('Sending cart to backend:', cartData);
          await updateCartApi({ cart: cartData });
          console.log('Cart synced successfully');
        } catch (error) {
          console.error('Sync error:', error);
          toast.error('Failed to sync cart with server: ' + error.message);
        }
      }
    };
    syncCartWithBackend();
  }, [cart]);

  const updateQuantity = async (id, delta) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    setCart(updatedCart);
    try {
      const cartData = updatedCart.map(item => ({
        courseId: item._id,
        quantity: item.quantity || 1,
      }));
      console.log('Sending updated cart:', cartData);
      await updateCartApi({ cart: cartData });
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update cart: ' + error.message);
    }
  };

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    toast.info("Item removed from cart");
    try {
      const cartData = updatedCart.map(item => ({
        courseId: item._id,
        quantity: item.quantity || 1,
      }));
      console.log('Sending updated cart after removal:', cartData);
      await updateCartApi({ cart: cartData });
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Failed to update cart: ' + error.message);
    }
  };

  const validateCart = () => {
    if (cart.length === 0) {
      toast.warning("Cart is empty");
      return false;
    }
    const invalidItems = cart.filter(item => {
      const hasPrice = item.price && !isNaN(Number(item.price)) && Number(item.price) > 0;
      const hasQuantity = item.quantity && !isNaN(Number(item.quantity)) && Number(item.quantity) > 0;
      return !hasPrice || !hasQuantity;
    });
    if (invalidItems.length > 0) {
      console.warn('Invalid cart items:', invalidItems);
      toast.warning("Cart contains items with invalid price or quantity");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCart()) return;
    setLoading(true);

    try {
      const paymentCart = cart.map(item => ({
        _id: item._id,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
      }));
      console.log('Cart data sent to payment API:', paymentCart);

      const response = await initiatePaymentApi(paymentCart);
      if (response.status !== 200 || !response.data.orderId) {
        throw new Error(response.data?.message || "Failed to initiate payment");
      }

      const { orderId, amount, currency, dbOrderId } = response.data;

      const options = {
        key: 'rzp_test_BQZeGK1Esi5rzS', // Hardcoded test key for development
        amount,
        currency,
        order_id: orderId,
        name: 'SkillHub Learning',
        description: 'Payment for courses',
        handler: async (response) => {
          try {
            const verifyResponse = await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId,
            });
            if (verifyResponse.status === 200 && verifyResponse.data.order) {
              toast.success("Payment successful!");
              setCart([]); // Clear the cart locally
              navigate('/track-order', { state: { order: verifyResponse.data.order } });
            } else {
              throw new Error(verifyResponse.data?.message || "Payment verification failed");
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error(error.message || "Payment verification failed");
          }
        },
        prefill: {
          name: 'User Name', // Replace with dynamic user data if available
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        toast.error('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(error.message || "Payment initiation failed");
      if (error.message === 'No authentication token found. Please log in.' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className="border p-3">
      <h2>Cart 🛒({cart.length})</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={`${item._id}-${index}`} className="border p-2 mb-2 d-flex justify-content-between align-items-center">
              <span>{item.title} - ₹{Number(item.price).toFixed(2)} x {item.quantity || 1}</span>
              <div>
                <Button variant="outline-primary" size="sm" onClick={() => updateQuantity(item._id, 1)} className="me-2">+</Button>
                <Button variant="outline-primary" size="sm" onClick={() => updateQuantity(item._id, -1)} className="me-2">-</Button>
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item._id)}>Remove</Button>
              </div>
            </div>
          ))}
          <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
          <Button variant="success" onClick={handlePayment} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Proceed to Payment'}
          </Button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;