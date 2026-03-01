import React from "react";
import Progress from "./pages/Progress.jsx";
import LogFood from "./pages/Log-food.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Welcome from "./pages/Welcome.jsx"; // AI-generated code: Import Welcome page
import "../css/style.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AI-generated code: Protected route wrapper to enforce onboarding completion
function ProtectedRoute({ children }) {
  // AI-generated code: Check if user has completed onboarding
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
  
  // AI-generated code: Redirect to welcome page if not completed
  if (!hasCompletedOnboarding) {
    return <Navigate to="/" replace />;
  }
  
  // AI-generated code: Allow access if onboarding completed
  return children;
}

export default function App() {
  // AI-generated code: Check onboarding status for root route
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");

  return(
    <BrowserRouter>
      <Routes>
        {/* AI-generated code: Root route - show dashboard if onboarded, welcome if not */}
        <Route path="/" element={hasCompletedOnboarding ? <Navigate to="/dashboard" replace /> : <Welcome />} />
        {/* AI-generated code: Protected dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* AI-generated code: Protected log-food route */}
        <Route path="/log-food" element={<ProtectedRoute><LogFood /></ProtectedRoute>} />
        {/* AI-generated code: Protected progress route */}
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />

        {/* AI-generated code: Catch-all route redirects to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
  }
