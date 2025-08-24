// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const isAuthenticated = false; // change to `true` to simulate logged-in user

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
