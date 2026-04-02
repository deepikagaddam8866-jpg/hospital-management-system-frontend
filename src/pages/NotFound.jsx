import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center fade-in">
            <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
            <h3 className="mb-4 text-muted">Oops! Page not found</h3>
            <p className="mb-4">The page you are looking for doesn't exist or has been moved.</p>
            <Button as={Link} to="/" variant="primary" size="lg" className="px-5 shadow-sm fw-bold rounded-pill">
                Go to Homepage
            </Button>
        </Container>
    );
};

export default NotFound;
