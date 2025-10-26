import React, { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';
import { getTranslation } from '../utils/i18n';

const AlertCreationModal = ({ isOpen, onClose, language }) => {
  const { createAlert, isSyncing, disasterTypes, locations } = useAlerts(language);
  const t = getTranslation(language);
  
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    severity: 'medium',
    location: '',
    type: 'emergency',
    disasterType: '',
    affectedArea: '',
    evacuationRequired: false,
    estimatedDuration: '',
    contactNumber: '',
    additionalInfo: ''
  });

  const handleCreateAlert = async () => {
    try {
      await createAlert(newAlert);
      // Reset form
      setNewAlert({ 
        title: '', 
        description: '', 
        severity: 'medium', 
        location: '', 
        type: 'emergency',
        disasterType: '',
        affectedArea: '',
        evacuationRequired: false,
        estimatedDuration: '',
        contactNumber: '',
        additionalInfo: ''
      });
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t.createNewAlert}</h3>
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t.title} <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder={t.enterAlertTitle}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t.location} <span className="text-red-500">*</span></label>
                  <select
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">{t.selectLocation}</option>
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.description} <span className="text-red-500">*</span></label>
                <textarea
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  placeholder={t.enterAlertDescription}
                  required
                />
              </div>

              {/* Alert Type and Severity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t.type}</label>
                  <select
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({...newAlert, type: e.target.value, disasterType: ''})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="emergency">{t.emergency}</option>
                    <option value="weather">{t.weather}</option>
                    <option value="traffic">{t.traffic}</option>
                    <option value="safety">{t.safety}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t.severity}</label>
                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="low">{t.low}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="high">{t.high}</option>
                    <option value="critical">{t.critical}</option>
                  </select>
                </div>
              </div>

              {/* Disaster Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.disasterType}</label>
                <select
                  value={newAlert.disasterType}
                  onChange={(e) => setNewAlert({...newAlert, disasterType: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">{t.selectDisasterType}</option>
                  {disasterTypes[newAlert.type]?.map((disaster) => (
                    <option key={disaster.value} value={disaster.value}>
                      {disaster.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Fields based on Alert Type */}
              {newAlert.type === 'emergency' && (
                <div className="space-y-4 p-4 bg-red-50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800">{t.emergencyDetails}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.affectedArea}</label>
                      <input
                        type="text"
                        value={newAlert.affectedArea}
                        onChange={(e) => setNewAlert({...newAlert, affectedArea: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder={t.enterAffectedArea}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.estimatedDuration}</label>
                      <select
                        value={newAlert.estimatedDuration}
                        onChange={(e) => setNewAlert({...newAlert, estimatedDuration: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="">{t.selectDuration}</option>
                        <option value="1-2 hours">{t.oneToTwoHours}</option>
                        <option value="2-6 hours">{t.twoToSixHours}</option>
                        <option value="6-12 hours">{t.sixToTwelveHours}</option>
                        <option value="12+ hours">{t.twelvePlusHours}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="evacuationRequired"
                      checked={newAlert.evacuationRequired}
                      onChange={(e) => setNewAlert({...newAlert, evacuationRequired: e.target.checked})}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="evacuationRequired" className="ml-2 block text-sm text-gray-700">
                      {t.evacuationRequired}
                    </label>
                  </div>
                </div>
              )}

              {newAlert.type === 'weather' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800">{t.weatherDetails}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.estimatedDuration}</label>
                      <select
                        value={newAlert.estimatedDuration}
                        onChange={(e) => setNewAlert({...newAlert, estimatedDuration: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="">{t.selectDuration}</option>
                        <option value="1-3 hours">{t.oneToThreeHours}</option>
                        <option value="3-6 hours">{t.threeToSixHours}</option>
                        <option value="6-12 hours">{t.sixToTwelveHours}</option>
                        <option value="12-24 hours">{t.twelveToTwentyFourHours}</option>
                        <option value="24+ hours">{t.twentyFourPlusHours}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.contactNumber}</label>
                      <input
                        type="tel"
                        value={newAlert.contactNumber}
                        onChange={(e) => setNewAlert({...newAlert, contactNumber: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder={t.enterContactNumber}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.additionalInfo}</label>
                <textarea
                  value={newAlert.additionalInfo}
                  onChange={(e) => setNewAlert({...newAlert, additionalInfo: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={2}
                  placeholder={t.enterAdditionalInfo}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleCreateAlert}
              disabled={isSyncing}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                isSyncing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSyncing ? t.creating : t.createAlert}
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCreationModal;
