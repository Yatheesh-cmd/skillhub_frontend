import React, { useState, useContext } from 'react';
import { Card, Modal, Button, Badge } from 'react-bootstrap';
import { cartContext, wishlistContext } from '../context/ContextApi';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import Review from './Review';

function CourseCard({ course }) {
  const [show, setShow] = useState(false);
  const { addToCart } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishlistContext);

  console.log('Course prop in CourseCard:', course);

  const handleAddToCart = () => {
    if (!course._id) {
      console.warn('Cannot add course without _id:', course);
      toast.error('Invalid course data');
      return;
    }
    addToCart(course);
    toast.success("Added to cart");
  };

  const addToWishlist = () => {
    if (!course._id) {
      console.warn('Cannot add course without _id to wishlist:', course);
      toast.error('Invalid course data');
      return;
    }
    if (!wishlist.some(item => item._id === course._id)) {
      setWishlist([...wishlist, course]);
      toast.success("Added to wishlist");
    } else {
      toast.info("Already in wishlist");
    }
  };

  return (
    <>
      <Card
        className="shadow-sm border-0 h-100"
        style={{
          width: '20rem',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
        }}
      >
        <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={course.image ? `${base_url}/uploads/${course.image}` : '/images/course-placeholder.jpg'}
            alt={course.title}
            className="h-100 w-100 object-fit-cover"
            onClick={() => setShow(true)}
            style={{ cursor: 'pointer', transition: 'transform 0.5s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <Badge
            bg="primary"
            className="position-absolute top-0 end-0 mt-2 me-2 text-white fw-semibold"
            style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem' }}
          >
            {course.category || 'Premium'}
          </Badge>
        </div>

        <Card.Body className="p-4">
          <Card.Title
            className="fw-bold mb-2"
            style={{ fontSize: '1.25rem', color: '#1a1a1a' }}
          >
            {course.title}
          </Card.Title>
          <Card.Text
            className="text-muted mb-3"
            style={{ fontSize: '0.95rem', lineHeight: '1.5' }}
          >
            {course.description?.substring(0, 60)}...
          </Card.Text>
          {course.instructor && (
            <Badge bg="danger" className="mb-2" style={{ fontSize: '0.9rem' }}>
              {course.instructor}
            </Badge>
          )}
          {course.date && (
            <Card.Text
              className="text-muted mb-3"
              style={{ fontSize: '0.9rem', lineHeight: '1.5' }}
            >
              <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
            </Card.Text>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              style={{
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#4a00e0',
                border: 'none',
                fontWeight: '500',
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline-secondary"
              onClick={addToWishlist}
              style={{
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                fontWeight: '500',
              }}
            >
              <i className="fa-solid fa-heart"></i> Wishlist
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
      >
        <Modal.Header
          closeButton
          style={{
            background: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)', // Professional purple gradient
            color: '#fff',
            borderBottom: 'none',
            borderRadius: '12px 12px 0 0',
            padding: '1.5rem',
          }}
        >
          <Modal.Title>
            <i className="fa-solid fa-book me-2"></i> {course.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-4"
          style={{ backgroundColor: '#f8f9ff', borderRadius: '0 0 12px 12px' }}
        >
          <img
            src={course.image ? `${base_url}/uploads/${course.image}` : 'https://via.placeholder.com/150'}
            alt={course.title}
            className="w-100 mb-4 rounded shadow-sm"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          <div className="mb-4">
            <h5 className="fw-semibold" style={{ color: '#1a1a1a' }}>
              <i className="fa-solid fa-info-circle me-2 text-primary"></i> Course Description
            </h5>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: '1.6' }}>
              {course.description}
            </p>
          </div>
          <div className="d-flex flex-column gap-3">
            {course.instructor && (
              <p style={{ fontSize: '0.95rem', color: '#555' }}>
                <i className="fa-solid fa-chalkboard-teacher me-2 text-danger"></i>
                <strong>Instructor:</strong> {course.instructor}
              </p>
            )}
            {course.instructorPhone && (
              <p style={{ fontSize: '0.95rem', color: '#555' }}>
                <i className="fa-solid fa-phone me-2 text-success"></i>
                <strong>Contact:</strong> {course.instructorPhone}
              </p>
            )}
            {course.date && (
              <p style={{ fontSize: '0.95rem', color: '#555' }}>
                <i className="fa-solid fa-calendar-alt me-2 text-info"></i>
                <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
              </p>
            )}
            <p style={{ fontSize: '1.1rem', color: '#4a00e0', fontWeight: 'bold' }}>
              <i className="fa-solid fa-dollar-sign me-2 text-warning"></i>
              Price: <i class="fa-solid fa-indian-rupee-sign"></i>{course.price}
            </p>
          </div>
          <Review courseId={course._id} />
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: '#f8f9ff',
            borderTop: '1px solid #e9ecef',
            padding: '1rem 1.5rem',
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            style={{
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)', // Gray gradient for Close
              border: 'none',
              color: '#fff',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <i className="fa-solid fa-times me-2"></i> Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            style={{
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)', // Purple gradient for Enroll
              border: 'none',
              color: '#fff',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <i className="fa-solid fa-cart-plus me-2"></i> Enroll Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseCard;