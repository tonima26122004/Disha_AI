import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getTranslation } from '../utils/i18n';
import api from '../services/api';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children, language }) => {
  const [alerts, setAlerts] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const t = getTranslation(language);

  // Memoize disaster types and locations to prevent unnecessary re-renders
  const disasterTypes = useMemo(() => ({
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
  }), [t]);

  const locations = useMemo(() => [
    { value: 'kolkata', label: t.kolkataWestBengal },
    { value: 'mumbai', label: t.mumbaiMaharashtra },
    { value: 'delhi', label: t.delhiDelhi },
    { value: 'chennai', label: t.chennaiTamilNadu },
    { value: 'bangalore', label: t.bangaloreKarnataka },
    { value: 'hyderabad', label: t.hyderabadTelangana },
    { value: 'ahmedabad', label: t.ahmedabadGujarat },
    { value: 'pune', label: t.puneMaharashtra }
  ], [t]);

  // Load alerts from API on component mount
  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getAlerts();
      if (response.success) {
        setAlerts(response.data || []);
      } else {
        // Fallback to mock data if API fails
        setAlerts([
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
        ]);
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
      // Use fallback data
      setAlerts([
        {
          id: 1,
          title: 'Flood Warning',
          description: 'Heavy rainfall expected in coastal areas',
          severity: 'high',
          location: 'Kolkata, West Bengal',
          type: 'weather',
          timestamp: '2024-01-15 10:30:00',
          status: 'active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to translate alert data
  const translateAlertData = (alert) => {
    const translations = {
      title: {
        "Flood Warning": t.floodWarning,
        "Traffic Alert": t.trafficAlert,
        "Emergency Response": t.emergencyResponse,
      },
      description: {
        "Heavy rainfall expected in coastal areas": t.heavyRainfallExpectedInCoastalAreas,
        "Major road closure due to construction": t.majorRoadClosureDueToConstruction,
        "Medical emergency in downtown area": t.medicalEmergencyInDowntownArea,
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
  };

  const createAlert = useCallback(async (alertData) => {
    // Validation
    if (!alertData.title.trim() || !alertData.description.trim() || !alertData.location) {
      throw new Error(t.pleaseFillAllRequiredFields);
    }

    // Prevent duplicate creation by checking if form is already being submitted
    if (isSyncing) return;

    setIsSyncing(true);

    try {
      // Create alert via API
      const response = await api.createAlert(alertData);
      
      if (response.success) {
        // Add the new alert to the state
        const newAlert = {
          id: response.data.id || Date.now(),
          ...alertData,
          timestamp: response.data.timestamp || new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: 'active'
        };
        
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
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

  const updateAlert = useCallback((alertId, updates) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, ...updates } : alert
      )
    );
  }, []);

  const deleteAlert = useCallback((alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  }, []);

  const refreshAlerts = useCallback(() => {
    loadAlerts();
  }, [loadAlerts]);

  const value = {
    alerts,
    setAlerts,
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

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};
