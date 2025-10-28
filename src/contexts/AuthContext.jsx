import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

// Valid credentials
const VALID_CREDENTIALS = {
  username: 'S0MP0321!',
  password: 'Welcome2024'
};

// User data after login
const USER_DATA = {
  username: 'S0MP0321!',
  role: 'Senior Underwriter',
  fullName: 'Jeremy Isaacs'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      setUser(USER_DATA);
      localStorage.setItem('user', JSON.stringify(USER_DATA));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
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
