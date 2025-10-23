import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

// Default user (no authentication required)
const DEFAULT_USER = {
  username: 'underwriter',
  role: 'Senior Underwriter',
  fullName: 'Jeremy Isaacs'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    // Logout just resets to default user
    setUser(DEFAULT_USER);
  };

  const value = {
    user,
    logout,
    loading,
    isAuthenticated: true
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
