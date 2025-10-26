import React from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { HELPLINES } from '../../data/mockData';

const Helplines = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t.helplines}</h2>
            <p className="text-sm text-gray-600">Emergency contact numbers</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-3">
          {HELPLINES.map((helpline, index) => (
            <motion.div
              key={helpline.phone}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{helpline.name}</h3>
                  {helpline.description && (
                    <p className="text-sm text-gray-600 mt-1">{helpline.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <PhoneCall className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-mono text-gray-900">{helpline.phone}</span>
                  </div>
                </div>
                <a
                  href={`tel:${helpline.phone}`}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Helplines;
