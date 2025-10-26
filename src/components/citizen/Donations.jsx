import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { DONATION_LINKS } from '../../data/mockData';

const Donations = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t.donations}</h2>
            <p className="text-sm text-gray-600">Support disaster relief efforts</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-3">
          {DONATION_LINKS.map((link, index) => (
            <motion.div
              key={link.url}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {link.name}
                    </h3>
                    {link.description && (
                      <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-blue-600 font-mono">{link.url}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;
