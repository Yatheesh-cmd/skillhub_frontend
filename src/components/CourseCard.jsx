import React, { useState, useContext } from 'react';
import { Card, Modal, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { cartContext, wishlistContext } from '../context/ContextApi';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import Review from './Review';

function CourseCard({ course }) {
  const [show, setShow] = useState(false);
  const { addToCart } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishlistContext);

  const handleAddToCart = () => {
    if (!course._id) {
      toast.error('Invalid course data');
      return;
    }
    addToCart(course);
    toast.success('Course added to cart!');
  };

  const addToWishlist = () => {
    if (!course._id) {
      toast.error('Invalid course data');
      return;
    }
    if (!wishlist.some(item => item._id === course._id)) {
      setWishlist([...wishlist, course]);
      toast.success('Added to wishlist!');
    } else {
      toast.info('Course already in wishlist');
    }
  };

  return (
    <>
      <Card
        className="h-100 border-0 shadow-sm"
        style={{
          width: '21rem',
          borderRadius: '15px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={course.image ? `${base_url}/uploads/${course.image}` : '/images/course-placeholder.jpg'}
            alt={course.title}
            className="h-100 w-100"
            style={{
              objectFit: 'cover',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => setShow(true)}
          />
          <Badge bg="success" className="position-absolute top-0 end-0 m-2">
            {course.category || 'Available'}
          </Badge>
        </div>
        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: '1rem' }}>
            {course.title}
          </Card.Title>
          <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.85rem' }}>
            {course.description?.substring(0, 60)}...
          </Card.Text>
          {course.instructor && (
            <Card.Text className="text-muted small">
              <i className="fa-solid fa-chalkboard-teacher me-1" style={{ color: '#2c5282' }}></i> {course.instructor}
            </Card.Text>
          )}
          {course.date && (
            <Card.Text className="text-muted small">
              <i className="fa-solid fa-calendar-alt me-1" style={{ color: '#718096' }}></i> {new Date(course.date).toLocaleDateString()}
            </Card.Text>
          )}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <OverlayTrigger placement="top" overlay={<Tooltip>Add Course to Cart</Tooltip>}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                style={{
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0056b3 0%, #003d82 100%)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fa-solid fa-cart-plus me-2" style={{ color: '#fff' }}></i> Add to Cart
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Add to Wishlist</Tooltip>}>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={addToWishlist}
                style={{
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontWeight: '500',
                  borderColor: '#dc3545',
                  color: '#dc3545',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc3545';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#dc3545';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fa-solid fa-heart me-2"></i> Wishlist
              </Button>
            </OverlayTrigger>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header className="bg-primary text-white border-0" style={{ borderRadius: '15px 15px 0 0' }}>
          <Modal.Title>
            <i className="fa-solid fa-graduation-cap me-2" style={{ color: '#ffffff' }}></i> {course.title}
          </Modal.Title>
          <Button variant="link" className="text-white" onClick={() => setShow(false)}>
            <i className="fa-solid fa-times" style={{ color: '#ffffff' }}></i>
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          <img
            src={course.image ? `${base_url}/uploads/${course.image}` : 'https://via.placeholder.com/150'}
            alt={course.title}
            className="w-100 rounded mb-4 shadow-sm"
            style={{ maxHeight: '250px', objectFit: 'cover' }}
          />
          <h5 className="fw-semibold text-dark mb-3">
            <i className="fa-solid fa-info-circle me-2" style={{ color: '#3182ce' }}></i> Course Details
          </h5>
          <p className="text-muted mb-4">{course.description}</p>
          <div className="d-flex flex-column gap-2">
            {course.instructor && (
              <p>
                <i className="fa-solid fa-chalkboard-teacher me-2" style={{ color: '#2c5282' }}></i>
                <strong>Instructor:</strong> {course.instructor}
              </p>
            )}
            {course.instructorPhone && (
              <p>
                <i className="fa-solid fa-phone me-2" style={{ color: '#38a169' }}></i>
                <strong>Contact:</strong> {course.instructorPhone}
              </p>
            )}
            {course.date && (
              <p>
                <i className="fa-solid fa-calendar-alt me-2" style={{ color: '#718096' }}></i>
                <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
              </p>
            )}
            {course.price && (
              <p className="fw-bold text-success">
                <strong>Price:</strong> ₹{course.price}
              </p>
            )}
          </div>
          <Review courseId={course._id} />
        </Modal.Body>
        <Modal.Footer className="bg-light border-0">
          <Button
            variant="outline-secondary"
            onClick={() => setShow(false)}
            style={{
              background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              color: '#fff',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #495057 0%, #343a40 100%)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i className="fa-solid fa-times me-2" style={{ color: '#fff' }}></i> Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            style={{
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              color: '#fff',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #0056b3 0%, #003d82 100%)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i className="fa-solid fa-cart-plus me-2" style={{ color: '#fff' }}></i> Enroll Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseCard;