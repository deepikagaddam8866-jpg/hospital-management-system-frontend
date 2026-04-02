import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'Guest';
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold fs-4">
            <i className="bi bi-hospital me-2"></i>
            MediQueue Systems
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate(`/${role.toLowerCase()}`)}>Dashboard</Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <span className="text-light me-3">Welcome, <strong>{username}</strong> ({role})</span>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <main className="flex-grow-1 bg-light py-4 fade-in">
        <Outlet />
      </main>
      
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <Container>
          <small>&copy; {new Date().getFullYear()} MediQueue Systems. All Rights Reserved.</small>
        </Container>
      </footer>
    </div>
  );
};

export default DefaultLayout;
