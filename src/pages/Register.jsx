import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="auth-container fade-in">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2 className="text-center fw-bold mb-4 text-primary">Join MediQueue</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4">
                <Form.Label>Account Type</Form.Label>
                <Form.Select name="role" onChange={handleChange}>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor (Pending Admin Approval)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" type="submit" className="w-100 mb-3 fw-bold" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>

          <div className="text-center text-muted">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
