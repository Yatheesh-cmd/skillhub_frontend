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
      toast.warning('Please log in to view courses');
      return;
    }
    setLoading(true);
    try {
      const result = await allCoursesApi(search);
      if (result.status === 200) {
        setCourses(result.data);
      } else {
        toast.error('Failed to fetch courses');
      }
    } catch (error) {
      toast.error('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="py-5" style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
        <Row className="justify-content-between align-items-center mb-5 px-4">
          <Col md={6}>
            <h1
              className="fw-bold"
              style={{ fontSize: '2.75rem', color: '#1f2937', letterSpacing: '-0.5px' }}
            >
              Explore Our Courses
            </h1>
            <p
              className="text-muted"
              style={{ fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '500px' }}
            >
              Unlock your potential with our expertly curated courses designed for professional excellence.
            </p>
          </Col>
          <Col md={4}>
            <Form.Control
              type="search"
              placeholder="Search courses by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
              style={{
                borderRadius: '10px',
                padding: '0.85rem 1.5rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
              }}
            />
          </Col>
        </Row>

        <Row className="px-4">
          {loading ? (
            <Col className="text-center my-5">
              <Spinner
                animation="border"
                variant="primary"
                style={{ width: '3.5rem', height: '3.5rem' }}
              />
              <p className="mt-3" style={{ color: '#4b5563', fontSize: '1.1rem' }}>
                Loading courses, please wait...
              </p>
            </Col>
          ) : courses.length > 0 ? (
            courses.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <CourseCard course={item} />
              </Col>
            ))
          ) : (
            <Col>
              <Card
                className="border-0 shadow-sm text-center p-5"
                style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}
              >
                <Card.Body>
                  <h3 className="text-danger fw-semibold" style={{ fontSize: '1.75rem' }}>
                    No Courses Found
                  </h3>
                  <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: '1.6' }}>
                    We’re working on adding more courses. Please check back soon!
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