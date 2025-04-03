// src/components/OurTeam.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Accordion } from 'react-bootstrap';

function OurTeam() {
  // Replace 'wFxBqeK94Fk' with your actual YouTube video ID
  const videoId = 'wFxBqeK94Fk'; // Placeholder ID (replace with your SkillHub video)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;

  const teamMembers = [
    {
      name: 'Dr. John Doe',
      role: 'Lead Educator & Admin',
      bio: 'Oversees course content creation and admin tools for SkillHub.',
      icon: 'fa-solid fa-chalkboard-teacher', // Font Awesome icon (requires Font Awesome)
    },
    {
      name: 'Jane Smith',
      role: 'Curriculum Designer',
      bio: 'Designs offline learning materials and supports admin course uploads.',
      icon: 'fa-solid fa-book-open',
    },
    {
      name: 'Mike Johnson',
      role: 'User Support Manager',
      bio: 'Ensures a smooth purchasing experience for users.',
      icon: 'fa-solid fa-headset',
    },
    {
      name: 'Sarah Lee',
      role: 'Admin Coordinator',
      bio: 'Manages course listings and admin dashboards.',
      icon: 'fa-solid fa-tachometer-alt',
    },
  ];

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f4f7fc', minHeight: '100vh' }}>
      {/* Header Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="fw-bold" style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>
            Meet the SkillHub Team
          </h1>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>
            Empowering education through a seamless course purchasing platform for offline institute learning.
          </p>
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="justify-content-center">
        {/* Video Section (Left Side) */}
        <Col md={5} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              <h3 className="fw-semibold mb-3 text-center" style={{ color: '#4a00e0' }}>
                SkillHub in Action
              </h3>
              <div className="ratio ratio-16x9">
                <iframe
                  src={embedUrl}
                  title="SkillHub Team Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Team and SkillHub Info (Right Side) */}
        <Col md={7} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              {/* About SkillHub */}
              <h3 className="fw-semibold mb-3" style={{ color: '#4a00e0' }}>
                About SkillHub
              </h3>
              <Card.Text className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                SkillHub is a dedicated platform for purchasing courses that support offline institute learning. We bridge the gap between online purchasing and in-person education, offering a robust system for both admins and users. Our team ensures that every course is carefully curated to enhance your skills, with all classes conducted offline at our partner institutes.
              </Card.Text>

              {/* Admin-Based Features */}
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <h5 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                      Admin-Based Course Management
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ fontSize: '1rem' }}>
                      Our admin team plays a critical role in maintaining SkillHub’s course offerings:
                    </p>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Course Uploads:</strong> Admins add new courses with detailed descriptions, pricing, and offline class schedules.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Content Approval:</strong> Ensuring all materials meet institute standards before going live.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Dashboard Tools:</strong> Admins use advanced tools to track course purchases, manage inventory, and update listings.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Offline Coordination:</strong> Syncing purchased courses with institute schedules for seamless offline delivery.
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>

                {/* User-Based Features */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <h5 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
                      User-Based Course Purchasing
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ fontSize: '1rem' }}>
                      SkillHub empowers users with a simple yet powerful purchasing experience:
                    </p>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Course Selection:</strong> Browse a wide range of courses tailored for offline learning.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Cart System:</strong> Add courses to your cart, adjust quantities, and proceed to payment effortlessly.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Secure Checkout:</strong> Complete purchases with confidence using our payment gateway.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Offline Access:</strong> Receive course materials and schedules for in-person classes at our institutes.
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* Team Members */}
              <h3 className="fw-semibold mb-3" style={{ color: '#4a00e0' }}>
                Our Professional Team
              </h3>
              <ListGroup variant="flush">
                {teamMembers.map((member, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center border-0 py-3"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <i
                      className={member.icon}
                      style={{ fontSize: '2rem', marginRight: '1rem', color: '#4a00e0' }}
                    ></i>
                    <div>
                      <h5 className="mb-1 fw-bold">{member.name}</h5>
                      <Badge bg="primary" className="mb-1">{member.role}</Badge>
                      <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
                        {member.bio}
                      </p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OurTeam;