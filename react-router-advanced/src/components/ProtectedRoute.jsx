// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

// Dummy useAuth hook (replace with your real auth context/hook)
function useAuth() {
  // For demo: change this to false to simulate not logged in
  const user = { name: "Jane Doe" };
  return { user };
}

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children
  return children;
}
