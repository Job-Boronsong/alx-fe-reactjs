// src/components/Profile.jsx
import { Link, Routes, Route, Outlet } from "react-router-dom";

// Dummy nested components
function ProfileDetails() {
  return <div><h2>Profile Details</h2><p>This is where details go.</p></div>;
}

function ProfileSettings() {
  return <div><h2>Profile Settings</h2><p>This is where settings go.</p></div>;
}

export default function Profile() {
  return (
    <div>
      <h1>👤 Profile</h1>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      {/* Optional outlet for further nested routing */}
      <Outlet />
    </div>
  );
}
