import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Container, Alert } from 'react-bootstrap';
import ProgressTracker from '../components/ProgressTracker';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';

import { getUserCourses, getCart } from '../services/api';
import { cartContext, wishlistContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function UserDashboard() {
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);

  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const result = await getCart();
        if (result.status === 200) {
          const serverCart = result.data.cart.courses.map(item => ({
            ...item.courseId,
            quantity: item.quantity,
          }));
          setCart(serverCart);
        }
      } catch (error) {
        console.error('Failed to fetch initial cart:', error);
        toast.error('Failed to load cart from server');
      }
    };
    fetchInitialCart();
    getData();
    setUsername(sessionStorage.getItem('user') || 'User');
  }, []);

  useEffect(() => {
    getData();
  }, [cart, wishlist]);

  const getData = async () => {
    try {
      const result = await getUserCourses();
      if (result.status === 200) {
        const enrolledCourses = result.data || [];
        const enrolledCoursesWithSource = enrolledCourses.map(course => ({
          ...course,
          source: 'enrolled',
        }));
        const cartCourses = cart.map(cartItem => {
          console.log('Cart item in UserDashboard:', cartItem);
          return {
            _id: cartItem._id,
            title: cartItem.title,
            instructor: cartItem.instructor || 'Instructor Not Available',
            image: cartItem.image || 'https://via.placeholder.com/150',
            progress: cartItem.progress || 0,
            source: 'cart',
            isFromCart: true,
          };
        });
        console.log('Enrolled courses:', enrolledCourses);
        console.log('Cart courses:', cartCourses);
        setCourses([...enrolledCoursesWithSource, ...cartCourses]);
        setError(null);
      } else {
        setCourses([]);
        setError('Failed to load courses');
        toast.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Fetch user courses error:', error.message);
      setCourses([]);
      setError(error.message || 'Network error occurred');
      toast.error(error.message || 'Failed to fetch courses');
    }
  };

  return (
    <Container
      fluid
      className="py-5"
      style={{
        minHeight: '100vh',
        background: '#f4f7fc',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Card
        className="mb-5 border-0 shadow-sm"
        style={{
          borderRadius: '16px',
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <Card.Body className="p-5 d-flex align-items-center">
          <div>
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.25rem', color: '#1a1a1a' }}>
              Welcome back, <span style={{ color: '#4a00e0' }}>{username} 👨‍💻</span>
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
              Continue your learning journey with <strong>SkillHub</strong>
            </p>
          </div>
        </Card.Body>
      </Card>
      <Link to={'/courses'} className="btn btn-outline-danger mb-2 mt-2">View Courses</Link>
    
<Link to={'/track-order'} className="btn btn-outline-primary mb-2 mt-2 ms-2">Track Orders</Link>
    


      <Row className="g-4">
        <Col lg={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: '16px', background: '#ffffff' }}
          >
            <Card.Header
              className="py-3 px-4"
              style={{
                background: '#ffffff',
                borderBottom: '1px solid #e9ecef',
                borderRadius: '16px 16px 0 0',
              }}
            >
              <h3 className="fw-semibold mb-0" style={{ fontSize: '1.5rem', color: '#1a1a1a' }}>
                Enrolled Courses 📚
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error ? (
                <Alert variant="danger" className="rounded-3 text-center">
                  {error}
                </Alert>
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <Card
                    key={`${course._id}-${course.source}`} // Updated to composite key
                    className="mb-3 border-0 shadow-sm"
                    style={{
                      borderRadius: '12px',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <Card.Body className="p-3 d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h4 className="fw-medium mb-2" style={{ fontSize: '1.25rem', color: '#333' }}>
                          {course.title}
                        </h4>
                        <p className="text-muted mb-3" style={{ fontSize: '1rem' }}>
                          Instructor: {course.instructor || 'Instructor Not Available'} {course.isFromCart && '(Added to Cart)'}
                        </p>
                        <ProgressTracker
                          courseId={course._id}
                          initialProgress={course.progress || 0}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info" className="rounded-3 text-center">
                  No enrolled courses yet
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="d-flex flex-column gap-4">
            <Cart />
            <Wishlist />
          </div>
        </Col>

       
      </Row>
    </Container>
  );
}

export default UserDashboard;