import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Footer() {
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    toast.success("Feedback submitted! (Placeholder - API not implemented)");
    // Add API call here: e.g., submitFeedbackApi(feedback)
  };

  return (
    <footer className="container-fluid bg-dark text-light py-5">
      <Row className="px-4">
        <Col md={4} lg={3} className="mb-2 mb-md-0">
          <img src="https://skillhub.co.in/images/SKILLHUB.png" alt="SkillHub Logo" height={'50px'} width={'50px'} className='mb-3' />
          <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>SkillHub Learning</h5>
          <p style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Empowering your future with cutting-edge skills. Learn from industry experts and join a global community of innovators.
          </p>
          <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} SkillHub. All Rights Reserved.
          </p>
        </Col>
        <Col md={4} lg={3} className="mb-4 mb-md-0">
          <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Quick Links</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><Link to="/" className="text-light text-decoration-none hover-link">Home</Link></li>
            <li className="mb-2"><Link to="/courses" className="text-light text-decoration-none hover-link">Courses</Link></li>
            <li className="mb-2"><Link to="/auth" className="text-light text-decoration-none hover-link">Sign In/Up</Link></li>
            <li><Link to="/about" className="text-light text-decoration-none hover-link">About Us</Link></li>
          </ul>
        </Col>
        <Col md={4} lg={3} className="mb-4 mb-md-0">
          <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Connect With Us</h5>
          <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Email: support@skillhub.com</p>
          <div className="d-flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Facebook"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Twitter"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Instagram"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
          </div>
        </Col>
        <Col md={12} lg={3}>
          <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Feedback</h5>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your thoughts"
                style={{ background: '#2a2a2a', color: '#ffffff', border: 'none', resize: 'none' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" style={{ background: '#6B48FF', border: 'none', padding: '0.6rem' }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: '#3a3a3a !important' }}>
        <p style={{ color: '#b0b0b0', fontSize: '0.85rem' }}>Made with ❤ by the SkillHub Team</p>
      </div>
    </footer>
  );
}

export default Footer;