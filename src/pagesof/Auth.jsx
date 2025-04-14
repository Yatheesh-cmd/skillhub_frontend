import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { signupApi, loginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/ContextApi';
import './auth.css';

function Auth() {
  const [authStatus, setAuthStatus] = useState(false);
  const [role, setRole] = useState('user');
  const [user, setUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const nav = useNavigate();
  const { setAuth, setRole: setContextRole } = useContext(authContext);

  const handleSignup = async () => {
    const { username, email, password, confirmPassword } = user;
    if (!username || !email || !password || !confirmPassword) {
      toast.warning("Enter valid data", { style: { backgroundColor: "#f57c00", color: "#fff" } });
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match", { style: { backgroundColor: "#f57c00", color: "#fff" } });
      return;
    }
    const signupData = { username, email, password, role: 'user' };
    try {
      const result = await signupApi(signupData);
      if (result.status === 201 || result.status === 200) {
        toast.success("Signup successful", { style: { backgroundColor: "#4caf50", color: "#fff" } });
        setUser({ username: "", email: "", password: "", confirmPassword: "" });
        setAuthStatus(false);
      } else {
        toast.error(result.data?.message || "Something went wrong", { style: { backgroundColor: "#f44336", color: "#fff" } });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", { style: { backgroundColor: "#f44336", color: "#fff" } });
    }
  };

  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.warning("Enter valid data", { style: { backgroundColor: "#f57c00", color: "#fff" } });
      return;
    }
    const loginData = { email, password, role };
    try {
      const result = await loginApi(loginData);
      if (result.status === 200) {
        toast.success("Login successful", { style: { backgroundColor: "#4caf50", color: "#fff" } });
        const { token, user: userData } = result.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', userData.username);
        sessionStorage.setItem('role', userData.role);
        sessionStorage.setItem('github', userData.github || '');
        sessionStorage.setItem('linkedin', userData.linkedin || '');
        sessionStorage.setItem('profile', userData.profile || '');
        setAuth(true);
        setContextRole(userData.role);
        nav(userData.role === 'admin' ? '/admindash' : '/userdash');
      } else {
        toast.error(result.response?.data || "Something went wrong", { style: { backgroundColor: "#f44336", color: "#fff" } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { style: { backgroundColor: "#f44336", color: "#fff" } });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <Row className="align-items-center g-3">
          <Col xs={12} md={6} className="text-center">
            {authStatus ? (
              <img
                src="https://toigingiuvedep.vn/wp-content/uploads/2022/04/anh-gif-doc-dao-1.gif"
                alt="Signup illustration"
                className="auth-logo"
              />
            ) : (
              <img
                src="https://i.pinimg.com/originals/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.png"
                alt="Login illustration"
                className="auth-logo auth-logo-login"
              />
            )}
          </Col>
          <Col xs={12} md={6}>
            <h2 className="auth-header">{authStatus ? "Register" : "Log In"}</h2>
            <div>
              {!authStatus && (
                <div className="input-group mb-4">
                  <div className="form-floating-container">
                    <FloatingLabel label="Login As" className="flex-grow-1">
                      <Form.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        aria-label="Select login role"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    </FloatingLabel>
                    <i className="fas fa-user-tag input-icon"></i>
                  </div>
                </div>
              )}
              <div className="input-group mb-4">
                <div className="form-floating-container">
                  <FloatingLabel label="Email address" className="flex-grow-1">
                    <Form.Control
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      aria-label="Email address"
                    />
                  </FloatingLabel>
                  <i className="fas fa-envelope input-icon"></i>
                </div>
              </div>
              {authStatus && (
                <>
                  <div className="input-group mb-4">
                    <div className="form-floating-container">
                      <FloatingLabel label="Username" className="flex-grow-1">
                        <Form.Control
                          type="text"
                          value={user.username}
                          onChange={(e) => setUser({ ...user, username: e.target.value })}
                          aria-label="Username"
                        />
                      </FloatingLabel>
                      <i className="fas fa-user input-icon"></i>
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <div className="form-floating-container">
                      <FloatingLabel label="Password" className="flex-grow-1">
                        <Form.Control
                          type="password"
                          value={user.password}
                          onChange={(e) => setUser({ ...user, password: e.target.value })}
                          aria-label="Password"
                        />
                      </FloatingLabel>
                      <i className="fas fa-lock input-icon"></i>
                    </div>
                  </div>
                  <div className="input-group mb-4">
                    <div className="form-floating-container">
                      <FloatingLabel label="Confirm Password" className="flex-grow-1">
                        <Form.Control
                          type="password"
                          value={user.confirmPassword}
                          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                          aria-label="Confirm password"
                        />
                      </FloatingLabel>
                      <i className="fas fa-lock input-icon"></i>
                    </div>
                  </div>
                </>
              )}
              {!authStatus && (
                <div className="input-group mb-4">
                  <div className="form-floating-container">
                    <FloatingLabel label="Password" className="flex-grow-1">
                      <Form.Control
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        aria-label="Password"
                      />
                    </FloatingLabel>
                    <i className="fas fa-lock input-icon"></i>
                  </div>
                </div>
              )}
            </div>
            <div className="btn-container">
              {authStatus ? (
                <button className="auth-btn auth-btn-signup" onClick={handleSignup} aria-label="Sign up">
                  <i className="fas fa-user-plus"></i><span>Sign Up</span>
                </button>
              ) : (
                <button className="auth-btn auth-btn-login" onClick={handleLogin} aria-label="Sign in">
                  <i className="fas fa-sign-in-alt"></i><span>Sign In</span>
                </button>
              )}
              <button
                className="btn btn-link toggle-link"
                onClick={() => {
                  setAuthStatus(!authStatus);
                  setUser({ username: "", email: "", password: "", confirmPassword: "" });
                  if (!authStatus) setRole('user');
                }}
                aria-label={authStatus ? "Switch to login" : "Switch to signup"}
              >
                <i className="fas fa-exchange-alt me-1"></i>
                {authStatus ? "Already a user?" : "New user?"}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Auth;