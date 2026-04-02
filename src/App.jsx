import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Layouts and Pages (To be created)
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import NotFound from './pages/NotFound';

// Components
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes using Layouts */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
