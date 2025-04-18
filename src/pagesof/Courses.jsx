import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';
import { allCoursesApi } from '../services/api';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Spinner, Card } from 'react-bootstrap';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [search]);

  const getData = async () => {
    if (!sessionStorage.getItem('token')) {
      toast.warning('Please login first');
      return;
    }
    setLoading(true);
    try {
      const result = await allCoursesApi(search);
      if (result.status === 200) setCourses(result.data);
      else toast.error('Failed to load courses');
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="py-5" style={{ backgroundColor: '#f4f7fc', minHeight: '100vh' }}>
        <Row className="justify-content-between align-items-center mb-5 px-4">
          <Col md={6}>
            <h1
              className="fw-bold"
              style={{ fontSize: '2.5rem', color: '#1a1a1a' }}
            >
              Explore All Courses
            </h1>
            <p
              className="text-muted"
              style={{ fontSize: '1.1rem', lineHeight: '1.6' }}
            >
              Discover a wide range of courses tailored for your professional growth.
            </p>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label visuallyHidden>Search</Form.Label>
              <div className="d-flex align-items-center shadow-sm" style={{
                border: '1px solid #ced4da',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                backgroundColor: '#fff'
              }}>
                <span style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: '#555' }}>🔍</span>
                <Form.Control
                  type="search"
                  placeholder="Search by course name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="px-4 ">
          {loading ? (
            <Col className="text-center my-5">
              <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3" style={{ color: '#666' }}>Loading courses...</p>
            </Col>
          ) : courses.length > 0 ? (
            courses.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <CourseCard course={item} />
              </Col>
            ))
          ) : (
            <Col>
              <Card className="border-0 shadow-sm text-center p-5" style={{ borderRadius: '12px' }}>
                <Card.Body>
                  <h3 className="text-danger fw-semibold">No Courses Available</h3>
                  <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                    Check back later for new course offerings!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Courses;
