import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('truefeed_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock login - replace with real API call
    const mockUser = {
      id: '1',
      name: 'Alexandra Borke',
      username: '@alexsunshine',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
      role: 'Content Creator',
      bio: 'Passionate about creating amazing content and sharing experiences.',
      website: 'https://example.com',
      location: 'New York, USA',
      skills: ['Content Creation', 'Photography', 'Video Editing'],
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('truefeed_user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const signup = (email, password) => {
    // Mock signup - replace with real API call
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      username: `@${email.split('@')[0]}`,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: 'Member',
      bio: 'New to TrueFeed!',
      website: '',
      location: '',
      skills: [],
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('truefeed_user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('truefeed_user', JSON.stringify(updatedUser));
    console.log('User updated in AuthContext:', updatedUser);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('truefeed_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};