import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  MapPin, 
  RefreshCw, 
  Clock,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getTranslation } from '../utils/i18n';

const RealTimeAlerts = ({ lang = 'en' }) => {
  const t = getTranslation(lang);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'success', 'error'

  // Mock alert data - in real app, this would come from API
  const mockAlerts = [
    {
      id: 1,
      title: t.cycloneWarning,
      description: t.heavyRainfallExpected,
      region: "South 24 Parganas",
      severity: "high",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: "weather",
      status: "active",
      source: "IMD Kolkata"
    },
    {
      id: 2,
      title: t.floodAlert,
      description: t.riverLevelsRising,
      region: "Kolkata East",
      severity: "medium",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      type: "flood",
      status: "active",
      source: "Disaster Management"
    },
    {
      id: 3,
      title: t.heatWaveAdvisory,
      description: t.temperatureExpected,
      region: "Kolkata",
      severity: "medium",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      type: "heat",
      status: "active",
      source: "Health Department"
    },
    {
      id: 4,
      title: t.trafficAdvisory,
      description: t.roadClosure,
      region: "Park Street",
      severity: "low",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      type: "traffic",
      status: "active",
      source: "Traffic Police"
    }
  ];

  useEffect(() => {
    // Load initial alerts
    setAlerts(mockAlerts);
    setLastSync(new Date());

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncAlerts = async () => {
    if (!isOnline) {
      setSyncStatus('error');
      return;
    }

    setLoading(true);
    setSyncStatus('syncing');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate new alerts
      const newAlerts = [
        ...mockAlerts,
        {
          id: Date.now(),
          title: "New Weather Update",
          description: "Thunderstorm warning for next 3 hours.",
          region: "Kolkata Metro",
          severity: "medium",
          timestamp: new Date(),
          type: "weather",
          status: "active",
          source: "IMD Kolkata"
        }
      ];

      setAlerts(newAlerts);
      setLastSync(new Date());
      setSyncStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low': return <AlertTriangle className="w-5 h-5 text-green-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t.realTimeAlerts}</h2>
              <p className="text-sm text-gray-600">{t.latestDisasterWarnings}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Online Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-600" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-600" />
              )}
              <span className="text-sm text-gray-600">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            
            {/* Sync Button */}
            <button
              onClick={syncAlerts}
              disabled={loading || !isOnline}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center ${
                loading || !isOnline
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Syncing...' : 'Sync'}
            </button>
          </div>
        </div>
        
        {/* Sync Status */}
        {syncStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg flex items-center gap-2 rounded-lg"
          >
            {syncStatus === 'syncing' && (
              <div className="flex items-center gap-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Syncing alerts...</span>
              </div>
            )}
            {syncStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Alerts updated successfully</span>
              </div>
            )}
            {syncStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="text-sm">
                  {!isOnline ? 'No internet connection' : 'Sync failed. Please try again.'}
                </span>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Last Sync Time */}
        {lastSync && (
          <div className="mt-2 text-xs text-gray-500">
            {t.lastUpdated}: {lastSync.toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts</h3>
            <p className="text-gray-500">You're all set! No active alerts in your area.</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          {alert.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{alert.region}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{formatTimeAgo(alert.timestamp)}</span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm truncate">
                        {alert.source}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeAlerts;
