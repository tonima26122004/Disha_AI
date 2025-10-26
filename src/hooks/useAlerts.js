import { useState, useEffect, useCallback } from 'react';
import { getTranslation } from '../utils/i18n';
import api from '../services/api';

// Global alerts state - shared across all components
let globalAlerts = [];
let listeners = new Set();

// Event system for real-time updates
const alertEvents = {
  listeners: new Set(),
  
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },
  
  emit(event, data) {
    this.listeners.forEach(callback => callback(event, data));
  }
};

// Cross-tab synchronization using localStorage events
const crossTabSync = {
  listeners: new Set(),
  
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },
  
  emit(event, data) {
    // Store event in localStorage to trigger cross-tab sync
    const eventData = {
      event,
      data,
      timestamp: Date.now(),
      tabId: Math.random().toString(36).substr(2, 9) // Unique tab identifier
    };
    
    try {
      // Use a counter to ensure the event is always "new" and triggers storage events
      const counter = Date.now();
      localStorage.setItem('disha_alert_event', JSON.stringify(eventData));
      localStorage.setItem('disha_alert_counter', counter.toString());
      
      // Clear the event after a longer delay to ensure other tabs can read it
      setTimeout(() => {
        localStorage.removeItem('disha_alert_event');
        localStorage.removeItem('disha_alert_counter');
      }, 500);
    } catch (error) {
      console.error('Failed to emit cross-tab event:', error);
    }
  },
  
  // Listen for localStorage changes from other tabs
  init() {
    const handleStorageChange = (e) => {
      if ((e.key === 'disha_alert_event' || e.key === 'disha_alert_counter') && e.newValue) {
        try {
          if (e.key === 'disha_alert_event') {
            const eventData = JSON.parse(e.newValue);
            console.log('Cross-tab event received:', eventData);
            this.listeners.forEach(callback => callback(eventData.event, eventData.data));
          }
        } catch (error) {
          console.error('Failed to parse cross-tab event:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }
};

// Load alerts from localStorage on module load
const loadAlertsFromStorage = () => {
  try {
    const stored = localStorage.getItem('disha_alerts');
    if (stored) {
      globalAlerts = JSON.parse(stored);
    } else {
      // Default alerts
      globalAlerts = [
        {
          id: 1,
          title: 'Flood Warning',
          description: 'Heavy rainfall expected in coastal areas',
          severity: 'high',
          location: 'Kolkata, West Bengal',
          type: 'weather',
          timestamp: '2024-01-15 10:30:00',
          status: 'active'
        },
        {
          id: 2,
          title: 'Traffic Alert',
          description: 'Major road closure due to construction',
          severity: 'medium',
          location: 'Mumbai, Maharashtra',
          type: 'traffic',
          timestamp: '2024-01-15 09:15:00',
          status: 'active'
        },
        {
          id: 3,
          title: 'Emergency Response',
          description: 'Medical emergency in downtown area',
          severity: 'critical',
          location: 'Delhi, Delhi',
          type: 'emergency',
          timestamp: '2024-01-15 08:45:00',
          status: 'resolved'
        }
      ];
      saveAlertsToStorage();
    }
  } catch (error) {
    console.error('Failed to load alerts from storage:', error);
  }
};

// Save alerts to localStorage
const saveAlertsToStorage = () => {
  try {
    localStorage.setItem('disha_alerts', JSON.stringify(globalAlerts));
  } catch (error) {
    console.error('Failed to save alerts to storage:', error);
  }
};

// Initialize on module load
loadAlertsFromStorage();

export const useAlerts = (language = 'en') => {
  const [alerts, setAlerts] = useState(globalAlerts);
  const [isSyncing, setIsSyncing] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = getTranslation(language);

  // Update local state when global state changes
  useEffect(() => {
    const handleAlertUpdate = (event, data) => {
      console.log('Alert update event received:', event, data);
      if (event === 'alerts_updated') {
        setAlerts([...globalAlerts]);
        console.log('Updated alerts:', globalAlerts);
      }
    };

    // Subscribe to both local and cross-tab events
    const unsubscribeLocal = alertEvents.subscribe(handleAlertUpdate);
    const unsubscribeCrossTab = crossTabSync.subscribe(handleAlertUpdate);
    
    // Initialize cross-tab sync
    const cleanupCrossTab = crossTabSync.init();
    
    // Also sync on window focus (when switching between tabs)
    const handleFocus = () => {
      console.log('Window focused, checking for alert updates...');
      const stored = localStorage.getItem('disha_alerts');
      if (stored) {
        try {
          const storedAlerts = JSON.parse(stored);
          if (JSON.stringify(storedAlerts) !== JSON.stringify(globalAlerts)) {
            console.log('Found updated alerts in localStorage, syncing...');
            globalAlerts.splice(0, globalAlerts.length, ...storedAlerts);
            setAlerts([...globalAlerts]);
          }
        } catch (error) {
          console.error('Failed to sync alerts on focus:', error);
        }
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    console.log('Subscribed to alert events (local + cross-tab + focus)');
    
    // Set initial alerts
    setAlerts([...globalAlerts]);
    console.log('Initial alerts set:', globalAlerts);
    
    return () => {
      unsubscribeLocal();
      unsubscribeCrossTab();
      cleanupCrossTab();
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Disaster types and locations data
  const disasterTypes = {
    weather: [
      { value: 'cyclone', label: t.cyclone },
      { value: 'flood', label: t.flood },
      { value: 'drought', label: t.drought },
      { value: 'heatwave', label: t.heatwave },
      { value: 'coldwave', label: t.coldwave },
      { value: 'storm', label: t.storm }
    ],
    emergency: [
      { value: 'fire', label: t.fire },
      { value: 'earthquake', label: t.earthquake },
      { value: 'tsunami', label: t.tsunami },
      { value: 'landslide', label: t.landslide },
      { value: 'terrorist', label: t.terroristAttack },
      { value: 'medical', label: t.medicalEmergency }
    ],
    traffic: [
      { value: 'accident', label: t.accident },
      { value: 'roadblock', label: t.roadblock },
      { value: 'construction', label: t.construction },
      { value: 'protest', label: t.protest }
    ],
    safety: [
      { value: 'gas_leak', label: t.gasLeak },
      { value: 'power_outage', label: t.powerOutage },
      { value: 'water_shortage', label: t.waterShortage },
      { value: 'building_collapse', label: t.buildingCollapse }
    ]
  };

  const locations = [
    { value: 'kolkata', label: t.kolkataWestBengal },
    { value: 'mumbai', label: t.mumbaiMaharashtra },
    { value: 'delhi', label: t.delhiDelhi },
    { value: 'chennai', label: t.chennaiTamilNadu },
    { value: 'bangalore', label: t.bangaloreKarnataka },
    { value: 'hyderabad', label: t.hyderabadTelangana },
    { value: 'ahmedabad', label: t.ahmedabadGujarat },
    { value: 'pune', label: t.puneMaharashtra }
  ];

  // Function to translate alert data
  const translateAlertData = useCallback((alert) => {
    const translations = {
      title: {
        "Flood Warning": t.floodWarning,
        "Traffic Alert": t.trafficAlert,
        "Emergency Response": t.emergencyResponse,
        "Test Alert from Citizen": t.testAlert || "Test Alert",
      },
      description: {
        "Heavy rainfall expected in coastal areas": t.heavyRainfallExpectedInCoastalAreas,
        "Major road closure due to construction": t.majorRoadClosureDueToConstruction,
        "Medical emergency in downtown area": t.medicalEmergencyInDowntownArea,
        "This is a test alert created from the citizen dashboard": t.testAlertDescription || "This is a test alert created from the citizen dashboard",
      },
      location: {
        "Kolkata, West Bengal": t.kolkataWestBengal,
        "Mumbai, Maharashtra": t.mumbaiMaharashtra,
        "Delhi, Delhi": t.delhiDelhi,
      },
      severity: {
        "high": t.high,
        "medium": t.medium,
        "low": t.low,
        "critical": t.critical,
      },
      status: {
        "active": t.active,
        "resolved": t.resolved,
      },
      type: {
        "weather": t.weather,
        "traffic": t.traffic,
        "emergency": t.emergency,
      }
    };

    return {
      ...alert,
      title: translations.title[alert.title] || alert.title,
      description: translations.description[alert.description] || alert.description,
      location: translations.location[alert.location] || alert.location,
      severity: translations.severity[alert.severity] || alert.severity,
      status: translations.status[alert.status] || alert.status,
      type: translations.type[alert.type] || alert.type,
    };
  }, [t, language]);

  // Create alert
  const createAlert = useCallback(async (alertData) => {
    if (!alertData.title.trim() || !alertData.description.trim() || !alertData.location) {
      throw new Error(t.pleaseFillAllRequiredFields);
    }

    if (isSyncing) return;

    setIsSyncing(true);

    try {
      // Create alert via API
      const response = await api.createAlert(alertData);
      
      if (response.success) {
        const newAlert = {
          id: response.data.id || Date.now(),
          ...alertData,
          timestamp: response.data.timestamp || new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: 'active'
        };
        
        // Update global state
        globalAlerts.unshift(newAlert);
        saveAlertsToStorage();
        
        // Notify all listeners (both local and cross-tab)
        console.log('Emitting alert update event with new alert:', newAlert);
        alertEvents.emit('alerts_updated', newAlert);
        crossTabSync.emit('alerts_updated', newAlert);
        console.log('Current global alerts after creation:', globalAlerts);
        
        return newAlert;
      } else {
        throw new Error(response.message || 'Failed to create alert');
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, t]);

  // Update alert
  const updateAlert = useCallback((alertId, updates) => {
    const index = globalAlerts.findIndex(alert => alert.id === alertId);
    if (index !== -1) {
      globalAlerts[index] = { ...globalAlerts[index], ...updates };
      saveAlertsToStorage();
      alertEvents.emit('alerts_updated', globalAlerts[index]);
      crossTabSync.emit('alerts_updated', globalAlerts[index]);
    }
  }, []);

  // Delete alert
  const deleteAlert = useCallback((alertId) => {
    const index = globalAlerts.findIndex(alert => alert.id === alertId);
    if (index !== -1) {
      globalAlerts.splice(index, 1);
      saveAlertsToStorage();
      alertEvents.emit('alerts_updated', null);
      crossTabSync.emit('alerts_updated', null);
    }
  }, []);

  // Refresh alerts
  const refreshAlerts = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Refreshing alerts from API...');
      const response = await api.getAlerts();
      if (response.success) {
        console.log('API response:', response.data);
        
        // Merge API alerts with existing alerts, avoiding duplicates
        const existingIds = new Set(globalAlerts.map(alert => alert.id));
        const newAlerts = response.data.filter(alert => !existingIds.has(alert.id));
        
        // Add new alerts from API to the beginning
        globalAlerts.unshift(...newAlerts);
        
        // Update localStorage with merged alerts
        saveAlertsToStorage();
        console.log('Updated global alerts after refresh:', globalAlerts);
        alertEvents.emit('alerts_updated', null);
        crossTabSync.emit('alerts_updated', null);
      }
    } catch (error) {
      console.error('Failed to refresh alerts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    alerts,
    createAlert,
    updateAlert,
    deleteAlert,
    refreshAlerts,
    isSyncing,
    loading,
    disasterTypes,
    locations,
    translateAlertData
  };
};
