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
    <Container fluid className="py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <Row className="mb-4">
        <Col>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <Card.Header className="bg-primary text-white py-4 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0 fw-semibold" style={{ fontSize: '1.75rem' }}>
                  <i className="fa-solid fa-user-shield me-2"></i>
                  Admin Dashboard
                </h1>
                <div className="d-flex gap-3">
                  <AddCourse />
                  <Link 
                    to="/admin-orders" 
                    className="btn btn-outline-light fw-medium px-3 py-2"
                    style={{ borderRadius: '8px' }}
                  >
                    <i className="fa-solid fa-list me-2"></i>
                    View Orders
                  </Link>
                </div>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col>
          {courses.length > 0 ? (
            courses.map(course => (
              <Card 
                key={course._id} 
                className="mb-4 border-0 shadow-sm"
                style={{ 
                  borderRadius: '12px', 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: '1.25rem' }}>
                        {course.title}
                        <Badge bg="success" className="ms-2 px-2 py-1 fw-normal" style={{ fontSize: '0.85rem' }}>
                          Active
                        </Badge>
                      </Card.Title>
                      <Card.Text className="text-muted mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {course.description}
                      </Card.Text>
                      <div className="d-flex gap-4">
                        <Card.Text className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                          <i className="fa-solid fa-user me-2 text-primary"></i>
                          <span className="fw-medium">Instructor:</span> {course.instructor}
                        </Card.Text>
                        <Card.Text className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                          
                          <span className="fw-medium">Price: <i class="fa-solid fa-indian-rupee-sign"></i></span> {course.price}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <EditCourse course={course} />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="fw-medium px-3 py-2"
                        style={{ borderRadius: '8px' }}
                        onClick={() => handleDelete(course._id)}
                      >
                        <i className="fa-solid fa-trash me-2"></i>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="text-center py-5">
                <i className="fa-solid fa-exclamation-circle fa-2x text-danger mb-3"></i>
                <h2 className="text-danger fw-semibold mb-3" style={{ fontSize: '1.5rem' }}>
                  No Courses Found
                </h2>
                <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>
                  Add a new course to get started
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;