import React from 'react';
import { AlertTriangle, MapPin, Clock, User } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
import { getTranslation } from '../utils/i18n';

const AlertCard = ({ alert, language, showActions = true }) => {
  const { translateAlertData } = useAlerts(language);
  const t = getTranslation(language);
  
  const translatedAlert = translateAlertData(alert);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h4 className="text-lg font-medium text-gray-900">{translatedAlert.title}</h4>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
              {translatedAlert.severity}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {translatedAlert.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{translatedAlert.description}</p>
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {translatedAlert.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {alert.timestamp}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {translatedAlert.type}
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              {t.viewDetails}
            </button>
            <button className="text-green-600 hover:text-green-900 text-sm font-medium">
              {t.resolve}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
