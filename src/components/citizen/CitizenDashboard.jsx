
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../utils/i18n';
import { useLocalStorage } from '../../utils/storage';
import { MOCK_ALERTS } from '../../data/mockData';
import AlertsFeed from './AlertsFeed';
import RiskMeter from './RiskMeter';
import Helplines from './Helplines';
import Donations from './Donations';
import AIAssistant from './AIAssistant';

const CitizenDashboard = ({ lang }) => {
  const navigate = useNavigate();
  const t = getTranslation(lang);
  const [alerts, setAlerts] = useLocalStorage('disha-alerts', MOCK_ALERTS);
  const [riskScore, setRiskScore] = useLocalStorage('disha-risk', 42);
  const [location, setLocation] = useLocalStorage('disha-location', null);

  // Simulate live alert injection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newAlert = {
          id: Date.now(),
          title: "Heavy rainfall expected in next 3 hours",
          region: location ? `${location.latitude.toFixed(2)},${location.longitude.toFixed(2)}` : "Local region",
          severity: Math.random() > 0.5 ? "High" : "Medium",
          timestamp: Date.now(),
          description: "Heavy rainfall with potential for flooding. Stay indoors and avoid low-lying areas."
        };
        
        setAlerts(prev => [newAlert, ...prev]);
        setRiskScore(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 8 : -5))));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [location, setAlerts, setRiskScore]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🛡️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome to Disha AI</h1>
            <p className="text-blue-100">
              Your personal disaster awareness and safety companion. Stay informed, stay safe.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts and AI Assistant */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsFeed lang={lang} alerts={alerts} />
          <AIAssistant lang={lang} />
        </div>

        {/* Right Column - Risk Meter, Helplines, Donations */}
        <div className="space-y-6">
          <RiskMeter score={riskScore} lang={lang} />
          <Helplines lang={lang} />
          <Donations lang={lang} />
        </div>
      </div>

      {/* Emergency Tools Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Emergency Tools</h3>
              <p className="text-sm text-gray-600">Quick access to emergency contacts, location services, and safety resources</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/emergency-tools')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Open Emergency Tools
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{alerts.length}</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{riskScore}%</div>
          <div className="text-sm text-gray-600">Risk Level</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {location ? '📍' : '❌'}
          </div>
          <div className="text-sm text-gray-600">Location Status</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">24/7</div>
          <div className="text-sm text-gray-600">AI Assistant</div>
        </div>
      </motion.div>
    </div>
  );
};

export default CitizenDashboard;
