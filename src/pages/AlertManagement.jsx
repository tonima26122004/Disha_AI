import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Plus,
  Shield,
  RefreshCw,
  Wifi,
  WifiOff,
  Globe,
  BarChart3,
  Users,
  X,
  Menu,
  Settings,
  AlertTriangle,
  Clock,
  MapPin,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { getTranslation } from '../utils/i18n';

const AlertManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentRole, language, changeLanguage } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    severity: 'medium',
    location: '',
    type: 'emergency'
  });
  const [alerts, setAlerts] = useState([
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
  const t = getTranslation(language);

  useEffect(() => {
    loadAlerts();
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    loadAlerts();
  };

  const loadAlerts = async () => {
    // Simulate loading alerts
    console.log('Loading alerts...');
  };

  const handleCreateAlert = async () => {
    const alert = {
      id: alerts.length + 1,
      ...newAlert,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'active'
    };
    setAlerts([alert, ...alerts]);
    setShowCreateAlert(false);
    setNewAlert({ title: '', description: '', severity: 'medium', location: '', type: 'emergency' });
  };

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: t.dashboard, href: '/authority', icon: BarChart3, current: false },
    { name: t.alertManagement, href: '/authority/alerts', icon: Bell, current: true },
    { name: t.rescueCoordination, href: '/authority/rescue', icon: Users, current: false },
    { name: t.reports, href: '/authority/reports', icon: BarChart3, current: false },
    { name: t.settings, href: '/authority/settings', icon: Settings, current: false },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-red-100 text-red-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-red-100 text-red-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Fixed Header */}
              <div className="sticky top-0 z-30 bg-white border-b border-gray-200 mb-8 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.alertManagement}</h1>
                      <p className="text-sm text-gray-600">{t.latestDisasterWarnings}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Language Selector */}
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                        <option value="hi">हिन्दी</option>
                      </select>
                    </div>
                    
                    {/* Sync Button */}
                    <button
                      onClick={handleSync}
                      disabled={isSyncing}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isSyncing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? t.syncing : t.sync}</span>
                    </button>
                    
                    {/* Online Status */}
                    <div className="flex items-center space-x-2">
                      {isOnline ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {isOnline ? t.online : t.offline}
                      </span>
                    </div>
                    
                    {/* Create Alert Button */}
                    <button
                      onClick={() => setShowCreateAlert(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      {t.createAlert}
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert Management Content */}
              <div className="space-y-6">
                {/* Alerts List */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Active Alerts ({alerts.filter(a => a.status === 'active').length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              <h4 className="text-lg font-medium text-gray-900">{alert.title}</h4>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {alert.status}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{alert.description}</p>
                            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {alert.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {alert.timestamp}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {alert.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                              View Details
                            </button>
                            <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                              Resolve
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCreateAlert(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Alert</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newAlert.title}
                      onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter alert title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newAlert.description}
                      onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={3}
                      placeholder="Enter alert description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Severity</label>
                      <select
                        value={newAlert.severity}
                        onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={newAlert.type}
                        onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="emergency">Emergency</option>
                        <option value="weather">Weather</option>
                        <option value="traffic">Traffic</option>
                        <option value="safety">Safety</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCreateAlert}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Alert
                </button>
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManagement;
