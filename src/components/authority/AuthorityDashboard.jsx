import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import AlertManagement from './AlertManagement';
import RescueCoordination from './RescueCoordination';
import ReportsAnalytics from './ReportsAnalytics';

const AuthorityDashboard = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Authority Control Center</h1>
            <p className="text-red-100">
              Monitor, manage, and coordinate disaster response operations.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Active Alerts</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Tracked Users</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">89%</div>
              <div className="text-sm text-gray-600">Safe Users</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">42%</div>
              <div className="text-sm text-gray-600">Risk Level</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Alert Management and Rescue Coordination */}
        <div className="lg:col-span-2 space-y-6">
          <AlertManagement lang={lang} />
          <RescueCoordination lang={lang} />
        </div>

        {/* Right Column - Reports and Analytics */}
        <div className="space-y-6">
          <ReportsAnalytics lang={lang} />
        </div>
      </div>

      {/* Emergency Response Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Emergency Response Status</h2>
            <p className="text-sm text-gray-600">Current disaster response operations</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">NDRF Teams</span>
            </div>
            <p className="text-sm text-green-700">3 teams deployed, 2 on standby</p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">Medical Units</span>
            </div>
            <p className="text-sm text-blue-700">5 ambulances active, 2 hospitals on alert</p>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">Communication</span>
            </div>
            <p className="text-sm text-yellow-700">Emergency channels active, 98% coverage</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthorityDashboard;
