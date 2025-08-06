import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Submissions from "./pages/Submissions";
import SubmissionDetail from "./pages/SubmissionDetail";
import Quotes from "./pages/Quotes";
import Reports from "./pages/Reports";

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
                <main className="pt-20">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/submissions" element={<Submissions />} />
                    <Route
                      path="/submissions/:id"
                      element={<SubmissionDetail />}
                    />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/reports" element={<Reports />} />
                  </Routes>
                </main>
                <Footer />
                <ScrollToTop />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
