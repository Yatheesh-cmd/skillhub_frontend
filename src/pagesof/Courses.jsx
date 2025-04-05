import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';
import { allCoursesApi } from '../services/api';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Spinner, Alert, InputGroup } from 'react-bootstrap';

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
      setCourses(result.status === 200 ? result.data : []);
    } catch (error) {
      toast.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="py-5 bg-light min-vh-100">
        <Row className="mb-5 align-items-center px-3">
          <Col md={7}>
            <h1 className="display-5 fw-bold text-dark mb-3">
              <i className="fa-solid fa-book-open me-2"></i> Explore Our Courses
            </h1>
            <p className="text-muted lead">
              Elevate your skills with expertly curated courses designed for professional growth.
            </p>
          </Col>
          <Col md={5}>
            <InputGroup className="shadow-sm">
              <InputGroup.Text className="bg-white border-0">
                <i className="fa-solid fa-magnifying-glass text-muted"></i>
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search courses by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0"
                style={{ borderRadius: '0 10px 10px 0' }}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className="px-3">
          {loading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-muted">Loading courses...</p>
            </Col>
          ) : courses.length > 0 ? (
            courses.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-5">
                <CourseCard course={item} />
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="warning" className="text-center py-4 shadow-sm">
                <h4 className="fw-semibold">
                  <i className="fa-solid fa-exclamation-triangle me-2"></i> No Courses Found
                </h4>
                <p className="mb-0">New courses are coming soon. Stay tuned!</p>
              </Alert>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Courses;