import React from 'react';
import { motion } from 'framer-motion';
import { Siren, Shield, Languages, Power } from 'lucide-react';
import { getTranslation, LANGUAGES } from '../utils/i18n';

const Header = ({ lang, setLang, role, setRole, onLogout }) => {
  const t = getTranslation(lang);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Siren className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
              <p className="text-sm text-gray-600">{t.tagline}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Role Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {role === 'citizen' ? t.citizen : t.authority}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-gray-600" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">{t.roleSelector}:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="citizen">{t.citizen}</option>
              <option value="authority">{t.authority}</option>
            </select>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Power className="w-4 h-4" />
            <span className="text-sm font-medium">{t.logout}</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
