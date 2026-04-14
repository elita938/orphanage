import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./signup/Signup";
import UserDashboard from "./Userdashboard/UserDashboard";
import AdminDashboard from "./Admindashboard/adminDashboard";

// ── Protected Route ──────────────────────────────────────────────────────────
function ProtectedRoute({ user, requiredRole, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== requiredRole) return <Navigate to="/login" replace />;
  return children;
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (formData) => {
    setUser({ name: formData.email.split("@")[0], email: formData.email, role: formData.role });
  };

  const handleSignup = (formData) => {
    setUser({ name: formData.name, email: formData.email, role: formData.role });
  };

  const handleLogout = () => setUser(null);

  return (
    <Routes>
      <Route path="/login"  element={<Login  onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute user={user} requiredRole="user">
            <UserDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute user={user} requiredRole="admin">
            <AdminDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
