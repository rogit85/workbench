import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import AIAssistant from "./components/AIAssistant";
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ScrollToTopOnRouteChange />
        <Navbar />
        <main className="pt-40">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workqueue" element={<WorkQueue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/performance" element={<Analytics />} />
            <Route path="/analytics/underwriter-performance" element={<UnderwriterPerformance />} />
            <Route path="/analytics/ai-accuracy" element={<AIAccuracy />} />
            <Route path="/risk/:id" element={<RiskDetail />} />
            <Route path="/reports" element={<Analytics />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/configuration/user-management" element={<UserManagement />} />
            <Route path="/configuration/email-templates" element={<EmailTemplates />} />
            <Route path="/configuration/appetite-builder" element={<Configuration />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <AIAssistant />
      </div>
    </AuthProvider>
  );
}

export default App;
