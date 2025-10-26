import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Phone, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { MOCK_USERS } from '../../data/mockData';

const RescueCoordination = ({ lang }) => {
  const t = getTranslation(lang);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Safe':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Aid':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Safe':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Needs Aid':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t.rescueCoordination}</h2>
            <p className="text-sm text-gray-600">Track affected areas and coordinate rescue efforts</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Affected Area Dashboard */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {t.affectedAreaDashboard}
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Affected Area Heatmap</p>
              <p className="text-sm text-gray-500">
                Interactive map showing disaster-affected regions with real-time updates
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-red-100 text-red-800 p-2 rounded">High Risk</div>
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded">Medium Risk</div>
                <div className="bg-green-100 text-green-800 p-2 rounded">Low Risk</div>
              </div>
            </div>
          </div>

          {/* GPS Tracking */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              {t.gpsTracking}
            </h3>
            
            <div className="space-y-3">
              {MOCK_USERS.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {user.id.split('-')[1]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.id}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.lastSeen}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                  
                  {user.location && (
                    <div className="mt-2 text-xs text-gray-500 font-mono">
                      Lat: {user.location.latitude.toFixed(4)}, Lng: {user.location.longitude.toFixed(4)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rescue Directory */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-600" />
              {t.rescueDirectory}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">NDRF Team</div>
                    <div className="text-sm text-gray-600">National Disaster Response Force</div>
                  </div>
                </div>
                <div className="text-lg font-mono text-gray-900">+91 90000 11111</div>
                <a
                  href="tel:+919000011111"
                  className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Local Police</div>
                    <div className="text-sm text-gray-600">Emergency Police Services</div>
                  </div>
                </div>
                <div className="text-lg font-mono text-gray-900">100</div>
                <a
                  href="tel:100"
                  className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Fire & Rescue</div>
                    <div className="text-sm text-gray-600">Fire Department Services</div>
                  </div>
                </div>
                <div className="text-lg font-mono text-gray-900">101</div>
                <a
                  href="tel:101"
                  className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueCoordination;
