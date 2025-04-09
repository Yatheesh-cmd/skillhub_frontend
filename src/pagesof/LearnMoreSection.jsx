import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { RiLightbulbFlashLine, RiRouteLine, RiUserStarLine } from 'react-icons/ri';
import { FiAward, FiClock, FiTrendingUp, FiPlayCircle, FiBookOpen } from 'react-icons/fi';
import { BsCheckCircle, BsGraphUp, BsLaptop, BsHeadphones } from 'react-icons/bs';
import { IoMdPeople } from 'react-icons/io';
import { GiProgression } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const LearnMoreSection = () => {
  // Feature Grid Data
  const features = [
    {
      icon: <RiLightbulbFlashLine size={28} />,
      title: "Innovative Curriculum",
      description: "Cutting-edge content updated quarterly to reflect industry changes"
    },
    {
      icon: <RiRouteLine size={28} />,
      title: "Clear Pathways",
      description: "Structured learning journeys for every skill level"
    },
    {
      icon: <RiUserStarLine size={28} />,
      title: "Mentor Network",
      description: "Access to industry experts and career coaches"
    },
    {
      icon: <FiAward size={28} />,
      title: "Recognized Certifications",
      description: "Credentials valued by top employers"
    },
    {
      icon: <FiClock size={28} />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with 24/7 access"
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: "Career Growth",
      description: "Proven outcomes with 87% career advancement rate"
    }
  ];

  // Comparison Data
  const comparison = [
    {
      feature: "Industry Expert Instructors",
      us: <BsCheckCircle color="#4BB543" size={20} />,
      others: "Limited"
    },
    {
      feature: "Hands-on Projects",
      us: "10+ per course",
      others: "2-3 average"
    },
    {
      feature: "Career Services",
      us: "Included",
      others: "Premium add-on"
    },
    {
      feature: "Learning Community",
      us: "Active 24/7",
      others: "Forum only"
    },
    {
      feature: "Course Updates",
      us: "Quarterly",
      others: "Annual"
    }
  ];

  return (
    <div style={{ backgroundColor: '#f9fbfd' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '6rem 0 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Transform Your Career Through Immersive Learning
              </h1>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
                Join the professionals who've accelerated their growth with our outcome-focused programs.
              </p>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'start', // Centers the icons horizontally
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <BsLaptop size={60} style={{ color: '#667eea' }} />
                  <FiPlayCircle size={60} style={{ color: '#764ba2' }} />
                  <BsHeadphones size={60} style={{ color: '#4BB543' }} />
                  <FiBookOpen size={60} style={{ color: '#ff6b6b' }} />
                </div>
                <h3 style={{ fontWeight: 600 }}>Experience Our Platform</h3>
                <p>Try our interactive learning environment with a free starter course</p>
                <p><strong>New Feature:</strong> Access live webinars and downloadable resources!</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Bar */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '2rem 0',
        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
        marginBottom: '4rem',
        position: 'relative',
        zIndex: 2
      }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-3 mb-md-0">
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#764ba2' }}>12,000+</div>
              <div>Active Learners</div>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#764ba2' }}>94%</div>
              <div>Completion Rate</div>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#764ba2' }}>600+</div>
              <div>Industry Partners</div>
            </Col>
            <Col md={3}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#764ba2' }}>24/7</div>
              <div>Learning Support</div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Feature Grid */}
      <Container style={{ marginBottom: '6rem' }}>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Why Professionals Choose Us
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
              Our unique approach combines academic rigor with practical application
            </p>
          </Col>
        </Row>
        <Row>
          {features.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card style={{ 
                border: 'none',
                borderRadius: '12px',
                height: '100%',
                transition: 'transform 0.3s',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Card.Body className="text-center p-4">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'white'
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>{item.title}</h4>
                  <p style={{ color: '#6c757d' }}>{item.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Comparison Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '5rem 0',
        marginBottom: '6rem'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-5 mb-lg-0">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                The SkillBridge Difference
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                We go beyond traditional online learning to deliver measurable career impact.
              </p>
              <div style={{ 
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
              }}>
                <div className="d-flex align-items-center mb-3">
                  <GiProgression size={24} className="me-3" color="#764ba2" />
                  <div>
                    <h5 style={{ fontWeight: 600, marginBottom: 0 }}>Proven Outcomes</h5>
                    <p style={{ color: '#6c757d', marginBottom: 0 }}>87% of learners report career advancement</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <IoMdPeople size={24} className="me-3" color="#764ba2" />
                  <div>
                    <h5 style={{ fontWeight: 600, marginBottom: 0 }}>Community Power</h5>
                    <p style={{ color: '#6c757d', marginBottom: 0 }}>Active peer network and mentor access</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <Card style={{ border: 'none', borderRadius: '12px', overflow: 'hidden' }}>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr style={{ background: '#764ba2', color: 'white' }}>
                          <th style={{ width: '40%', padding: '1rem' }}>Feature</th>
                          <th style={{ width: '30%', padding: '1rem' }}>SkillBridge</th>
                          <th style={{ width: '30%', padding: '1rem' }}>Others</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.map((row, index) => (
                          <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#f8f9fa' }}>
                            <td style={{ padding: '1rem', fontWeight: 500 }}>{row.feature}</td>
                            <td style={{ padding: '1rem' }}>{row.us}</td>
                            <td style={{ padding: '1rem' }}>{row.others}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FAQ Section */}
      <Container style={{ marginBottom: '6rem' }}>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
              Everything you need to know about getting started
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="mx-auto">
            <Accordion flush>
              <Accordion.Item eventKey="0" style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                <Accordion.Header style={{ fontWeight: 600 }}>How much time do I need to commit?</Accordion.Header>
                <Accordion.Body>
                  Our programs are designed for working professionals. Most learners spend 5-8 hours per week and complete programs in 3-6 months. You'll have flexibility to adjust your pace.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                <Accordion.Header style={{ fontWeight: 600 }}>What makes your programs different?</Accordion.Header>
                <Accordion.Body>
                  We combine academic rigor with practical application. Each program includes real-world projects, mentor guidance, and career support - not just video lectures.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                <Accordion.Header style={{ fontWeight: 600 }}>Do you offer career support?</Accordion.Header>
                <Accordion.Body>
                  Yes! All programs include career coaching, resume reviews, interview preparation, and access to our employer network. Our career services team is dedicated to helping you succeed.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <Container>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Ready to Transform Your Career?
          </h2>
          <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Join thousands of professionals who've accelerated their careers with our programs.
          </p>
          <Link to={'/auth'} className="btn btn-outline-light" style={{ 
            fontWeight: 600,
            padding: '0.75rem 2.5rem',
            borderRadius: '8px'
          }}>
            Start Your Application
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default LearnMoreSection;