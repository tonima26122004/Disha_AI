import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Compass, 
  Globe, 
  Database, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { getTranslation } from '../../utils/i18n';
import { useLocalStorage } from '../../utils/storage';

const EmergencyTools = ({ lang, location, setLocation }) => {
  const t = getTranslation(lang);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation not supported by this browser', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        showToast(t.locationCaptured);
      },
      (error) => {
        console.error('Error getting location:', error);
        showToast(t.locationFailed, 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const emergencyChecklist = [
    "Water (1 gallon per person per day for 3 days)",
    "Non-perishable food (3-day supply)",
    "Flashlight with extra batteries",
    "First aid kit",
    "Emergency radio (battery or hand-crank)",
    "Personal documents (ID, insurance, etc.)",
    "Cash in small bills",
    "Phone charger and backup battery",
    "Medications and medical supplies",
    "Blankets and warm clothing"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t.emergencyTools}</h2>
            <p className="text-sm text-gray-600">Quick access emergency tools and resources</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              Emergency Contacts
            </h3>
            
            <div className="grid gap-3">
              <a
                href="tel:112"
                className="flex items-center justify-between p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Emergency (112)</div>
                    <div className="text-sm opacity-90">One-tap emergency call</div>
                  </div>
                </div>
                <AlertTriangle className="w-5 h-5" />
              </a>

              <a
                href="sms:112?body=Emergency help needed at my location"
                className="flex items-center justify-between p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">SMS Alert</div>
                    <div className="text-sm opacity-90">Send emergency SMS</div>
                  </div>
                </div>
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Location Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {t.location}
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={requestLocation}
                className="w-full flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Compass className="w-5 h-5" />
                <span className="font-medium">{t.getLocation}</span>
              </button>

              {location && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Location Captured</span>
                  </div>
                  <div className="text-sm text-green-700 font-mono">
                    Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Offline Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              {t.offlineMap}
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Offline Map Placeholder</p>
              <p className="text-sm text-gray-500">
                In a PWA build, this would show cached map tiles for offline navigation during emergencies.
              </p>
            </div>
          </div>

          {/* Emergency Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              {t.emergencyKit}
            </h3>
            
            <div className="max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {emergencyChecklist.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyTools;
