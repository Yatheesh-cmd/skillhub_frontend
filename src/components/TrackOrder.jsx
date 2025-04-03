import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Badge } from 'react-bootstrap'; // Added Badge import
import { getOrderStatusApi } from '../services/api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const newOrder = location.state?.order;

  useEffect(() => {
    console.log('TrackOrder mounted. New order from location.state:', newOrder);

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOrderStatusApi();
        console.log('API Response:', response);

        if (response.status === 200) {
          const fetchedOrders = response.data || [];
          console.log('Fetched Orders:', fetchedOrders);

          if (newOrder && !fetchedOrders.some(order => order._id === newOrder._id)) {
            setOrders([newOrder, ...fetchedOrders]);
            toast.success('New order added to tracking');
          } else {
            setOrders(fetchedOrders);
          }

          if (fetchedOrders.length === 0 && !newOrder) {
            setError('No orders found in your account.');
          }
        } else {
          setError('Failed to load orders. Status: ' + response.status);
          toast.error('Failed to load orders');
        }
      } catch (error) {
        console.error('Fetch orders error:', error.response || error.message);
        const errorMsg = error.response?.data?.message || error.message || 'Network error occurred';
        setError(errorMsg);

        if (errorMsg === 'No authentication token found. Please log in.' || errorMsg === 'Invalid token') {
          toast.error('Session expired. Please log in again.');
          sessionStorage.clear();
          navigate('/auth');
        } else {
          toast.error(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [newOrder, navigate]);

  return (
    <Container className="py-5" style={{ minHeight: '100vh' }}>
      <h2 className="mb-4 fw-bold" style={{ color: '#1a1a1a' }}>Track Your Orders</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" role="status" />
          <p className="mt-2 text-muted">Loading your orders...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="rounded-3 text-center">
          {error}
        </Alert>
      ) : orders.length > 0 ? (
        orders.map(order => (
          <Card key={order._id} className="mb-4 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Header className="bg-light py-3">
              <h4 className="mb-1">
                Order #{order._id} -{' '}
                <Badge bg={order.status === 'Completed' ? 'success' : 'warning'}>
                  {order.status}
                </Badge>
              </h4>
              <p className="text-muted mb-0">Placed by: {order.username || 'Unknown'}</p>
              <p className="text-muted mb-0">Date: {new Date(order.createdAt).toLocaleString()}</p>
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                {order.courses && order.courses.length > 0 ? (
                  order.courses.map((item, index) => (
                    <ListGroup.Item key={index} className="border-0 py-2">
                      {item.courseId?.title || 'Unknown Course'} - <i class="fa-solid fa-indian-rupee-sign"></i>{item.price?.toFixed(2) || 'N/A'} x{' '}
                      {item.quantity || 1}
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No courses found in this order.</ListGroup.Item>
                )}
              </ListGroup>
              <Card.Text className="mt-3 fw-semibold">
                <strong>Total:</strong> ${order.total?.toFixed(2) || 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="info" className="rounded-3 text-center">
          No orders found. Start by enrolling in a course!
        </Alert>
      )}
    </Container>
  );
}

export default TrackOrder;