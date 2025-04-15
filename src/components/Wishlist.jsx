import React, { useContext } from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { wishlistContext, cartContext } from '../context/ContextApi';
import { toast } from 'react-toastify';

function Wishlist() {
  const { wishlist, setWishlist } = useContext(wishlistContext);
  const { setCart } = useContext(cartContext);

  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((item) => item._id !== itemId));
    toast.success('Item removed from wishlist');
  };

  const moveToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setWishlist(wishlist.filter((w) => w._id !== item._id));
    toast.success('Moved to cart');
  };

  return (
    <div className="wishlist-container mt-4">
      <h2 className="fw-semibold text-secondary mb-3">Your Wishlist <i className="fa-solid fa-shield-heart"></i></h2>
      {wishlist.length > 0 ? (
        <ListGroup variant="flush">
          {wishlist.map((item) => (
            <ListGroup.Item
              key={item._id}
              className="d-flex justify-content-between align-items-center border-0 py-3 modern-wishlist-item"
            >
              <div className="d-flex align-items-center">
                {/* <div className="wishlist-item-img me-3">
                  <img
                    src={item.image || 'https://via.placeholder.com/50'}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div> */}
                <div>
                  <h5 className="mb-1 fw-medium text-dark">{item.title}</h5>
                  <Badge bg="dark" className="rounded-pill">
                  ₹{item.price || 49.99}
                  </Badge>
                </div>
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill modern-btn me-2"
                  onClick={() => moveToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill modern-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted text-center py-3">Your wishlist is empty</p>
      )}
    </div>
  );
}

export default Wishlist;