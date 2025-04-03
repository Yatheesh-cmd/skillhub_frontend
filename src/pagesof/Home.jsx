import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleCoursesApi } from '../services/api';
import Footer from '../components/Footer.jsx';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css';

// Home component: Main landing page for SkillSphere
function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [sampleCourses, setSampleCourses] = useState([]);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showAimsModal, setShowAimsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch sample courses and check login status on component mount
  useEffect(() => {
    fetchSampleCourses();
    setLoginStatus(!!sessionStorage.getItem('token'));
  }, []);

  // Asynchronous function to retrieve sample courses from API
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

  // Modal control handlers
  const toggleModal = (setter) => (value) => setter(value);
  const handleLessonsModal = toggleModal(setShowLessonsModal);
  const handleSuccessModal = toggleModal(setShowSuccessModal);
  const handleCoursesModal = toggleModal(setShowCoursesModal);
  const handleAimsModal = toggleModal(setShowAimsModal);
  const handleCourseModalShow = (course) => setSelectedCourse(course);
  const handleCourseModalClose = () => setSelectedCourse(null);

  return (
    <div>
      {/* Hero Section */}
      <div className="container-fluid position-relative overflow-hidden hero-section">
  <div className="row align-items-center min-vh-100 py-5">
    
    {/* Left Content */}
    <div className="col-lg-6 col-md-8 mx-auto text-light py-5">
      <h1 className="display-4 fw-bold animate-fade-in">
        Elevate Your Expertise with <span className="highlight">SkillHub</span>
      </h1>
      <p className="lead mb-4">
        Gain advanced skills through expertly designed courses in AI, Web3, Cloud Computing, 
        and more. Learn from industry leaders and join a global professional network. SkillHub offers tailored learning paths to help you achieve your goals. 
        Access cutting-edge resources, hands-on projects, and a supportive community designed 
        to empower your success.
      </p>

      
      <div className="d-flex gap-4 justify-content-start">
        <Link
          to={loginStatus ? '/userdash' : '/auth'}
          className="btn btn-primary custom-btn"
        >
          Begin Your Journey
        </Link>

        <Link
          to="/courses"
          className="btn btn-outline-light custom-btn"
        >
          Explore Courses
        </Link>
      </div>
    </div>

    {/* Right Image */}
    <div className="col-lg-5 col-md-4 d-flex justify-content-center align-items-center">
      <img
        src="https://png.pngtree.com/png-vector/20240531/ourmid/pngtree-flat-design-of-soft-skills-concept-png-image_12580304.png"
        alt="SkillHub Technology Visualization"
        className=" professional-image animate-float"
        width={'500px'}
      />
    </div>

  </div>
</div>

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
                <strong>Duration:</strong> {selectedCourse?.duration || '6 month'}
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
              ok
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Why SkillSphere Section */}
      <div
        className="container-fluid py-5 text-light text-center"
        style={{ background: '#1a1a1a' }}
      >
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
      <div className="container-fluid py-5 text-center" style={{ background: '#ffffff' }}>
        <h2
          className="fw-bold mb-4"
          style={{ fontSize: '2.5rem', color: '#1a1a1a', letterSpacing: '0.5px' }}
        >
          Join 100,000+ Innovators Worldwide
        </h2>
        <p
          className="lead mx-auto mb-5"
          style={{ maxWidth: '750px', color: '#4a5568', fontSize: '1.15rem', lineHeight: '1.7' }}
        >
          Become part of a thriving community driving the future of technology. Collaborate on impactful projects, network with peers, and gain insights from industry leaders to propel your career forward.
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <span
            onClick={() => handleLessonsModal(true)}
            style={{
              padding: '12px 25px',
              background: '#6B48FF',
              color: '#fff',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            5M+ Lessons Completed
          </span>
          <span
            onClick={() => handleSuccessModal(true)}
            style={{
              padding: '12px 25px',
              background: '#00DDEB',
              color: '#fff',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            95% Success Rate
          </span>
        </div>
      </div>

      {/* Lessons Completed Modal */}
      <Modal show={showLessonsModal} onHide={() => handleLessonsModal(false)} centered animation>
        <Modal.Header closeButton style={{ background: '#6B48FF', color: '#fff' }}>
          <Modal.Title>5M+ Lessons Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#f9fafc', color: '#1a1a1a' }}>
          <p>
            SkillSphere learners have completed over 5 million lessons, reflecting our community’s commitment to mastering emerging technologies like AI and Web3.
          </p>
          <ul>
            <li>Hands-on projects completed: 1.2M+</li>
            <li>Active learners: 100,000+</li>
            <li>Lessons across 50+ courses</li>
          </ul>
        </Modal.Body>
        <Modal.Footer style={{ background: '#f9fafc' }}>
          <Button variant="secondary" onClick={() => handleLessonsModal(false)}>
            Close
          </Button>
          <Link to="/courses" className="btn" style={{ background: '#6B48FF', color: '#fff' }}>
            Explore Courses
          </Link>
        </Modal.Footer>
      </Modal>

      {/* Success Rate Modal */}
      <Modal show={showSuccessModal} onHide={() => handleSuccessModal(false)} centered animation>
        <Modal.Header closeButton style={{ background: '#00DDEB', color: '#fff' }}>
          <Modal.Title>95% Success Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#f9fafc', color: '#1a1a1a' }}>
          <p>
            Our learners achieve a 95% success rate, securing jobs, launching startups, and mastering new skills with SkillSphere’s comprehensive support.
          </p>
          <ul>
            <li>Job placements: 85% within 6 months</li>
            <li>Skill certifications earned: 90,000+</li>
            <li>Positive feedback from mentors: 98%</li>
          </ul>
        </Modal.Body>
        <Modal.Footer style={{ background: '#f9fafc' }}>
          <Button variant="secondary" onClick={() => handleSuccessModal(false)}>
            Close
          </Button>
          <Link to="/userdash" className="btn" style={{ background: '#00DDEB', color: '#fff' }}>
            Join Now
          </Link>
        </Modal.Footer>
      </Modal>

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
              SkillSphere is a premier e-learning platform dedicated to equipping professionals with skills in cutting-edge technologies. Since our founding in 2020, we’ve cultivated a global community of over 100,000 learners, offering courses in AI, Web3, Cloud Computing, Cybersecurity, and more.
            </p>
            <p
              className="mt-3"
              style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.7' }}
            >
              Collaborating with industry giants like Google, AWS, and Microsoft, we ensure our curriculum reflects the latest advancements. Our practical approach—featuring hands-on projects, interactive labs, and expert mentorship—prepares learners for real-world success, regardless of experience level.
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
                  Expert-designed courses in AI, Web3, Cloud Computing, and Cybersecurity with practical applications.
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
              SkillSphere offers professionally curated courses to build expertise in high-demand fields, blending theory with hands-on practice.
            </p>
            <ul>
              <li>
                <strong>AI & Machine Learning:</strong> Create intelligent systems.
              </li>
              <li>
                <strong>Web3 Development:</strong> Dive into blockchain and DApps.
              </li>
              <li>
                <strong>Cloud Architecture:</strong> Architect scalable solutions.
              </li>
              <li>
                <strong>Cybersecurity:</strong> Enhance security with ethical hacking.
              </li>
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
              SkillSphere strives to deliver accessible, relevant, and impactful education to professionals worldwide.
            </p>
            <ul>
              <li>
                <strong>Accessibility:</strong> Offer affordable learning globally.
              </li>
              <li>
                <strong>Relevance:</strong> Keep pace with industry advancements.
              </li>
              <li>
                <strong>Impact:</strong> Equip learners for real-world challenges.
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{ background: '#f9fafc' }}>
            <Button variant="secondary" onClick={() => handleAimsModal(false)}>
              Close
            </Button>
            <Link to="/about" className="btn" style={{ background: '#6B48FF', color: '#fff' }}>
              Learn More
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;