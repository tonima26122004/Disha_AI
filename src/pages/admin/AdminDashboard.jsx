import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Settings, 
  Users, 
  Shield, 
  BarChart3, 
  Menu, 
  X,
  Database,
  Server,
  Globe,
  Lock,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRole } from '../../context/RoleContext';
import { getTranslation } from '../../utils/i18n';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentRole, language, changeLanguage } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const t = getTranslation(language);

  const handleLogout = () => {
    logout();
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

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
  };

  const navigation = [
    { name: t.dashboard, href: '/admin', icon: BarChart3, current: location.pathname === '/admin' },
    { name: t.userManagement, href: '/admin/users', icon: Users, current: location.pathname === '/admin/users' },
    { name: t.systemSettings, href: '/admin/settings', icon: Settings, current: location.pathname === '/admin/settings' },
    { name: t.database, href: '/admin/database', icon: Database, current: location.pathname === '/admin/database' },
    { name: t.security, href: '/admin/security', icon: Lock, current: location.pathname === '/admin/security' },
    { name: t.settings, href: '/admin/admin-settings', icon: Settings, current: location.pathname === '/admin/admin-settings' },
  ];

  const systemStats = [
    { name: t.totalUsers, value: '1,234', icon: Users, color: 'blue' },
    { name: t.activeAlerts, value: '45', icon: Shield, color: 'red' },
    { name: t.systemUptime, value: '99.9%', icon: Server, color: 'green' },
    { name: t.apiCalls, value: '12.5K', icon: Globe, color: 'purple' },
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
              <Shield className="h-8 w-8 text-indigo-600" />
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
                      // Handle hash navigation for same page sections
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
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
              <Shield className="h-8 w-8 text-indigo-600" />
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
                      // Handle hash navigation for same page sections
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-indigo-100 text-indigo-900'
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
                    Admin
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
                  className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1 lg:flex-none">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold text-gray-900 truncate">{t.adminDashboard}</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">{t.manageSystemUsers}</p>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Online Status */}
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
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
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
                    className="text-xs sm:text-sm border border-gray-300 rounded-lg px-1 sm:px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
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

              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {systemStats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Admin Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* User Management */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {t.userManagement}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.totalUsers}</span>
                        </div>
                        <span className="text-sm text-gray-500">1,234</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.activeUsers}</span>
                        </div>
                        <span className="text-sm text-gray-500">892</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-red-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.bannedUsers}</span>
                        </div>
                        <span className="text-sm text-gray-500">12</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        {t.manageUsers}
                      </button>
                    </div>
                  </div>
                </div>

                {/* System Settings */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {t.systemSettings}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Server className="h-5 w-5 text-purple-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.serverStatus}</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">{t.online}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Database className="h-5 w-5 text-orange-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.database}</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">{t.healthy}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{t.apiStatus}</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">{t.operational}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                        {t.systemSettings}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Monitoring */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Security */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {t.securityMonitoring}
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-green-900">{t.securityStatus}</p>
                            <p className="text-sm text-green-700">{t.allSystemsSecure}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">{t.firewall}</p>
                            <p className="text-sm text-blue-700">{t.activeAndUpdated}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {t.systemAnalytics}
                    </h3>
                    <div className="space-y-4">
                      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">{t.performanceChart}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">99.9%</p>
                          <p className="text-sm text-gray-500">{t.uptime}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">2.3s</p>
                          <p className="text-sm text-gray-500">{t.avgResponse}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
