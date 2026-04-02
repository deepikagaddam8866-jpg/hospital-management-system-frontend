# Complete Hospital Appointment & Queue Management System

A full-stack project utilizing modern Web Technologies for robust Healthcare Management.
This system provides three distinct portals (Admin, Doctor, Patient) to handle appointment scheduling and queue tracking natively.

## 🛠️ Technology Stack
- **Frontend**: React.js 18.2 (Vite), React Router v6, Bootstrap, Axios.
- **Backend**: Spring Boot 3.2.x, Spring Data JPA, Java 17.
- **Database**: H2 In-Memory Component.

## 🌟 Key Features
- **Responsive Authenticated Routing**: Role-specific layouts and dashboard features (`Admin`, `Doctor`, `Patient`).
- **Dynamic Queue Updating**: Emergency prioritising & queue iteration mock integration.
- **Beautiful React Components**: Interactive, animated UI/UX transitions using Vanilla CSS (`index.css`) + Bootstrap utility classes.

## 🚀 How to Run locally

### Starting the Frontend
1. Open a terminal and navigate to the `frontend` directory.
2. Run dependency installer: `npm install`
3. Start the Vite React app: `npm run dev`
4. The dashboard will mock backend queries gracefully if you run it without a backend!

### Starting the Backend
1. Open a terminal and navigate to the `backend` directory.
2. Ensure you have Maven and JDK 17+ installed.
3. Start Spring Boot using Maven wrapper or directly: `mvn spring-boot:run`
4. H2 Console is available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:hospitaldb`).

*(Note: The system contains fallback mocked data on the frontend to allow uninterrupted demonstration flow until full backend CRUD logic is wired securely.)*
