// Authentication service for Disha AI
// Replace with real authentication when connecting to backend

import api from './api';

export const authService = {
  // Login user
  login: async (email, password, role) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!email || !password || !role) {
        throw new Error('All fields are required');
      }

      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Mock successful login
      const user = {
        id: Date.now(),
        email,
        role,
        name: email.split('@')[0],
        loginTime: new Date().toISOString(),
        preferences: {
          language: 'en',
          notifications: true
        }
      };

      return {
        success: true,
        user,
        token: 'mock-jwt-token-' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Register new user
  register: async (email, password, role, name) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock validation
      if (!email || !password || !role || !name) {
        throw new Error('All fields are required');
      }

      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      // Mock successful registration
      const user = {
        id: Date.now(),
        email,
        role,
        name,
        registrationTime: new Date().toISOString(),
        loginTime: new Date().toISOString(),
        preferences: {
          language: 'en',
          notifications: true
        }
      };

      return {
        success: true,
        user,
        token: 'mock-jwt-token-' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock token validation
      if (!token || !token.startsWith('mock-jwt-token-')) {
        throw new Error('Invalid token');
      }

      return {
        success: true,
        valid: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Update user preferences
  updatePreferences: async (userId, preferences) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        data: {
          id: userId,
          preferences: {
            language: preferences.language || 'en',
            notifications: preferences.notifications !== undefined ? preferences.notifications : true
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default authService;
