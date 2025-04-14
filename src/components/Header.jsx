import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/ContextApi';

function Header() {
  const nav = useNavigate();
  const { setAuth, role, setRole: setContextRole } = useContext(authContext);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      toast.info("User logged out!");
      setAuth(false);
      setContextRole(null);
      nav('/');
    }
  };

  return (
    <Navbar
      expand="lg"
      className="sticky-top shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #2ecc71, #81ecec)',
        padding: '0.75rem 0',
        transition: 'all 0.3s ease',
      }}
      role="navigation"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" aria-label="SkillHub Home">
          <div className="d-flex align-items-center">
            <i
              className="fa-solid fa-graduation-cap me-2"
              style={{
                color: '#FFD700',
                fontSize: '2rem',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            ></i>
            <span
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.target.style.color = '#fff')}
            >
              SkillHub
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            {role === 'admin' && (
              <Nav.Link as={Link} to="/admindash" aria-label="Admin Dashboard">
                <Button
                  variant="outline-dark"
                  style={{
                    borderRadius: '25px',
                    padding: '0.5rem 1.5rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    borderColor: '#fff',
                    color: '#fff',
                  }}
                  className="hover:bg-white hover:text-green-600"
                >
                  Admin Dashboard
                </Button>
              </Nav.Link>
            )}
            <Button
              variant="outline-danger"
              onClick={logout}
              style={{
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                borderColor: '#FF6B6B',
                color: '#FF6B6B',
              }}
              className="hover:bg-red-100 hover:text-red-700"
              aria-label="Logout"
            >
              Logout <i className="fa-solid fa-right-from-bracket ms-2"></i>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;