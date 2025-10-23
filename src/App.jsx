import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import AIAssistant from "./components/AIAssistant";
import Login from "./pages/Login";
import Intake from "./pages/Intake";
import WorkQueue from "./pages/WorkQueue";
import Analytics from "./pages/Analytics";
import RiskDetail from "./pages/RiskDetail";
import Configuration from "./pages/Configuration";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navbar />
                <main className="pt-40">
                  <Routes>
                    <Route path="/" element={<Intake />} />
                    <Route path="/intake" element={<Intake />} />
                    <Route path="/workqueue" element={<WorkQueue />} />
                    <Route path="/dashboard" element={<Analytics />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/risk/:id" element={<RiskDetail />} />
                    <Route path="/reports" element={<Analytics />} />
                    <Route path="/configuration" element={<Configuration />} />
                  </Routes>
                </main>
                <Footer />
                <ScrollToTop />
                <AIAssistant />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
