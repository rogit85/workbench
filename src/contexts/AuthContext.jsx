import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

// Test credentials
const TEST_USERS = [
  {
    username: 'demo',
    password: 'demo123',
    role: 'user',
    fullName: 'Demo User'
  },
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin User'
  },
  {
    username: 'underwriter',
    password: 'underwriter123',
    role: 'underwriter',
    fullName: 'Test Underwriter'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = TEST_USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userInfo = {
        username: foundUser.username,
        role: foundUser.role,
        fullName: foundUser.fullName
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
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
