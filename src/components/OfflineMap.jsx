import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Wifi, 
  WifiOff,
  Trash2,
  HardDrive
} from 'lucide-react';
import GoogleMap from './GoogleMap';
import { useLocalStorage } from '../utils/storage';
import { getTranslation } from '../utils/i18n';

const OfflineMap = ({ lang = 'en' }) => {
  const t = getTranslation(lang);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedMaps, setDownloadedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mapCenter, setMapCenter] = useState({ lat: 22.5726, lng: 88.3639 }); // Kolkata
  const [mapZoom, setMapZoom] = useState(10);

  // Load downloaded maps from localStorage
  useEffect(() => {
    const savedMaps = localStorage.getItem('offline-maps');
    if (savedMaps) {
      setDownloadedMaps(JSON.parse(savedMaps));
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadOfflineMap = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate map download process
      const mapName = `Map_${new Date().toISOString().split('T')[0]}`;
      const mapData = {
        id: Date.now(),
        name: mapName,
        center: mapCenter,
        zoom: mapZoom,
        downloadedAt: new Date().toISOString(),
        size: '15.2 MB',
        status: 'downloaded'
      };

      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Save to localStorage
      const updatedMaps = [...downloadedMaps, mapData];
      setDownloadedMaps(updatedMaps);
      localStorage.setItem('offline-maps', JSON.stringify(updatedMaps));

      setDownloadProgress(0);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const deleteOfflineMap = (mapId) => {
    const updatedMaps = downloadedMaps.filter(map => map.id !== mapId);
    setDownloadedMaps(updatedMaps);
    localStorage.setItem('offline-maps', JSON.stringify(updatedMaps));
    
    if (selectedMap && selectedMap.id === mapId) {
      setSelectedMap(null);
    }
  };

  const selectMap = (map) => {
    setSelectedMap(map);
    setMapCenter(map.center);
    setMapZoom(map.zoom);
  };

  const getStorageUsed = () => {
    return downloadedMaps.reduce((total, map) => {
      const size = parseFloat(map.size);
      return total + (isNaN(size) ? 0 : size);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? t.online : t.offline}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">
              {t.storageUsed}: {getStorageUsed().toFixed(1)} MB
            </span>
          </div>
        </div>

        <button
          onClick={downloadOfflineMap}
          disabled={isDownloading || !isOnline}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? t.downloading : t.downloadCurrentArea}
        </button>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium text-blue-900">Downloading offline map...</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-700 mt-1">{downloadProgress}% complete</p>
        </motion.div>
      )}

      {/* Map Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedMap ? selectedMap.name : t.currentLocation}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMap ? t.offlineMap : t.onlineMap}
                </p>
              </div>
            </div>
            
            {selectedMap && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Available Offline</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-96">
          <GoogleMap
            center={mapCenter}
            zoom={mapZoom}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Downloaded Maps List */}
      {downloadedMaps.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{t.downloadedMaps}</h3>
            <p className="text-sm text-gray-600">{t.yourOfflineMaps}</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {downloadedMaps.map((map) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedMap?.id === map.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{map.name}</h4>
                      <p className="text-sm text-gray-600">
                        {t.downloaded}: {new Date(map.downloadedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">{t.size}: {map.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => selectMap(map)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedMap?.id === map.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {selectedMap?.id === map.id ? t.active : t.select}
                    </button>
                    
                    <button
                      onClick={() => deleteOfflineMap(map.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Offline Usage Instructions */}
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Offline Mode</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You're currently offline. Downloaded maps will be available for navigation even without internet connection.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OfflineMap;
