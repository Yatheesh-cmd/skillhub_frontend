import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutPage.css';

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div className="about-page">
      <Container
        fluid
        className="py-5 text-center"
        style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}
      >
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: '3.25rem',
            color: '#1f2937',
            letterSpacing: '-0.025em',
          }}
        >
          About Us
        </h1>
        <p
          className="lead"
          style={{
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.25rem',
            lineHeight: '1.6',
          }}
        >
          Empowering the next generation of innovators with cutting-edge skills and knowledge.
        </p>
        <div className="mt-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1087/1087840.png"
            alt="Learning Icon"
            style={{ width: '60px', marginRight: '20px' }}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921190.png"
            alt="Innovation Icon"
            style={{ width: '60px' }}
          />
        </div>
      </Container>

      <Container className="py-5">
        <Row className="align-items-center gx-5">
          <Col md={6} className="mb-4">
            <h2
              className="fw-bold mb-4"
              style={{ fontSize: '2.25rem', color: '#1f2937' }}
            >
              Aims of SkillHub
            </h2>
            <p
              style={{
                color: '#6b7280',
                lineHeight: '1.75',
                fontSize: '1.125rem',
              }}
            >
              Welcome to SkillHub, your trusted platform for purchasing high-quality courses designed to enhance your skills.
            </p>
            <p
              style={{
                color: '#6b7280',
                lineHeight: '1.75',
                fontSize: '1.125rem',
              }}
            >
              Our mission is to bridge the gap between emerging technologies and practical expertise. We aim to:
            </p>
            <ul
              style={{
                color: '#6b7280',
                paddingLeft: '25px',
                lineHeight: '2',
                fontSize: '1.125rem',
              }}
            >
              <li>Equip learners with in-demand skills for the future of work.</li>
              <li>Foster innovation through hands-on, real-world projects.</li>
              <li>Provide accessible, high-quality education to a global audience.</li>
              <li>Build a community of forward-thinking professionals.</li>
            </ul>
          </Col>
          <Col md={6} className="mb-4 text-center">
            <img
              src="https://www.pngarts.com/files/7/Online-Education-PNG-Transparent-Image.png"
              alt="Students learning in a tech classroom"
              className="img-fluid rounded "
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-5" style={{ background: '#e2e8f0' }}>
        <h2
          className="text-center fw-bold mb-4"
          style={{ fontSize: '2.25rem', color: '#1f2937' }}
        >
          What Our Learners Say
        </h2>
        <div className="marquee">
          <div className="marquee-content">
            {[
              "SkillHub transformed my career with their practical courses!",
              "The offline classes and materials are top-notch.",
              "Learning Web3 here was a game-changer for me.",
              "The instructors are experts in their fields!",
            ].map((quote, idx) => (
              <div key={idx} className="testimonial-item px-4">
                <p
                  style={{
                    color: '#6b7280',
                    fontStyle: 'italic',
                    fontSize: '1.125rem',
                    lineHeight: '1.5',
                  }}
                >
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container fluid className="py-5" style={{ background: '#f8fafc' }}>
        <h2
          className="text-center fw-bold mb-5"
          style={{ fontSize: '2.25rem', color: '#1f2937' }}
        >
          Courses We Offer
        </h2>
        <div className="marquee">
          <div className="marquee-content">
            {[
              {
                title: 'AI & Machine Learning',
                desc: 'Master intelligent systems with TensorFlow and PyTorch.',
                icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/machine-learning-2548687-2135852.png',
              },
              {
                title: 'Web3 Development',
                desc: 'Explore blockchain and decentralized apps.',
                icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
              },
              {
                title: 'Cloud Architecture',
                desc: 'Design scalable solutions with AWS and Azure.',
                icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968696.png',
              },
              {
                title: 'Cybersecurity',
                desc: 'Learn ethical hacking and system protection.',
                icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921188.png',
              },
            ].map((course, idx) => (
              <div key={idx} className="course-item px-4 text-center">
                <img
                  src={course.icon}
                  alt={`${course.title} icon`}
                  style={{ width: '50px', marginBottom: '12px' }}
                />
                <strong
                  style={{
                    color: '#1f2937',
                    fontSize: '1.25rem',
                    display: 'block',
                  }}
                >
                  {course.title}
                </strong>
                <p
                  style={{
                    color: '#6b7280',
                    margin: '0',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  {course.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="py-5">
        <h2
          className="text-center fw-bold mb-5"
          style={{ fontSize: '2.25rem', color: '#1f2937' }}
        >
          Why Choose SkillHub?
        </h2>
        <Row className="text-center gx-5">
          <Col md={4} className="mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921198.png"
              alt="Expert Icon"
              style={{ width: '70px', marginBottom: '20px' }}
            />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>
              Expert-Led Courses
            </h4>
            <p
              style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                lineHeight: '1.6',
              }}
            >
              Learn from industry professionals with years of experience.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921185.png"
              alt="Practical Icon"
              style={{ width: '70px', marginBottom: '20px' }}
            />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>
              Hands-On Learning
            </h4>
            <p
              style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                lineHeight: '1.6',
              }}
            >
              Apply your skills through real-world projects and exercises.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921220.png"
              alt="Support Icon"
              style={{ width: '70px', marginBottom: '20px' }}
            />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>
              Community Support
            </h4>
            <p
              style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                lineHeight: '1.6',
              }}
            >
              Join a network of learners and mentors for ongoing support.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;