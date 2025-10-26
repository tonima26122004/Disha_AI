// Mock API service for Disha AI
// Replace with real API calls when connecting to backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data - Use localStorage for persistence across sessions
let mockAlerts = [];

// Load alerts from localStorage on module load
const loadAlertsFromStorage = () => {
  try {
    const stored = localStorage.getItem('disha_alerts');
    if (stored) {
      mockAlerts = JSON.parse(stored);
    } else {
      // Default alerts if none exist
      mockAlerts = [
        {
          id: 1,
          title: "Flood Warning",
          description: "Heavy rainfall expected in coastal areas",
          severity: "high",
          location: "Kolkata, West Bengal",
          type: "weather",
          timestamp: "2024-01-15 10:30:00",
          status: "active"
        },
        {
          id: 2,
          title: "Traffic Alert",
          description: "Major road closure due to construction",
          severity: "medium",
          location: "Mumbai, Maharashtra",
          type: "traffic",
          timestamp: "2024-01-15 09:15:00",
          status: "active"
        },
        {
          id: 3,
          title: "Emergency Response",
          description: "Medical emergency in downtown area",
          severity: "critical",
          location: "Delhi, Delhi",
          type: "emergency",
          timestamp: "2024-01-15 08:45:00",
          status: "resolved"
        }
      ];
      // Save to localStorage
      localStorage.setItem('disha_alerts', JSON.stringify(mockAlerts));
    }
  } catch (error) {
    console.error('Failed to load alerts from storage:', error);
    // Fallback to default alerts
    mockAlerts = [
      {
        id: 1,
        title: "Flood Warning",
        description: "Heavy rainfall expected in coastal areas",
        severity: "high",
        location: "Kolkata, West Bengal",
        type: "weather",
        timestamp: "2024-01-15 10:30:00",
        status: "active"
      }
    ];
  }
};

// Initialize on module load
loadAlertsFromStorage();

const mockUsers = [
  {
    id: "U-001",
    name: "John Doe",
    location: { lat: 22.5937, lng: 88.3639 },
    status: "safe",
    lastSeen: new Date().toISOString()
  },
  {
    id: "U-002", 
    name: "Jane Smith",
    location: { lat: 22.5726, lng: 88.3639 },
    status: "needs_aid",
    lastSeen: new Date(Date.now() - 1800000).toISOString()
  }
];

const mockReports = {
  riskTrend: [
    { day: "Mon", risk: 22 },
    { day: "Tue", risk: 28 },
    { day: "Wed", risk: 35 },
    { day: "Thu", risk: 42 },
    { day: "Fri", risk: 60 },
    { day: "Sat", risk: 48 },
    { day: "Sun", risk: 30 }
  ],
  alertDistribution: [
    { type: "Flood", count: 5 },
    { type: "Cyclone", count: 3 },
    { type: "Earthquake", count: 1 },
    { type: "Heatwave", count: 2 }
  ]
};

// API functions
export const api = {
  // Alerts
  getAlerts: async () => {
    await delay(500);
    return { success: true, data: mockAlerts };
  },

  createAlert: async (alertData) => {
    await delay(800);
    const newAlert = {
      id: Date.now(),
      ...alertData,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: "active"
    };
    mockAlerts.unshift(newAlert);
    // Save to localStorage
    localStorage.setItem('disha_alerts', JSON.stringify(mockAlerts));
    return { success: true, data: newAlert };
  },

  updateAlert: async (id, updates) => {
    await delay(600);
    const index = mockAlerts.findIndex(alert => alert.id === id);
    if (index !== -1) {
      mockAlerts[index] = { ...mockAlerts[index], ...updates };
      // Save to localStorage
      localStorage.setItem('disha_alerts', JSON.stringify(mockAlerts));
      return { success: true, data: mockAlerts[index] };
    }
    return { success: false, error: "Alert not found" };
  },

  deleteAlert: async (id) => {
    await delay(400);
    const index = mockAlerts.findIndex(alert => alert.id === id);
    if (index !== -1) {
      mockAlerts.splice(index, 1);
      // Save to localStorage
      localStorage.setItem('disha_alerts', JSON.stringify(mockAlerts));
      return { success: true };
    }
    return { success: false, error: "Alert not found" };
  },

  // Users/Tracking
  getTrackedUsers: async () => {
    await delay(600);
    return { success: true, data: mockUsers };
  },

  updateUserStatus: async (userId, status) => {
    await delay(500);
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.status = status;
      user.lastSeen = new Date().toISOString();
      return { success: true, data: user };
    }
    return { success: false, error: "User not found" };
  },

  // Reports
  getReports: async () => {
    await delay(700);
    return { success: true, data: mockReports };
  },

  // SOS
  sendSOS: async (location, message) => {
    await delay(1000);
    console.log('SOS Alert:', { location, message, timestamp: new Date() });
    return { success: true, data: { id: Date.now(), status: "sent" } };
  },

  // AI Chat
  sendChatMessage: async (message, context = {}) => {
    await delay(1200);
    
    // Mock AI responses based on keywords
    const responses = {
      flood: "During floods, move to higher ground immediately. Avoid walking or driving through floodwaters.",
      cyclone: "Secure loose objects and stay indoors during cyclones. Follow official evacuation orders.",
      earthquake: "Drop, cover, and hold on during earthquakes. Stay away from windows and heavy objects.",
      default: "Stay calm and follow official instructions. Call emergency services if in immediate danger."
    };

    const lowerMessage = message.toLowerCase();
    let response = responses.default;
    
    if (lowerMessage.includes('flood')) response = responses.flood;
    else if (lowerMessage.includes('cyclone')) response = responses.cyclone;
    else if (lowerMessage.includes('earthquake')) response = responses.earthquake;

    return {
      success: true,
      data: {
        id: Date.now(),
        message: response,
        timestamp: new Date().toISOString(),
        type: "assistant"
      }
    };
  }
};

export default api;
