import React from "react";
import Progress from "./pages/Progress.jsx";
import LogFood from "./pages/Log-food.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import "../css/style.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
  if (!hasCompletedOnboarding) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={hasCompletedOnboarding ? <Navigate to="/dashboard" replace /> : <Welcome />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/log-food" element={<ProtectedRoute><LogFood /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}