import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WorkQueue from "./pages/WorkQueue";
import DashboardNew from "./pages/DashboardNew";
import Toolkit from "./pages/Toolkit";
import Notes from "./pages/Notes";
import Risk from "./pages/Risk";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/workqueue" element={<WorkQueue />} />
                    <Route path="/dashboard" element={<DashboardNew />} />
                    <Route path="/toolkit" element={<Toolkit />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/risk/:id" element={<Risk />} />
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
