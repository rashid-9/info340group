import React from "react";
import Progress from "./pages/Progress.jsx";
import LogFood from "./pages/Log-food.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log-food" element={<LogFood />} />
        <Route path="/progress" element={<Progress />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
  }
