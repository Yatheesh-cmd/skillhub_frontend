import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sampleCoursesApi } from '../services/api';
import Footer from '../components/Footer.jsx';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css';

function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [sampleCourses, setSampleCourses] = useState([]);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showAimsModal, setShowAimsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const location = useLocation();
  const videoRef = useRef(null); // Ref for video control

  useEffect(() => {
    fetchSampleCourses();
    setLoginStatus(!!sessionStorage.getItem('token'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    // Ensure video plays on mount and after route change
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay failed:", error);
      });
    }
  }, [location.pathname]);
  const fetchSampleCourses = async () => {
    try {
      const response = await sampleCoursesApi();
      if (response.status === 200) {
        setSampleCourses(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch sample courses:', error);
      setSampleCourses([]);
    }
  };

  const toggleModal = (setter) => (value) => setter(value);
  const handleLessonsModal = toggleModal(setShowLessonsModal);
  const handleSuccessModal = toggleModal(setShowSuccessModal);
  const handleCoursesModal = toggleModal(setShowCoursesModal);
  const handleAimsModal = toggleModal(setShowAimsModal);
  const handleCourseModalShow = (course) => setSelectedCourse(course);
  const handleCourseModalClose = () => setSelectedCourse(null);

  return (
    <div className="home-wrapper">
      {/* Modernized Hero Section with Professional Text Colors */}
      <section className="hero-section position-relative overflow-hidden">
      {/* Enhanced Gradient Overlay */}
      <div
        className="hero-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // background: 'linear-gradient(140deg, rgba(38, 35, 35, 0.74), rgba(27, 27, 27, 0.18))',
          zIndex: 1,
          opacity: 0.95,
          animation: 'gradientShift 15s ease infinite',
          backgroundSize: '200% 200%',
        }}
      ></div>

      {/* Background Video with Ref - Optimized for Autoplay */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.7) contrast(1.1)',
        }}
        preload="auto"
        poster="/path/to/fallback-image.jpg" // Add a fallback image in your public folder
        onError={(e) => {
          console.error('Video error:', e);
          e.target.src = '/fallback-video.mp4'; // Ensure fallback video exists in public folder
        }}
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => console.warn('Play failed:', err));
          }
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <Container fluid className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center min-vh-100 py-5">
          {/* Left Side: Main Content */}
          <Col lg={8} md={8} className="py-5 px-4">
            {/* Modern Headline with Professional Colors */}
            <h1
              className="display-1 fw-bolder animate__animated animate__zoomIn"
              style={{
                fontSize: '4.5rem',
                letterSpacing: '-2px',
                lineHeight: '1.05',
                textTransform: 'uppercase',
                color: '#F5F7FA',
                position: 'relative',
                zIndex: 2,
              }}
            >
              Master the Future with{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #D1D9E6, #4A90E2)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                SkillHub
              </span>
            </h1>
            <p
              className="lead mb-5 animate__animated animate__fadeInUp animate__delay-1s"
              style={{
                fontSize: '1.3rem',
                fontWeight: 300,
                color: '#cad6e3',
                maxWidth: '700px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              Transform your career with next-gen skills in AI, Web3, and Cloud Computing. Join a global network of innovators and unlock limitless potential. Join a global community of learners and pioneers shaping the future of technology.Elevate your skillset, accelerate your career, and build solutions that matter.
              The future is now—are you ready to lead it?
            </p>

            {/* Dynamic Buttons with Updated Colors */}
            <div className="d-flex gap-4 animate__animated animate__fadeIn animate__delay-2s" style={{ marginTop: '2rem' }}>
              <Link
                to={loginStatus ? '/userdash' : '/auth'}
                className="btn btn-primary custom-btn px-5 py-2"
                style={{
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  background: 'linear-gradient(45deg, #1E3A8A, #3B82F6)',
                  border: 'none',
                  boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  color: '#FFFFFF',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
                }}
              >
                Start to Explore
              </Link>
              <Link
                to="/courses"
                className="btn btn-outline-light custom-btn px-5 py-2"
                style={{
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  borderWidth: '3px',
                  transition: 'all 0.3s ease',
                  color: '#D1D5DB',
                  borderColor: '#D1D5DB',
                  background: 'transparent',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(45deg, #3B82F6, #10B981)';
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
              >
                View Courses
              </Link>
            </div>

            {/* Updated Stats with Icons */}
            <div className="stats mt-5 animate__animated animate__fadeIn animate__delay-3s">
              <Row className="text-center">
                <Col xs={4}>
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-people-fill me-2" style={{ fontSize: '2rem', color: '#F5F7FA' }}></i>
                    <h3 className="fw-bold" style={{ fontSize: '2.5rem', color: '#F5F7FA' }}>
                      10K+
                    </h3>
                  </div>
                  <p style={{ color: '#ADB5BD', fontSize: '1rem' }}>Learners</p>
                </Col>
                <Col xs={4}>
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-book-fill me-2" style={{ fontSize: '2rem', color: '#F5F7FA' }}></i>
                    <h3 className="fw-bold" style={{ fontSize: '2.5rem', color: '#F5F7FA' }}>
                      100+
                    </h3>
                  </div>
                  <p style={{ color: '#ADB5BD', fontSize: '1rem' }}>Courses</p>
                </Col>
                <Col xs={4}>
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-trophy-fill me-2" style={{ fontSize: '2rem', color: '#F5F7FA' }}></i>
                    <h3 className="fw-bold" style={{ fontSize: '2.5rem', color: '#F5F7FA' }}>
                      95%
                    </h3>
                  </div>
                  <p style={{ color: '#ADB5BD', fontSize: '1rem' }}>Success</p>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Right Side: Trending Courses (Vertical) */}
          <Col lg={4} md={4} className="py-5 px-4 d-flex flex-column align-items-center">
            <div className="featured-courses animate__animated animate__fadeIn animate__delay-4s">
              <h2
                className="fw-bold mb-4 text-center"
                style={{
                  fontSize: '2rem',
                  color: '#F5F7FA',
                  textTransform: 'uppercase',
                  letterSpacing: '-1px',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                Trending Courses
              </h2>
              <div className="d-flex flex-column gap-4">
                {/* Course Card 1 */}
                <div
                  className="course-card"
                  style={{
                    background: 'linear-gradient(135deg, #228B22, #00FA9A)',
                    borderRadius: '15px',
                    padding: '15px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>AI Mastery</h3>
                  <p style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                    Hands-on AI projects.
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>4.8 ★</span>
                    <Link
                      to="/courses"
                      className="btn btn-light btn-sm"
                      style={{
                        borderRadius: '8px',
                        fontWeight: '600',
                        padding: '3px 10px',
                      }}
                    >
                      Enroll
                    </Link>
                  </div>
                </div>

                {/* Course Card 2 */}
                <div
                  className="course-card"
                  style={{
                    background: 'linear-gradient(135deg, #9400D3, #DA70D6)',
                    borderRadius: '15px',
                    padding: '15px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Web3 Essentials</h3>
                  <p style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                    Blockchain & NFTs.
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>4.9 ★</span>
                    <Link
                      to="/courses"
                      className="btn btn-light btn-sm"
                      style={{
                        borderRadius: '8px',
                        fontWeight: '600',
                        padding: '3px 10px',
                      }}
                    >
                      Enroll
                    </Link>
                  </div>
                </div>

                {/* Course Card 3 */}
                <div
                  className="course-card"
                  style={{
                    background: 'linear-gradient(135deg, rgb(67, 30, 131), #A78BFA)',
                    borderRadius: '15px',
                    padding: '15px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Cloud Computing</h3>
                  <p style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                    AWS, Azure, GCP.
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>4.7 ★</span>
                    <Link
                      to="/courses"
                      className="btn btn-light btn-sm"
                      style={{
                        borderRadius: '8px',
                        fontWeight: '600',
                        padding: '3px 10px',
                      }}
                    >
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Floating CTA with Contact Button */}
        <div
          className="floating-cta position-fixed"
          style={{ bottom: '40px', right: '40px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          {/* Contact WhatsApp Button */}
          <a
            href="https://wa.me/916238932825"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success rounded-circle shadow-lg animate__animated animate__pulse animate__infinite"
            style={{
              width: '70px',
              height: '70px',
              fontSize: '1.8rem',
              background: 'linear-gradient(45deg, rgb(0, 255, 94), rgb(57, 242, 16))',
              border: 'none',
              transition: 'transform 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <i className="fa-brands fa-whatsapp fa-beat fa-lg"></i>
          </a>

          {/* Rocket Button */}
          <Link
            to="/learn"
            className="btn btn-warning rounded-circle shadow-lg animate__animated animate__pulse animate__infinite"
            style={{
              width: '70px',
              height: '70px',
              fontSize: '1.8rem',
              background: 'linear-gradient(45deg, #ffca28, #ffeb3b)',
              border: 'none',
              transition: 'transform 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <i className="bi bi-rocket-takeoff"></i>
          </Link>
        </div>
      </Container>

      {/* Animation keyframes for gradient */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
      {/* Trending Tech Courses Section */}
      <Container fluid className="p-5 my-5" style={{ background: '#f9fafc' }}>
        <h3
          className="text-center mb-5 fw-bold"
          style={{
            fontSize: '2.75rem',
            background: 'linear-gradient(45deg, #6B48FF, #00DDEB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Trending Technology Courses
        </h3>
        <Row className="justify-content-center">
          {sampleCourses.length > 0 ? (
            sampleCourses.map((course, index) => (
              <Col key={course._id || index} md={4} lg={3} className="mb-4">
                <Card
                  className="shadow-lg"
                  style={{
                    borderRadius: '12px',
                    background:
                      index % 2 === 0
                        ? 'linear-gradient(135deg, #6B48FF, #A68EFF)'
                        : 'linear-gradient(135deg, #00DDEB, #66E5F2)',
                    color: '#fff',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                  }}
                  onClick={() => handleCourseModalShow(course)}
                  role="button"
                  aria-label={`View details for ${course.title || 'Unnamed Course'}`}
                >
                  <Card.Body className="p-4">
                    <span style={{ fontSize: '2.25rem', marginBottom: '1rem', display: 'block' }}>
                      {index % 4 === 0 ? (
                        <i className="fa-brands fa-python text-warning" />
                      ) : index % 4 === 1 ? (
                        '👨🏻‍💻'
                      ) : index % 4 === 2 ? (
                        <i className="fa-brands fa-react text-info" />
                      ) : (
                        <i className="fa-brands fa-angular" style={{ color: '#ff0000' }} />
                      )}
                    </span>
                    <Card.Title as="h5" className="fw-bold" style={{ color: '#fff' }}>
                      {course.title || 'Course Title'}
                    </Card.Title>
                    <Card.Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {course.description || 'Develop cutting-edge skills in this course.'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <h2 className="text-center" style={{ color: '#ff3366', fontWeight: 600 }}>
                New Courses Coming Soon!
              </h2>
            </Col>
          )}
        </Row>
        <div className="text-center mt-5">
          <Link
            to="/courses"
            className="text-decoration-none fw-bold"
            style={{
              color: '#6B48FF',
              fontSize: '1.15rem',
              padding: '10px 20px',
              borderRadius: '20px',
              background: 'rgba(107, 72, 255, 0.1)',
              transition: 'background 0.3s ease',
            }}
          >
            Discover All Courses →
          </Link>
        </div>

        {/* Course Details Modal */}
        <Modal
          show={!!selectedCourse}
          onHide={handleCourseModalClose}
          centered
          animation
          dialogClassName="modern-modal"
        >
          <Modal.Header
            closeButton
            style={{
              background: 'linear-gradient(135deg, #1e3c72, #6B48FF)',
              color: '#fff',
              borderRadius: '12px 12px 0 0',
              border: 'none',
            }}
          >
            <Modal.Title>{selectedCourse?.title || 'Course Title'}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              background: '#f9fafc',
              color: '#1a1a1a',
              padding: '1.75rem',
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <span style={{ fontSize: '1.75rem', marginRight: '0.75rem' }}>
                {selectedCourse &&
                  (sampleCourses.indexOf(selectedCourse) % 4 === 0 ? (
                    <i className="fa-brands fa-python" />
                  ) : sampleCourses.indexOf(selectedCourse) % 4 === 1 ? (
                    '👨🏻‍💻'
                  ) : sampleCourses.indexOf(selectedCourse) % 4 === 2 ? (
                    '☁️'
                  ) : (
                    '🔒'
                  ))}
              </span>
              <h5 className="mb-0" style={{ color: '#6B48FF' }}>
                Course Overview
              </h5>
            </div>
            <p>{selectedCourse?.description || 'Develop cutting-edge skills in this course.'}</p>
            <ul className="list-unstyled">
              <li>
                <strong>Duration:</strong> {selectedCourse?.duration || '6 months'}
              </li>
              <li>
                <strong>Level:</strong> {selectedCourse?.level || 'Intermediate'}
              </li>
              <li>
                <strong>Instructor:</strong> {selectedCourse?.instructor || 'Industry Expert'}
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer
            style={{
              background: '#f9fafc',
              borderTop: 'none',
              padding: '1.25rem 1.75rem',
            }}
          >
            <Button
              variant="outline-secondary"
              onClick={handleCourseModalClose}
              style={{ borderRadius: '15px', padding: '0.4rem 1.25rem' }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => alert(`Enrolling in ${selectedCourse?.title}`)}
              style={{
                background: 'linear-gradient(45deg, #6B48FF, #00DDEB)',
                border: 'none',
                borderRadius: '15px',
                padding: '0.4rem 1.25rem',
                transition: 'transform 0.3s ease',
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Why SkillSphere Section */}
      <div className="container-fluid py-5 text-light text-center" style={{ background: '#1a1a1a' }}>
        <h2
          className="mb-4 fw-bold"
          style={{ fontSize: '2.5rem', color: '#ffffff', letterSpacing: '0.5px' }}
        >
          Why Choose SkillSphere?
        </h2>
        <div className="row justify-content-center gap-4 px-4">
          {[
            { icon: '🚀', text: 'Real-World Projects' },
            { icon: '🌍', text: 'Global Mentorship' },
            { icon: '💻', text: 'Interactive Labs' },
            { icon: '📈', text: 'Career Accelerator' },
          ].map((benefit, index) => (
            <div key={index} className="col-md-2">
              <span style={{ fontSize: '2.25rem' }}>{benefit.icon}</span>
              <p className="mt-2" style={{ color: '#d9d9d9', fontSize: '1.1rem' }}>
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <section className="community-section py-5 text-center">
        <h2 className="fw-bold mb-4 section-title">Join 100,000+ Innovators Worldwide</h2>
        <p className="lead mx-auto mb-5">
          Step into a dynamic global community of over 100,000 innovators, where collaboration and cutting-edge ideas fuel technological progress. At SkillSphere, you’re not just a learner—you’re part of a movement shaping the future of industries like artificial intelligence, blockchain, and cloud infrastructure. Connect with peers, mentors, and gain access to a network that supports your growth and amplifies your impact.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <span className="stat-box" onClick={() => handleLessonsModal(true)}>
            5M+ Lessons Completed
          </span>
          <span className="stat-box" onClick={() => handleSuccessModal(true)}>
            95% Success Rate
          </span>
        </div>

        {/* Lessons Completed Modal */}
        <Modal show={showLessonsModal} onHide={() => handleLessonsModal(false)} centered>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>5M+ Lessons Completed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              SkillSphere learners have collectively completed over 5 million lessons, a testament to the dedication and enthusiasm within our community. This milestone highlights the platform offering hands-on, practical learning opportunities that resonate across diverse tech disciplines.
            </p>
            <ul className="list-unstyled">
              <li>Hands-on projects completed: 1.2M+</li>
              <li>Active learners: 100,000+</li>
              <li>Lessons across 50+ courses</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleLessonsModal(false)}>
              Close
            </Button>
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          </Modal.Footer>
        </Modal>

        {/* Success Rate Modal */}
        <Modal show={showSuccessModal} onHide={() => handleSuccessModal(false)} centered>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>95% Success Rate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              With a remarkable 95% success rate, SkillSphere empowers learners to achieve tangible outcomes—whether it’s landing high-impact roles in tech, earning certifications, or mastering complex skills. Our structured approach, combined with expert guidance, ensures that your investment in learning translates into real-world success and career advancement.
            </p>
            <ul className="list-unstyled">
              <li>Job placements: 85% within 6 months</li>
              <li>Skill certifications earned: 90,000+</li>
              <li>Positive feedback from mentors: 98%</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleSuccessModal(false)}>
              Close
            </Button>
            <Link to="/userdash" className="btn btn-primary">
              Join Now
            </Link>
          </Modal.Footer>
        </Modal>
      </section>

      {/* Learning Paths Section */}
        <Container fluid className="py-5" style={{ background: 'linear-gradient(to bottom, #eef2f6, #ffffff)' }}>
        <h3
          className="text-center mb-5 fw-bold"
          style={{ fontSize: '2.5rem', color: '#2d3748', letterSpacing: '0.5px' }}
        >
          Next-Generation Learning Paths
        </h3>
        <div className="d-flex justify-content-center flex-wrap gap-4 px-4">
          {[
            {
              title: 'AI & Machine Learning',
              desc: 'Develop intelligent systems with TensorFlow & PyTorch',
              icon: '🤖',
              gradient: 'linear-gradient(135deg, #4a5568, #718096)',
              image: 'https://www.wesleybaker.com/wp-content/uploads/2019/11/AI-Artificial-Intelligence-concept.jpg',
            },
            {
              title: 'Web3 Development',
              desc: 'Master blockchain, smart contracts & DApps',
              icon: '⛓️',
              gradient: 'linear-gradient(135deg, #2c5282, #63b3ed)',
              image:
                'https://static.vecteezy.com/system/resources/previews/000/523/309/original/web-development-and-programming-coding-concept-seo-optimization-modern-web-design-on-laptop-screen-vector.jpg',
            },
            {
              title: 'Cloud Architecture',
              desc: 'Design scalable solutions with AWS & Azure',
              icon: '☁️',
              gradient: 'linear-gradient(135deg, #2d3748, #5a829b)',
              image: 'https://s3.amazonaws.com/hoth.bizango/images/797280/cloud-computing-msc_feature.jpg',
            },
            {
              title: 'Cybersecurity',
              desc: 'Safeguard systems with ethical hacking skills',
              icon: '🔒',
              gradient: 'linear-gradient(135deg, #4c2c69, #7c599b)',
              image: 'https://www.cybertalk.org/wp-content/uploads/2020/09/shutterstock_634876949.jpg',
            },
          ].map((path, index) => (
            <Card
              key={index}
              className="shadow-lg"
              style={{
                width: '18rem',
                borderRadius: '12px',
                background: path.gradient,
                color: '#fff',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
              role="article"
              aria-label={`Learning Path: ${path.title}`}
            >
              <Card.Img
                variant="top"
                src={path.image}
                alt={`${path.title} Illustration`}
                style={{ height: '140px', objectFit: 'cover' }}
              />
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-2">
                  <span style={{ fontSize: '1.75rem', marginRight: '0.5rem' }}>{path.icon}</span>
                  <Card.Title as="h5" className="fw-bold mb-0" style={{ color: '#fff' }}>
                    {path.title}
                  </Card.Title>
                </div>
                <Card.Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{path.desc}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>



      {/* About SkillSphere Section */}
      <Container className="py-5" style={{ background: '#f9fafc' }}>
        <h3
          className="text-center fw-bold mb-5"
          style={{ fontSize: '2.5rem', color: '#1a1a1a', letterSpacing: '0.5px' }}
        >
          About SkillSphere
        </h3>
        <Row className="justify-content-center mb-5">
          <Col md={10} className="text-center">
            <p
              className="lead"
              style={{ color: '#4a5568', fontSize: '1.15rem', lineHeight: '1.7' }}
            >
              SkillSphere is a premier e-learning platform dedicated to equipping professionals with skills in cutting-edge technologies.
            </p>
            <p
              className="mt-3"
              style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.7' }}
            >
               Our platform offers a wide range of courses, expertly crafted to help you acquire new skills and knowledge. With a user-friendly interface and seamless payment gateway, you can easily browse, purchase, and access courses. Our mission is to empower learners of all levels to achieve their goals and reach their full potential. Join our community today and start learning with SkillHub!"Collaborating with industry giants like Google, AWS, and Microsoft, we ensure our curriculum reflects the latest advancements.
            </p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center mb-5">
          <Col md={6} lg={4}>
            <Link to="/team" style={{ textDecoration: 'none' }}>
              <Card
                className="h-100 shadow-sm"
                style={{ borderRadius: '12px', border: 'none', overflow: 'hidden' }}
                role="article"
                aria-label="Navigate to Our Team page"
              >
                <Card.Body className="p-4 text-center">
                  <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '1rem' }}>
                    👥
                  </span>
                  <Card.Title as="h5" className="fw-bold" style={{ color: '#6B48FF' }}>
                    Our Team
                  </Card.Title>
                  <Card.Text style={{ color: '#4a5568', lineHeight: '1.6' }}>
                    A skilled ensemble of educators, technologists, and industry leaders dedicated to your growth.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={6} lg={4}>
            <Card
              className="h-100 shadow-sm"
              style={{ borderRadius: '12px', border: 'none', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => handleCoursesModal(true)}
              role="button"
              aria-label="Open Our Courses Modal"
            >
              <Card.Body className="p-4 text-center">
                <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '1rem' }}>
                  📚
                </span>
                <Card.Title as="h5" className="fw-bold" style={{ color: '#6B48FF' }}>
                  Our Courses
                </Card.Title>
                <Card.Text style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  Expert-designed courses in AI, Web3, Cloud Computing, and Cybersecurity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card
              className="h-100 shadow-sm"
              style={{ borderRadius: '12px', border: 'none', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => handleAimsModal(true)}
              role="button"
              aria-label="Open Our Aims Modal"
            >
              <Card.Body className="p-4 text-center">
                <span style={{ fontSize: '2.25rem', display: 'block', marginBottom: '1rem' }}>
                  🎯
                </span>
                <Card.Title as="h5" className="fw-bold" style={{ color: '#6B48FF' }}>
                  Our Aims
                </Card.Title>
                <ul className="list-unstyled mb-0" style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  <li>Expand access to education.</li>
                  <li>Align courses with industry trends.</li>
                  <li>Empower learners with practical skills.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center mt-5">
          <Button
            variant="primary"
            href="/about"
            style={{
              background: '#6B48FF',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 25px',
              fontWeight: 600,
              transition: 'background 0.3s ease',
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Courses Modal */}
        <Modal show={showCoursesModal} onHide={() => handleCoursesModal(false)} centered animation>
          <Modal.Header closeButton style={{ background: '#6B48FF', color: '#fff' }}>
            <Modal.Title>Our Courses</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#f9fafc', color: '#1a1a1a' }}>
            <p>
              SkillSphere offers professionally curated courses to build expertise in high-demand fields.
            </p>
            <ul>
              <li><strong>AI & Machine Learning:</strong> Create intelligent systems.</li>
              <li><strong>Web3 Development:</strong> Dive into blockchain and DApps.</li>
              <li><strong>Cloud Architecture:</strong> Architect scalable solutions.</li>
              <li><strong>Cybersecurity:</strong> Enhance security with ethical hacking.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{ background: '#f9fafc' }}>
            <Button variant="secondary" onClick={() => handleCoursesModal(false)}>
              Close
            </Button>
            <Link to="/courses" className="btn" style={{ background: '#6B48FF', color: '#fff' }}>
              Explore Courses
            </Link>
          </Modal.Footer>
        </Modal>

        {/* Aims Modal */}
        <Modal show={showAimsModal} onHide={() => handleAimsModal(false)} centered animation>
          <Modal.Header closeButton style={{ background: '#6B48FF', color: '#fff' }}>
            <Modal.Title>Our Aims</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#f9fafc', color: '#1a1a1a' }}>
            <p>
              SkillSphere strives to deliver accessible, relevant, and impactful education.
            </p>
            <ul>
              <li><strong>Accessibility:</strong> Offer affordable learning globally.</li>
              <li><strong>Relevance:</strong> Keep pace with industry advancements.</li>
              <li><strong>Impact:</strong> Equip learners for real-world challenges.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{ background: '#f9fafc' }}>
            <Button variant="secondary" onClick={() => handleAimsModal(false)}>
              Close
            </Button>
            <Link
              to="/about"
              className="btn"
              style={{ background: '#6B48FF', color: '#fff' }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Learn More
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;