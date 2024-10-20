import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import "./index.css";
import Navbar from "./components/shared/NavBar";
import { AuthProvider } from "./hooks/useAuth";
function App() {
  return (
 <AuthProvider>
  <Router>
 <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;
