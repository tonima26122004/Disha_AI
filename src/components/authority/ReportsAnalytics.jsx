import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line } from 'recharts';
import { TrendingUp, Cloud, AlertTriangle, Activity } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { RISK_CHART_DATA, RISK_PREDICTION } from '../../data/mockData';

const ReportsAnalytics = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <div className="space-y-6">
      {/* Risk Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{t.reports}</h2>
              <p className="text-sm text-gray-600">Risk trends and disaster analytics</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Alerts Distribution</h2>
              <p className="text-sm text-gray-600">Weekly alert patterns and frequency</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Prediction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{t.riskPrediction}</h2>
              <p className="text-sm text-gray-600">AI-powered disaster risk forecasting</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Weather Predictions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Cyclone Probability</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {RISK_PREDICTION.cycloneProbability}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">Flood Risk</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">
                    {RISK_PREDICTION.floodRisk}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Heatwave Risk</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    {RISK_PREDICTION.heatwaveRisk}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Earthquake Risk</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {RISK_PREDICTION.earthquakeRisk}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Model Status</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">AI Model</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Machine learning model analyzing weather patterns, historical data, and real-time sensors.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Data Sources</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      12 Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Weather stations, satellite imagery, seismic sensors, and social media monitoring.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Last Update</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Predictions updated every 15 minutes with latest data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
