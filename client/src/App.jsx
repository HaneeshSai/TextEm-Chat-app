import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import ProfilePic from "./pages/ProfilePic";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profilePicture" element={<ProfilePic />} />
        </Routes>
      </Router>
    </>
  );
}
