import { useState, useEffect } from 'react';

// Local storage utilities for Disha AI
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Storage keys
export const STORAGE_KEYS = {
  LANGUAGE: 'disha-lang',
  SESSION: 'disha-session',
  ROLE: 'disha-role',
  ALERTS: 'disha-alerts',
  RISK_SCORE: 'disha-risk',
  LOCATION: 'disha-location',
  CHAT_MESSAGES: 'disha-chat',
  AUTHORITY_FEED: 'disha-authority-feed',
};
