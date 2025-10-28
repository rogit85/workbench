import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import AIAssistant from "./components/AIAssistant";
import Login from "./pages/Login";
import WorkQueue from "./pages/WorkQueue";
import Analytics from "./pages/Analytics";
import AIAccuracy from "./pages/AIAccuracy";
import UnderwriterPerformance from "./pages/UnderwriterPerformance";
import Dashboard from "./pages/Dashboard";
import RiskDetail from "./pages/RiskDetail";
import Configuration from "./pages/Configuration";
import EmailTemplates from "./pages/EmailTemplates";
import UserManagement from "./pages/UserManagement";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import FieldVisibility from "./pages/FieldVisibility";
import IntegrationStatus from "./pages/IntegrationStatus";
import SanctionsConfig from "./pages/SanctionsConfig";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ScrollToTopOnRouteChange />
      {isAuthenticated && <Navbar />}
      <main className={isAuthenticated ? "pt-40" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workqueue" element={<ProtectedRoute><WorkQueue /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/analytics/performance" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/analytics/underwriter-performance" element={<ProtectedRoute><UnderwriterPerformance /></ProtectedRoute>} />
          <Route path="/analytics/ai-accuracy" element={<ProtectedRoute><AIAccuracy /></ProtectedRoute>} />
          <Route path="/risk/:id" element={<ProtectedRoute><RiskDetail /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/configuration" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
          <Route path="/configuration/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/configuration/email-templates" element={<ProtectedRoute><EmailTemplates /></ProtectedRoute>} />
          <Route path="/configuration/appetite-builder" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
          <Route path="/configuration/field-visibility" element={<ProtectedRoute><FieldVisibility /></ProtectedRoute>} />
          <Route path="/configuration/integration-status" element={<ProtectedRoute><IntegrationStatus /></ProtectedRoute>} />
          <Route path="/configuration/sanctions-config" element={<ProtectedRoute><SanctionsConfig /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
      {isAuthenticated && <ScrollToTop />}
      {isAuthenticated && <AIAssistant />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
