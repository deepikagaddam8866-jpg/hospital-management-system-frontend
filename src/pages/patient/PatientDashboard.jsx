import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table, Badge, Alert } from 'react-bootstrap';
import api from '../../api/axios';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const docRes = await api.get('/doctors');
      const apptRes = await api.get('/appointments/my-history');
      setDoctors(docRes.data);
      setAppointments(apptRes.data);
    } catch {
      // Mock data
      setDoctors([
        { id: 101, name: 'Dr. John Doe', specialization: 'Cardiology', availability: 'Mon-Fri' },
        { id: 102, name: 'Dr. Jane Smith', specialization: 'Neurology', availability: 'Tue-Thu' }
      ]);
      setAppointments([
        { id: 1, date: '2026-04-15', doctorName: 'Dr. John Doe', status: 'BOOKED', token: 'C-05' }
      ]);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', { doctorId: selectedDoctor, date });
      setMessage({ type: 'success', text: 'Appointment successfully booked!' });
      fetchData();
    } catch {
      // Mock success for booking
      setAppointments([...appointments, { id: Date.now(), date, doctorName: doctors.find(d => d.id == selectedDoctor)?.name || 'Unknown', status: 'BOOKED', token: `T-${Math.floor(Math.random() * 100)}` }]);
      setMessage({ type: 'success', text: 'Appointment booked (Mock)!' });
    }
  };

  return (
    <div className="dashboard-container fade-in">
      <h2 className="mb-4 text-primary fw-bold"><i className="bi bi-person-badge me-2"></i> Patient Portal</h2>
      
      {message.text && <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.text}</Alert>}

      <Row>
        <Col md={5}>
          <Card className="shadow-sm border-0 mb-4 h-100">
            <Card.Header className="bg-white pt-4 pb-0 border-0">
              <h5 className="fw-bold"><i className="bi bi-calendar-plus me-2 text-success"></i> Book New Appointment</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleBook}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Doctor & Specialization</Form.Label>
                  <Form.Select required onChange={e => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
                    <option value="">Choosing a Medical Professional...</option>
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control type="date" required onChange={e => setDate(e.target.value)} value={date} />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 fw-bold">Confirm Booking</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="shadow-sm border-0 mb-4 h-100">
            <Card.Header className="bg-white pt-4 pb-0 border-0">
              <h5 className="fw-bold"><i className="bi bi-clock-history me-2 text-info"></i> My Appointments</h5>
            </Card.Header>
            <Card.Body>
              {appointments.length === 0 ? <p className="text-muted text-center py-4">You have no upcoming appointments.</p> : (
                <Table hover responsive className="align-middle">
                  <thead className="table-light">
                    <tr><th>Date</th><th>Doctor</th><th>Token</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {appointments.map(app => (
                      <tr key={app.id}>
                        <td>{app.date}</td>
                        <td className="fw-bold">{app.doctorName}</td>
                        <td><Badge bg="secondary" className="p-2 fs-6">{app.token}</Badge></td>
                        <td>
                          <Badge bg={app.status === 'COMPLETED' ? 'success' : app.status === 'BOOKED' ? 'primary' : 'warning'}>{app.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientDashboard;
