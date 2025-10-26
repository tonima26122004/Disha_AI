// Mock data for Disha AI application

// Mock alerts data
export const MOCK_ALERTS = [
  {
    id: 1,
    title: "Cyclone watch issued for coastal districts",
    region: "South 24 Parganas",
    severity: "High",
    timestamp: Date.now() - 1000 * 60 * 15,
    description: "Cyclone warning for coastal areas. Residents advised to stay indoors and follow official updates."
  },
  {
    id: 2,
    title: "Local flooding reported near river embankment",
    region: "Kolkata East",
    severity: "Medium",
    timestamp: Date.now() - 1000 * 60 * 50,
    description: "Heavy rainfall causing localized flooding. Avoid affected areas and use alternative routes."
  },
  {
    id: 3,
    title: "Heat wave alert for next 3 days",
    region: "West Bengal",
    severity: "Medium",
    timestamp: Date.now() - 1000 * 60 * 120,
    description: "Temperatures expected to reach 42°C. Stay hydrated and avoid outdoor activities during peak hours."
  }
];

// Helpline numbers
export const HELPLINES = [
  { 
    name: "National Disaster Helpline", 
    phone: "+91-108",
    description: "24/7 disaster response helpline"
  },
  { 
    name: "State Emergency Operations Center", 
    phone: "+91-112",
    description: "State-level emergency coordination"
  },
  { 
    name: "Ambulance", 
    phone: "102",
    description: "Medical emergency services"
  },
  { 
    name: "Fire & Rescue", 
    phone: "101",
    description: "Fire department and rescue services"
  },
  { 
    name: "Police", 
    phone: "100",
    description: "Police emergency services"
  }
];

// Donation links
export const DONATION_LINKS = [
  { 
    name: "PM CARES Fund", 
    url: "https://www.pmcares.gov.in/",
    description: "Prime Minister's Citizen Assistance and Relief in Emergency Situations Fund"
  },
  { 
    name: "Red Cross India", 
    url: "https://indianredcross.org/",
    description: "Indian Red Cross Society disaster relief"
  },
  { 
    name: "Chief Minister's Relief Fund", 
    url: "https://cmrelief.wb.gov.in/",
    description: "West Bengal Chief Minister's Relief Fund"
  }
];

// Mock user tracking data
export const MOCK_USERS = [
  { 
    id: "U-1023", 
    name: "John Doe",
    lastSeen: "Salt Lake", 
    status: "safe",
    location: { lat: 22.5937, lng: 88.3639 }
  },
  { 
    id: "U-1044", 
    name: "Jane Smith",
    lastSeen: "Howrah", 
    status: "needs_aid",
    location: { lat: 22.5739, lng: 88.3478 }
  },
  { 
    id: "U-1055", 
    name: "Mike Johnson",
    lastSeen: "Kolkata Central", 
    status: "safe",
    location: { lat: 22.5726, lng: 88.3639 }
  },
  { 
    id: "U-1066", 
    name: "Sarah Wilson",
    lastSeen: "Park Street", 
    status: "evacuated",
    location: { lat: 22.5626, lng: 88.3539 }
  }
];

// Knowledge snippets for AI assistant
export const KNOWLEDGE_SNIPPETS = [
  {
    topic: "flood",
    text: "If flood water rises rapidly, move to higher ground immediately. Switch off electricity at the main breaker if safe. Avoid driving into floodwaters. Keep emergency supplies ready and follow evacuation orders.",
    keywords: ["flood", "water", "evacuation", "safety", "emergency"]
  },
  {
    topic: "cyclone",
    text: "During cyclones, secure loose objects, keep emergency kit ready, and stay away from windows. Follow official evacuation orders. Stay indoors and listen to weather updates.",
    keywords: ["cyclone", "storm", "wind", "evacuation", "safety"]
  },
  {
    topic: "earthquake",
    text: "During an earthquake: DROP, COVER, and HOLD ON. After shocks are common; check for gas leaks and avoid elevators. Stay away from buildings and power lines.",
    keywords: ["earthquake", "shake", "safety", "drop", "cover", "hold"]
  },
  {
    topic: "heatwave",
    text: "During heatwaves, stay hydrated, avoid outdoor activities during peak hours, and use cooling measures. Check on elderly and vulnerable people regularly.",
    keywords: ["heat", "temperature", "hydration", "cooling", "safety"]
  },
  {
    topic: "general",
    text: "Stay calm. If you are in immediate danger, call your local emergency number. Provide your precise location if possible. Follow official instructions and updates.",
    keywords: ["emergency", "safety", "help", "location", "calm"]
  }
];

// Chart data for analytics
export const RISK_CHART_DATA = [
  { name: "Mon", risk: 22, alerts: 3 },
  { name: "Tue", risk: 28, alerts: 5 },
  { name: "Wed", risk: 35, alerts: 7 },
  { name: "Thu", risk: 42, alerts: 4 },
  { name: "Fri", risk: 60, alerts: 12 },
  { name: "Sat", risk: 48, alerts: 8 },
  { name: "Sun", risk: 30, alerts: 6 },
];

// Risk prediction data
export const RISK_PREDICTION = {
  cycloneProbability: 18,
  floodRisk: "Moderate",
  heatwaveRisk: "High",
  earthquakeRisk: "Low"
};

// Alert distribution data for charts
export const ALERT_DISTRIBUTION = [
  { type: "Flood", count: 5 },
  { type: "Cyclone", count: 3 },
  { type: "Earthquake", count: 1 },
  { type: "Heatwave", count: 2 }
];