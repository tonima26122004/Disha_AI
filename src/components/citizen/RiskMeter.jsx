import React from 'react';
import { motion } from 'framer-motion';
import { Radar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

const RiskMeter = ({ score, lang }) => {
  const t = getTranslation(lang);

  const getRiskLevel = (score) => {
    if (score >= 70) return { level: 'High', color: 'red', bgColor: 'bg-red-500' };
    if (score >= 40) return { level: 'Medium', color: 'yellow', bgColor: 'bg-yellow-500' };
    return { level: 'Low', color: 'green', bgColor: 'bg-green-500' };
  };

  const getTrendIcon = (score) => {
    if (score > 60) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (score < 30) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const riskInfo = getRiskLevel(score);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Radar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t.riskLevel}</h2>
          <p className="text-sm text-gray-600">Current disaster risk assessment</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Risk Score</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{score}</span>
            {getTrendIcon(score)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Low</span>
            <span className="text-gray-600">Medium</span>
            <span className="text-gray-600">High</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${riskInfo.bgColor} rounded-full`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            riskInfo.color === 'red' ? 'bg-red-100 text-red-800' :
            riskInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {riskInfo.level} Risk
          </div>
          <div className="text-xs text-gray-500">
            Updated {new Date().toLocaleTimeString()}
          </div>
        </div>

        {score >= 70 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <p className="text-sm text-red-800 font-medium">
              ⚠️ High risk detected. Please follow safety protocols and stay alert for official updates.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskMeter;
