import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import AddCourse from '../components/AddCourse';
import EditCourse from '../components/EditCourse';
import { getAdminCourses, deleteCourseApi } from '../services/api';
import { toast } from 'react-toastify';
import { courseResponseContext } from '../context/ContextApi';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const { courseResponse } = React.useContext(courseResponseContext);

  useEffect(() => {
    getData();
  }, [courseResponse]);

  const getData = async () => {
    try {
      const result = await getAdminCourses();
      if (result.status === 200) {
        setCourses(result.data);
      } else {
        toast.error('Failed to load courses');
      }
    } catch (error) {
      toast.error('Network error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const result = await deleteCourseApi(id);
        if (result.status === 200) {
          toast.success('Course deleted successfully');
          setCourses(courses.filter(course => course._id !== id));
        } else {
          toast.error('Failed to delete course');
        }
      } catch (error) {
        toast.error('Network error occurred');
      }
    }
  };

  return (
    <Container fluid className="py-5" style={{ background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)', minHeight: '100vh' }}>
      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <Card.Header
              className="text-white py-4 px-4"
              style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }} // Professional blue gradient
            >
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0 fw-bold" style={{ fontSize: '1.75rem' }}>
                  <i className="fa-solid fa-user-shield me-2"></i> Admin Dashboard
                </h1>
                <div className="d-flex gap-3">
                  <AddCourse />
                  <Link
                    to="/admin-orders"
                    className="btn btn-outline-light fw-medium px-3 py-2"
                    style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <i className="fa-solid fa-list me-2"></i> View Orders
                  </Link>
                </div>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {courses.length > 0 ? (
          courses.map(course => (
            <Col key={course._id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
                }}
              >
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="fw-bold text-dark" style={{ fontSize: '1.25rem' }}>
                      {course.title}
                      <Badge bg="success" className="ms-2 px-2 py-1 fw-normal" style={{ fontSize: '0.75rem' }}>
                        Active
                      </Badge>
                    </Card.Title>
                  </div>
                  <Card.Text className="text-muted flex-grow-1 mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {course.description}
                  </Card.Text>
                  <div className="mb-3">
                    <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                      <i className="fa-solid fa-user-tie me-2 text-info"></i>
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                    {course.instructorPhone && (
                      <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-phone me-2 text-success"></i>
                        <strong>Contact:</strong> {course.instructorPhone}
                      </p>
                    )}
                    {course.date && (
                      <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-calendar-alt me-2 text-primary"></i>
                        <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
                      </p>
                    )}
                    <p className="mb-0 text-success fw-bold" style={{ fontSize: '1rem' }}>
                     
                      <strong>Price:</strong> ₹{course.price}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-auto">
                    <EditCourse course={course} />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="fw-medium px-3 py-2"
                      style={{
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => handleDelete(course._id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc3545';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#dc3545';
                      }}
                    >
                      <i className="fa-solid fa-trash me-2"></i> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body className="text-center py-5">
                <i className="fa-solid fa-exclamation-circle fa-3x text-warning mb-3"></i>
                <h2 className="text-danger fw-semibold mb-3" style={{ fontSize: '1.75rem' }}>
                  No Courses Found
                </h2>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                  Add a new course to get started
                </p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AdminDashboard;