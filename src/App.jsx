import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateStudent from "./pages/CreateStudent";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProgress from "./pages/UpdateProgress";

import API, { setAuthToken } from "./api/axiosConfig";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // Set default axios header on refresh
    }
  }, []);
  return (
    <Router>
      <Routes>

        {/* ✅ Root Route Auto Redirect */}
        <Route
          path="/"
          element={
            token ? (
              role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/student" />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Create Student */}
        <Route
          path="/admin/create-student"
          element={
            <PrivateRoute role="admin">
              <CreateStudent />
            </PrivateRoute>
          }
        />

        {/* Update Progress */}
        <Route
          path="/admin/update-progress/:id"
          element={
            <PrivateRoute role="admin">
              <UpdateProgress />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;