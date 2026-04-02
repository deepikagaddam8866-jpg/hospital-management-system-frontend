import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role, name } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', name);

      // Simple routing based on role
      navigate(`/${role.toLowerCase()}`);
    } catch (err) {
      setError('Invalid credentials or server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock Login directly for demonstration purposes
  const handleMockLogin = (role) => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('role', role);
    localStorage.setItem('username', `Mock ${role}`);
    navigate(`/${role.toLowerCase()}`);
  }

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <h2 className="text-center fw-bold mb-4 text-primary">MediQueue Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3 fw-bold" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center text-muted mb-3">
            Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Register here</Link>
          </div>
          
          <hr />
          <div className="text-center mt-3">
            <small className="text-muted d-block mb-2">Quick Access (Dev Mode)</small>
            <Button variant="outline-info" size="sm" className="mx-1" onClick={() => handleMockLogin('ADMIN')}>Admin</Button>
            <Button variant="outline-success" size="sm" className="mx-1" onClick={() => handleMockLogin('DOCTOR')}>Doctor</Button>
            <Button variant="outline-secondary" size="sm" className="mx-1" onClick={() => handleMockLogin('PATIENT')}>Patient</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
