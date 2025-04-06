import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Accordion } from 'react-bootstrap';
import './OurTeam.css';

function OurTeam() {
  const videoId = 'wFxBqeK94Fk';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []); // Empty dependency array runs only on mount

  const teamMembers = [
    {
      name: 'Dr. John Doe',
      role: 'Lead Educator & Admin',
      bio: 'Oversees course content creation and admin tools for SkillHub.',
      icon: 'fa-solid fa-chalkboard-teacher',
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

  const milestones = [
    {
      year: '1',
      title: 'SkillHub Founded',
      desc: 'Launched as a platform to bridge online course purchases with offline learning.',
    },
    {
      year: '2',
      title: 'First Institute Partnership',
      desc: 'Partnered with leading institutes to deliver high-quality offline classes.',
    },
    {
      year: '3',
      title: '1000+ Courses Added',
      desc: 'Expanded our catalog to over 1000 expertly curated courses.',
    },
    {
      year: '4',
      title: 'Global Reach Achieved',
      desc: 'Extended services to learners and institutes worldwide.',
    },
  ];

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Row className="text-center mb-5">
        <Col>
          <h1
            className="fw-bold"
            style={{
              fontSize: '2.75rem',
              color: '#1f2937',
              letterSpacing: '-0.025em',
            }}
          >
            Meet the SkillHub Team
          </h1>
          <p
            className="text-muted"
            style={{
              fontSize: '1.25rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Empowering education through a seamless course purchasing platform for offline institute learning.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center gx-4">
        <Col md={5} className="mb-4">
          <Card
            className="border-0 shadow-lg"
            style={{ borderRadius: '20px', backgroundColor: '#ffffff' }}
          >
            <Card.Body className="p-4">
              <div className="ratio ratio-16x9 mb-4" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  src={embedUrl}
                  title="SkillHub Milestones Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '12px' }}
                ></iframe>
              </div>
              <h3
                className="fw-semibold mb-4 text-center"
                style={{ color: '#4f46e5', fontSize: '1.75rem' }}
              >
                SkillHub Milestones
              </h3>
              <div className="timeline">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-year">
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#ffffff',
                        }}
                      >
                        {milestone.year}
                      </span>
                    </div>
                    <div className="timeline-content">
                      <h5
                        style={{
                          fontSize: '1.25rem',
                          color: '#1f2937',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {milestone.title}
                      </h5>
                      <p
                        style={{
                          fontSize: '1rem',
                          color: '#6b7280',
                          lineHeight: '1.5',
                        }}
                      >
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7} className="mb-4">
          <Card
            className="border-0 shadow-lg"
            style={{ borderRadius: '20px', backgroundColor: '#ffffff' }}
          >
            <Card.Body className="p-5">
              <h3
                className="fw-semibold mb-4"
                style={{ color: '#4f46e5', fontSize: '1.75rem' }}
              >
                About SkillHub
              </h3>
              <Card.Text
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  color: '#6b7280',
                }}
              >
                SkillHub is a dedicated platform for purchasing courses that support offline institute learning.
              </Card.Text>

              <Accordion className="my-4" defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{ border: 'none' }}>
                  <Accordion.Header>
                    <h5
                      className="fw-bold mb-0"
                      style={{ color: '#1f2937', fontSize: '1.5rem' }}
                    >
                      Admin-Based Course Management
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                      Our admin team plays a critical role in maintaining SkillHub’s course offerings:
                    </p>
                    <ListGroup variant="flush">
                      {[
                        'Course Uploads: Admins add new courses with detailed descriptions.',
                        'Content Approval: Ensuring all materials meet institute standards.',
                        'Dashboard Tools: Admins track purchases and manage inventory.',
                        'Offline Coordination: Syncing courses with institute schedules.',
                      ].map((item, idx) => (
                        <ListGroup.Item
                          key={idx}
                          style={{
                            border: 'none',
                            padding: '0.75rem 0',
                            color: '#6b7280',
                            fontSize: '1rem',
                          }}
                        >
                          <strong style={{ color: '#1f2937' }}>{item.split(':')[0]}:</strong>{' '}
                          {item.split(':')[1]}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" style={{ border: 'none' }}>
                  <Accordion.Header>
                    <h5
                      className="fw-bold mb-0"
                      style={{ color: '#1f2937', fontSize: '1.5rem' }}
                    >
                      User-Based Course Purchasing
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                      SkillHub empowers users with a simple yet powerful purchasing experience:
                    </p>
                    <ListGroup variant="flush">
                      {[
                        'Course Selection: Browse courses tailored for offline learning.',
                        'Cart System: Add courses and proceed to payment effortlessly.',
                        'Secure Checkout: Complete purchases with confidence.',
                        'Offline Access: Receive materials and schedules for classes.',
                      ].map((item, idx) => (
                        <ListGroup.Item
                          key={idx}
                          style={{
                            border: 'none',
                            padding: '0.75rem 0',
                            color: '#6b7280',
                            fontSize: '1rem',
                          }}
                        >
                          <strong style={{ color: '#1f2937' }}>{item.split(':')[0]}:</strong>{' '}
                          {item.split(':')[1]}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <h3
                className="fw-semibold mb-4"
                style={{ color: '#4f46e5', fontSize: '1.75rem' }}
              >
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
                      style={{
                        fontSize: '2rem',
                        marginRight: '1.5rem',
                        color: '#4f46e5',
                      }}
                    ></i>
                    <div>
                      <h5
                        className="mb-1 fw-bold"
                        style={{ color: '#1f2937', fontSize: '1.25rem' }}
                      >
                        {member.name}
                      </h5>
                      <Badge
                        bg="primary"
                        className="mb-2"
                        style={{ fontSize: '0.9rem', padding: '0.5em 1em' }}
                      >
                        {member.role}
                      </Badge>
                      <p
                        className="mb-0"
                        style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.5' }}
                      >
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