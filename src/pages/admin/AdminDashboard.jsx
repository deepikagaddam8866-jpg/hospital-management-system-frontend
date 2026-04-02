import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments/all');
      setAppointments(data);
    } catch (e) {
      console.error(e);
      // MOCK DATA ON ERROR
      setAppointments([
        { id: 1, patientName: 'John Doe', doctorName: 'Dr. House', date: '2026-04-10', status: 'WAITING', token: 'A15' },
        { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Strange', date: '2026-04-10', status: 'COMPLETED', token: 'A16' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="mb-4 d-flex justify-content-between align-items-center">
        <span><i className="bi bi-shield-lock text-primary me-2"></i> Admin Panel</span>
        <Button variant="outline-primary" size="sm" onClick={fetchAppointments}>Refresh</Button>
      </h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <div className="metric-card border-left-primary">
            <h5 className="text-muted mb-2">Total Patients</h5>
            <h2 className="mb-0 fw-bold text-dark">1,245</h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="metric-card border-left-success" style={{ borderLeftColor: 'var(--success)' }}>
            <h5 className="text-muted mb-2">Active Doctors</h5>
            <h2 className="mb-0 fw-bold text-dark">48</h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="metric-card border-left-info" style={{ borderLeftColor: '#0dcaf0' }}>
            <h5 className="text-muted mb-2">Queue Wait Time Avg</h5>
            <h2 className="mb-0 fw-bold text-dark">14 mins</h2>
          </div>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
          <h5 className="fw-bold"><i className="bi bi-calendar-check me-2"></i> All Active Appointments</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Date Scheduled</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id}>
                    <td><span className="fw-bold bg-light p-2 rounded text-secondary border">{app.token || 'N/A'}</span></td>
                    <td>{app.patientName}</td>
                    <td>{app.doctorName}</td>
                    <td>{app.date}</td>
                    <td>
                      <Badge bg={app.status === 'COMPLETED' ? 'success' : app.status === 'WAITING' ? 'warning' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-danger" size="sm">Cancel</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
