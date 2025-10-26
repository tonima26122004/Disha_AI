// Simple test utilities for Disha AI
export const testUtils = {
  // Test if all required dependencies are available
  checkDependencies: () => {
    const required = ['react', 'framer-motion', 'lucide-react', 'recharts'];
    const missing = required.filter(dep => {
      try {
        require(dep);
        return false;
      } catch {
        return true;
      }
    });
    
    if (missing.length > 0) {
      console.warn('Missing dependencies:', missing);
      return false;
    }
    return true;
  },

  // Test localStorage functionality
  testLocalStorage: () => {
    try {
      const testKey = 'disha-test';
      const testValue = 'test-value';
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return retrieved === testValue;
    } catch (error) {
      console.error('localStorage test failed:', error);
      return false;
    }
  },

  // Test geolocation API
  testGeolocation: () => {
    return 'geolocation' in navigator;
  },

  // Test all utilities
  runAllTests: () => {
    const results = {
      dependencies: testUtils.checkDependencies(),
      localStorage: testUtils.testLocalStorage(),
      geolocation: testUtils.testGeolocation()
    };
    
    console.log('Disha AI Test Results:', results);
    return results;
  }
};

// Auto-run tests in development
if (import.meta.env.DEV) {
  testUtils.runAllTests();
}
