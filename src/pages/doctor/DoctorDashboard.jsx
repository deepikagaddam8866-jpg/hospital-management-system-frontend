import React, { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup, Badge, Button, Spinner } from 'react-bootstrap';
import api from '../../api/axios';

const DoctorDashboard = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            const { data } = await api.get('/queue/doctor/me');
            setQueue(data);
        } catch (e) {
            // Mock Data
            setQueue([
                { id: 101, patientName: 'Alice Johnson', token: 'T-01', priority: 'HIGH', status: 'WAITING' },
                { id: 102, patientName: 'Bob Builder', token: 'T-02', priority: 'NORMAL', status: 'WAITING' },
                { id: 103, patientName: 'Charlie Chap', token: 'T-03', priority: 'NORMAL', status: 'COMPLETED' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await api.put(`/queue/${id}`, { status: action });
            fetchQueue();
        } catch (e) {
            console.error("Using Mock updating");
            setQueue(q => q.map(item => item.id === id ? { ...item, status: action } : item));
        }
    };

    const activePatients = queue.filter(q => q.status === 'WAITING');

    return (
        <div className="dashboard-container">
            <h2 className="mb-4 d-flex justify-content-between align-items-center">
                <span><i className="bi bi-heart-pulse text-danger me-2"></i> Doctor Operations</span>
            </h2>

            <Row>
                <Col md={8}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Header className="bg-white pt-4 pb-0 border-0">
                            <h5 className="fw-bold">My Current Queue</h5>
                        </Card.Header>
                        <Card.Body>
                            {loading ? <Spinner animation="border" /> : (
                                <ListGroup variant="flush">
                                    {activePatients.length === 0 ? <p className="text-muted">No pending patients.</p> : activePatients.map((patient, index) => (
                                        <ListGroup.Item key={patient.id} className="d-flex justify-content-between align-items-center mb-2 border rounded shadow-sm">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3 fw-bold" style={{ width: 45, height: 45 }}>
                                                    {patient.token.split('-')[1] || patient.token}
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{patient.patientName}</h6>
                                                    <small className="text-muted">Token: {patient.token}</small>
                                                </div>
                                            </div>
                                            <div>
                                                {patient.priority === 'HIGH' && <Badge bg="danger" className="me-3">Emergency</Badge>}
                                                {index === 0 && <Badge bg="warning" text="dark" className="me-3">Current</Badge>}
                                                <Button variant="success" size="sm" className="me-2" onClick={() => handleAction(patient.id, 'COMPLETED')}>Done</Button>
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleAction(patient.id, 'SKIPPED')}>Skip</Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-primary text-white mb-4">
                        <Card.Body className="text-center py-5">
                            <p className="mb-1 text-light">Next Token</p>
                            <h1 className="fw-bold display-3">{activePatients.length > 0 ? activePatients[0].token : '--'}</h1>
                            <p className="mb-0 mt-2">{activePatients.length} Patients Waiting</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DoctorDashboard;
