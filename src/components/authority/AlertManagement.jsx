import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Send, MapPin, Clock, AlertTriangle, X } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { useLocalStorage } from '../../utils/storage';
import { MOCK_ALERTS } from '../../data/mockData';

const AlertManagement = ({ lang }) => {
  const t = getTranslation(lang);
  const [alerts, setAlerts] = useLocalStorage('disha-authority-feed', MOCK_ALERTS);
  const [compose, setCompose] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [affectedArea, setAffectedArea] = useState('Kolkata Metro');
  const [showCompose, setShowCompose] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const publishAlert = () => {
    if (!compose.trim()) return;

    const newAlert = {
      id: Date.now(),
      title: compose.trim(),
      region: affectedArea,
      severity,
      timestamp: Date.now(),
      description: `Alert published by authority for ${affectedArea} region.`
    };

    setAlerts(prev => [newAlert, ...prev]);
    setCompose('');
    setShowCompose(false);
  };

  const deleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{t.alertManagement}</h2>
              <p className="text-sm text-gray-600">Publish and manage disaster alerts</p>
            </div>
          </div>
          <button
            onClick={() => setShowCompose(!showCompose)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {t.publishAlert}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Compose Alert Form */}
        {showCompose && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.compose}</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Message
                </label>
                <textarea
                  value={compose}
                  onChange={(e) => setCompose(e.target.value)}
                  placeholder="Enter alert message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.severity}
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.affectedArea}
                  </label>
                  <input
                    type="text"
                    value={affectedArea}
                    onChange={(e) => setAffectedArea(e.target.value)}
                    placeholder="Enter affected area..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={publishAlert}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t.publish}
                </button>
                <button
                  onClick={() => {
                    setCompose('');
                    setShowCompose(false);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Alerts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.activeAlerts}</h3>
          
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No active alerts</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{alert.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </div>
                        {alert.description && (
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.region}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertManagement;
