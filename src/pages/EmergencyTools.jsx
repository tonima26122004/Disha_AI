import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Smartphone, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Compass, 
  Globe, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Camera,
  Upload,
  X,
  Brain,
  Loader2,
  Plus,
  ImageIcon,
  Menu,
  Shield,
  Bell,
  Settings,
  RefreshCw,
  Wifi,
  WifiOff,
  RotateCcw,
  Eye,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../utils/i18n';
import { useLocalStorage } from '../utils/storage';
import { useRole } from '../context/RoleContext';
import OfflineMap from '../components/OfflineMap';

const EmergencyTools = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useRole();
  const t = getTranslation(language);
  const [toast, setToast] = useState(null);
  const [location, setLocation] = useLocalStorage('disha-location', null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Camera and image analysis states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // New states for combined button and add item functionality
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [customItems, setCustomItems] = useState([]);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    showToast('Data synced successfully!', 'success');
  };

  // Monitor online status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    t.waterSupply,
    t.nonPerishableFood,
    t.flashlight,
    t.firstAidKit,
    t.emergencyRadio,
    t.personalDocuments,
    t.cashInSmallBills,
    t.phoneCharger,
    t.medications,
    t.blankets
  ];

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCameraModal(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      showToast('Camera access denied', 'error');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      stopCamera();
      setShowImagePreview(true);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setShowCameraModal(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        // Don't show preview for uploaded images, go directly to AI analysis
        analyzeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Analysis function (simulated)
  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enhanced AI analysis for emergency tools
    const emergencyItems = getAllItems();
    
    // Simulate more comprehensive emergency tool detection
    const possibleDetections = [
      { item: t.water, confidence: 0.95, index: 0, category: 'hydration' },
      { item: t.nonPerishableFood, confidence: 0.87, index: 1, category: 'nutrition' },
      { item: t.flashlight, confidence: 0.92, index: 2, category: 'lighting' },
      { item: t.firstAidKit, confidence: 0.88, index: 3, category: 'medical' },
      { item: t.emergencyRadio, confidence: 0.76, index: 4, category: 'communication' },
      { item: t.personalDocuments, confidence: 0.65, index: 5, category: 'documentation' },
      { item: t.cashInSmallBills, confidence: 0.58, index: 6, category: 'financial' },
      { item: t.phoneCharger, confidence: 0.89, index: 7, category: 'communication' },
      { item: t.medications, confidence: 0.82, index: 8, category: 'medical' },
      { item: t.blankets, confidence: 0.71, index: 9, category: 'shelter' }
    ];
    
    // Add some additional emergency-specific items that might be detected
    const additionalEmergencyItems = [
      { item: 'Emergency Whistle', confidence: 0.73, index: 10, category: 'safety' },
      { item: 'Multi-tool', confidence: 0.68, index: 11, category: 'tools' },
      { item: 'Emergency Blanket', confidence: 0.79, index: 12, category: 'shelter' },
      { item: 'Battery Pack', confidence: 0.85, index: 13, category: 'power' },
      { item: 'Emergency Candle', confidence: 0.64, index: 14, category: 'lighting' }
    ];
    
    // Combine all possible detections
    const allPossibleDetections = [...possibleDetections, ...additionalEmergencyItems];
    
    // Randomly select 3-6 items to simulate realistic detection
    const numDetections = Math.floor(Math.random() * 4) + 3; // 3-6 items
    const shuffled = allPossibleDetections.sort(() => 0.5 - Math.random());
    const selectedDetections = shuffled.slice(0, numDetections);
    
    // Add some randomness to confidence scores
    selectedDetections.forEach(detection => {
      detection.confidence = Math.max(0.5, detection.confidence + (Math.random() - 0.5) * 0.2);
    });
    
    // Sort by confidence
    selectedDetections.sort((a, b) => b.confidence - a.confidence);
    
    const finalDetectedItems = selectedDetections;
    
    setAnalysisResults(finalDetectedItems);
    
    // Auto-check detected items
    const newCheckedItems = new Set(checkedItems);
    finalDetectedItems.forEach(detected => {
      newCheckedItems.add(detected.index);
    });
    setCheckedItems(newCheckedItems);
    
    setIsAnalyzing(false);
    
    // Show success message with more details
    const highConfidenceItems = finalDetectedItems.filter(item => item.confidence > 0.8).length;
    showToast(`AI detected ${finalDetectedItems.length} emergency items (${highConfidenceItems} high confidence)!`, 'success');
  };

  const toggleItemCheck = (index) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(index)) {
      newCheckedItems.delete(index);
    } else {
      newCheckedItems.add(index);
    }
    setCheckedItems(newCheckedItems);
  };

  const clearAnalysis = () => {
    setCapturedImage(null);
    setAnalysisResults(null);
    setCheckedItems(new Set());
  };

  // New functions for combined image functionality
  const handleImageAction = (action) => {
    if (action === 'camera') {
      startCamera();
    } else if (action === 'upload') {
      fileInputRef.current?.click();
    }
    setShowImageModal(false);
  };

  // Image preview functions
  const retakePhoto = () => {
    setCapturedImage(null);
    setShowImagePreview(false);
    setAnalysisResults(null);
    startCamera();
  };

  const removeImage = () => {
    setCapturedImage(null);
    setShowImagePreview(false);
    setAnalysisResults(null);
  };


  const analyzeImageFromPreview = async () => {
    if (capturedImage) {
      await analyzeImage(capturedImage);
      setShowImagePreview(false);
    }
  };

  // Add new item functionality
  const addNewItem = () => {
    if (newItemText.trim()) {
      setCustomItems(prev => [...prev, newItemText.trim()]);
      setNewItemText('');
      setShowAddItemModal(false);
      showToast('New item added to checklist!');
    }
  };

  // Get all items (original + custom)
  const getAllItems = () => {
    return [...emergencyChecklist, ...customItems];
  };

  // Navigation items
  const navigation = [
    { name: t.dashboard, href: '/citizen', icon: Bell, current: false },
    { name: t.aiAssistant, href: '/ai-assistant', icon: Brain, current: false },
    { name: t.emergencyTools, href: '/emergency-tools', icon: Shield, current: true },
    { name: t.settings, href: '/settings', icon: Settings, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    } else if (item.href.startsWith('#')) {
                      // Handle hash navigation within the same page
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Disha AI</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('/')) {
                      navigate(item.href);
                    } else if (item.href.startsWith('#')) {
                      // Handle hash navigation within the same page
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <div className="lg:hidden">
            <button
                  type="button"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
            >
                  <Menu className="h-6 w-6" />
            </button>
              </div>

              {/* Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1 lg:flex-none">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold text-gray-900 truncate">{t.emergencyTools}</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">{t.emergencyPreparednessTools}</p>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Online Status - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-gray-600">
                    {isOnline ? t.online : t.offline}
                  </span>
              </div>

                {/* Sync Button */}
                <button
                  onClick={handleSync}
                  disabled={isSyncing || !isOnline}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isSyncing || !isOnline
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isSyncing ? t.syncing : t.sync}</span>
                </button>

                {/* Language Selector */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Globe className="w-4 h-4 text-gray-500 hidden sm:block" />
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="text-xs sm:text-sm border border-gray-300 rounded-lg px-1 sm:px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  >
                    <option value="en">EN</option>
                    <option value="bn">বাংলা</option>
                    <option value="hi">हिन्दी</option>
                  </select>
              </div>
            </div>
          </div>
        </div>
      </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Professional Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Emergency Contacts - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 lg:col-span-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg border border-red-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t.emergencyContacts}</h2>
                        <p className="text-xs sm:text-sm text-gray-600">{t.quickAccessEmergencyServices}</p>
                      </div>
            </div>
            
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="tel:112"
                        className="group flex items-center justify-between p-4 sm:p-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-base sm:text-lg font-bold">{t.emergencyCall}</div>
                            <div className="text-xs sm:text-sm opacity-90">{t.oneTapEmergencyCall}</div>
                    </div>
                  </div>
                        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                </a>

                <a
                  href="sms:112?body=Emergency help needed at my location"
                        className="group flex items-center justify-between p-4 sm:p-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-base sm:text-lg font-bold">{t.smsAlert}</div>
                            <div className="text-xs sm:text-sm opacity-90">{t.sendEmergencySMS}</div>
                    </div>
                  </div>
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>

                {/* Location Services - Medium Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
                  className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">{t.location}</h2>
                        <p className="text-xs text-gray-600">{t.shareYourLocation}</p>
                      </div>
            </div>
            
                    <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={requestLocation}
                        className="w-full flex items-center gap-3 p-3 sm:p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                        <Compass className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{t.getLocation}</span>
                </button>

                {location && (
                        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center gap-2 text-green-800 mb-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="font-semibold text-xs sm:text-sm">{t.locationCaptured}</span>
                    </div>
                          <div className="text-xs text-green-700 font-mono bg-white p-2 rounded border break-all">
                            Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

                {/* Offline Map - Full Width Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
                  className="md:col-span-2 lg:col-span-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t.offlineMap}</h2>
                        <p className="text-xs sm:text-sm text-gray-600">{t.offlineNavigation}</p>
                      </div>
            </div>
            
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                      <OfflineMap lang={language} />
              </div>
            </div>
          </motion.div>

                {/* Emergency Checklist - Full Width Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
                  className="md:col-span-2 lg:col-span-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-lg border border-indigo-200 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t.emergencyKit}</h2>
                          <p className="text-xs sm:text-sm text-gray-600">{t.essentialItems}</p>
                        </div>
                </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                  <button
                          onClick={() => setShowImageModal(true)}
                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                  >
                          <ImageIcon className="w-4 h-4" />
                          <span className="hidden sm:inline">{t.addImage}</span>
                          <span className="sm:hidden">Image</span>
                  </button>
                  <button
                          onClick={() => setShowAddItemModal(true)}
                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                  >
                          <Plus className="w-4 h-4" />
                          <span className="hidden sm:inline">{t.addItem}</span>
                          <span className="sm:hidden">Add</span>
                  </button>
                </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-indigo-200">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-semibold text-indigo-900">{t.progress}</span>
                        <span className="text-xs sm:text-sm text-indigo-700 font-medium">
                          {checkedItems.size} / {getAllItems().length} {t.items}
                        </span>
                      </div>
                      <div className="w-full bg-indigo-200 rounded-full h-2 sm:h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(checkedItems.size / getAllItems().length) * 100}%` }}
                        ></div>
              </div>
            </div>
            
              {/* Image Preview and Analysis */}
              {capturedImage && (
                      <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-indigo-200">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                       {t.aiAnalysis}
                    </h3>
                    <button
                      onClick={clearAnalysis}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <img 
                        src={capturedImage} 
                        alt="Captured emergency kit" 
                              className="w-full h-40 sm:h-48 object-cover rounded-xl border shadow-sm"
                      />
                    </div>
                    
                          <div className="space-y-3 sm:space-y-4">
                      {isAnalyzing ? (
                              <div className="flex items-center gap-2 sm:gap-3 text-purple-600 p-3 sm:p-4 bg-purple-50 rounded-xl">
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="font-medium text-sm sm:text-base">Analyzing image...</span>
                        </div>
                      ) : analysisResults ? (
                              <div className="p-3 sm:p-4 bg-green-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{t.detectedItems}</h4>
                                <div className="space-y-2">
                          {analysisResults.map((result, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <span className="font-medium truncate block">{result.item}</span>
                                        {result.category && (
                                          <span className="text-xs text-blue-600 capitalize">{result.category}</span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-gray-500 text-xs font-medium">{Math.round(result.confidence * 100)}%</span>
                                      </div>
                            </div>
                          ))}
                                </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => analyzeImage(capturedImage)}
                                className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                        >
                          <Brain className="w-4 h-4" />
                          Analyze with AI
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Checklist */}
                    <div className="max-h-80 sm:max-h-96 overflow-y-auto bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-indigo-200">
                      <div className="space-y-2 sm:space-y-3">
                        {getAllItems().map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                            className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer ${
                              checkedItems.has(index) 
                                ? 'bg-green-50 border border-green-200 shadow-sm' 
                                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleItemCheck(index)}
                    >
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 border-2 rounded-lg mt-0.5 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                        checkedItems.has(index) 
                                ? 'bg-green-600 border-green-600 shadow-sm' 
                                : 'border-gray-300 hover:border-indigo-400'
                      }`}>
                        {checkedItems.has(index) && (
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                            <span className={`font-medium transition-all duration-200 text-sm sm:text-base ${
                              checkedItems.has(index) 
                                ? 'text-green-800 line-through' 
                                : 'text-gray-700 hover:text-indigo-700'
                      }`}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
          </div>

        </main>
      </div>

      {/* Image Selection Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.addImage}</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-center">{t.chooseHowToAddImage}</p>
              
              <div className="grid gap-3">
                <button
                  onClick={() => handleImageAction('camera')}
                  className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{t.takePhoto}</div>
                    <div className="text-sm opacity-90">{t.useCameraToCapture}</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleImageAction('upload')}
                  className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{t.uploadImage}</div>
                    <div className="text-sm opacity-90">{t.selectFromGallery}</div>
                  </div>
                </button>
                </div>
                </div>
              </div>
            </div>
      )}

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.addNewItem}</h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.itemDescription}
                </label>
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder={t.enterEmergencyItem}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={addNewItem}
                  disabled={!newItemText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.addItem}
                </button>
                <button
                  onClick={() => setShowAddItemModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
        </div>
      </div>
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t.takePhoto}</h3>
              </div>
              <button
                onClick={stopCamera}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-xl p-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                  className="w-full h-80 bg-gray-200 rounded-lg object-cover"
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Position your emergency items in the camera view and tap capture
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Camera className="w-5 h-5" />
                  <span className="font-semibold">{t.capture}</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="font-semibold">{t.cancel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImagePreview && capturedImage && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.imagePreview}</h3>
              <button
                onClick={removeImage}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t.imageCaptured}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{t.readyForAnalysis}</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={analyzeImageFromPreview}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  {t.analyzeWithAI}
                </button>
                <button
                  onClick={retakePhoto}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t.retakePhoto}
                </button>
                <button
                  onClick={removeImage}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.removeImage}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />

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
