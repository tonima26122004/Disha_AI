import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Brain, 
  Phone, 
  Settings, 
  Menu, 
  X,
  Shield,
  RefreshCw,
  Wifi,
  WifiOff,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { getTranslation } from '../utils/i18n';
import RealTimeAlerts from '../components/RealTimeAlerts';
import WeatherReport from '../components/WeatherReport';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentRole, language, changeLanguage } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const t = getTranslation(language);

  const handleLogout = () => {
    logout();
  };

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
  };

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

  const navigation = [
    { name: t.dashboard, href: '/citizen', icon: Bell, current: true },
    { name: t.aiAssistant, href: '/ai-assistant', icon: Brain, current: false },
    { name: t.emergencyTools, href: '/emergency-tools', icon: Shield, current: false },
    { name: t.settings, href: '/settings', icon: Settings, current: false },
  ];

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
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    } else if (item.href.startsWith('#')) {
                      // Handle hash navigation within the same page
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
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
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    } else if (item.href.startsWith('#')) {
                      // Handle hash navigation within the same page
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
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
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1 lg:flex-none">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold text-gray-900 truncate">{t.citizenDashboard}</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">{t.stayInformed}</p>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Online Status - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-gray-600">
                    {isOnline ? t.online : t.offline}
                  </span>
                </div>

                {/* Sync Button */}
                <button
                  onClick={handleSync}
                  disabled={isSyncing || !isOnline}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isSyncing || !isOnline
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isSyncing ? t.syncing : t.sync}</span>
                </button>

                {/* Language Selector */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Globe className="w-4 h-4 text-gray-500 hidden sm:block" />
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="text-xs sm:text-sm border border-gray-300 rounded-lg px-1 sm:px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  >
                    <option value="en">EN</option>
                    <option value="bn">বাংলা</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Professional Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Real-time Alerts - Large Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 lg:col-span-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg border border-red-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <RealTimeAlerts lang={language} />
                  </div>
                </motion.div>

                {/* Quick Actions - Medium Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{t.quickActions}</h2>
            <p className="text-xs text-gray-600">{t.accessEssentialTools}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/ai-assistant')}
                        className="w-full flex items-center gap-3 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">AI Assistant</span>
                      </button>
                      
                      <button
                        onClick={() => navigate('/emergency-tools')}
                        className="w-full flex items-center gap-3 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">Emergency Tools</span>
                      </button>
                      
                      <button
                        onClick={() => navigate('/settings')}
                        className="w-full flex items-center gap-3 p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">Settings</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Weather Report - Full Width Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-2 lg:col-span-12 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <WeatherReport lang={language} />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors">
          <Phone className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default CitizenDashboard;
