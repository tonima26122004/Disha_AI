import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { getTranslation } from '../utils/i18n';

const WeatherReport = ({ lang = 'en' }) => {
  const t = getTranslation(lang);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock weather data - in real app, this would come from API
  const mockWeatherData = {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 12,
      visibility: 8,
      pressure: 1013,
      uvIndex: 6,
      icon: 'partly-cloudy'
    },
    today: {
      high: 32,
      low: 24,
      precipitation: 20,
      sunrise: '06:15',
      sunset: '18:45',
      hourly: [
        { time: '06:00', temp: 24, condition: 'Clear', icon: 'sun' },
        { time: '09:00', temp: 26, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
        { time: '12:00', temp: 30, condition: 'Sunny', icon: 'sun' },
        { time: '15:00', temp: 32, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
        { time: '18:00', temp: 28, condition: 'Cloudy', icon: 'cloud' },
        { time: '21:00', temp: 26, condition: 'Light Rain', icon: 'cloud-rain' }
      ]
    },
    past7Days: [
      { date: '2024-01-15', high: 30, low: 22, condition: 'Sunny', precipitation: 0 },
      { date: '2024-01-14', high: 28, low: 20, condition: 'Partly Cloudy', precipitation: 5 },
      { date: '2024-01-13', high: 26, low: 18, condition: 'Rainy', precipitation: 15 },
      { date: '2024-01-12', high: 29, low: 21, condition: 'Cloudy', precipitation: 8 },
      { date: '2024-01-11', high: 31, low: 23, condition: 'Sunny', precipitation: 0 },
      { date: '2024-01-10', high: 27, low: 19, condition: 'Partly Cloudy', precipitation: 3 },
      { date: '2024-01-09', high: 25, low: 17, condition: 'Rainy', precipitation: 12 }
    ],
    forecast7Days: [
      { date: '2024-01-16', high: 33, low: 25, condition: 'Sunny', precipitation: 0, icon: 'sun' },
      { date: '2024-01-17', high: 31, low: 23, condition: 'Partly Cloudy', precipitation: 10, icon: 'partly-cloudy' },
      { date: '2024-01-18', high: 29, low: 21, condition: 'Cloudy', precipitation: 20, icon: 'cloud' },
      { date: '2024-01-19', high: 27, low: 19, condition: 'Rainy', precipitation: 35, icon: 'cloud-rain' },
      { date: '2024-01-20', high: 30, low: 22, condition: 'Partly Cloudy', precipitation: 15, icon: 'partly-cloudy' },
      { date: '2024-01-21', high: 32, low: 24, condition: 'Sunny', precipitation: 0, icon: 'sun' },
      { date: '2024-01-22', high: 34, low: 26, condition: 'Hot', precipitation: 0, icon: 'sun' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const loadWeatherData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
      setLoading(false);
    };

    loadWeatherData();
  }, []);

  const getWeatherIcon = (condition, icon) => {
    const iconMap = {
      'sun': <Sun className="w-6 h-6 text-yellow-500" />,
      'partly-cloudy': <Cloud className="w-6 h-6 text-gray-500" />,
      'cloud': <Cloud className="w-6 h-6 text-gray-600" />,
      'cloud-rain': <CloudRain className="w-6 h-6 text-blue-500" />,
      'cloud-snow': <CloudSnow className="w-6 h-6 text-blue-300" />
    };
    return iconMap[icon] || <Cloud className="w-6 h-6 text-gray-500" />;
  };

  const getTemperatureTrend = (current, previous) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-blue-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold">{t.weatherReport}</h2>
              <p className="text-blue-100 text-sm sm:text-base">{t.currentConditions}</p>
            </div>
          </div>
          
          <div className="flex gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-sm overflow-x-auto">
            <button
              onClick={() => setSelectedPeriod('today')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedPeriod === 'today' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t.today}
            </button>
            <button
              onClick={() => setSelectedPeriod('past')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedPeriod === 'past' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t.past7Days}
            </button>
            <button
              onClick={() => setSelectedPeriod('forecast')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedPeriod === 'forecast' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t.forecast}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedPeriod === 'today' && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Main Weather Card */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">{t.currentWeather}</h3>
                      <p className="text-blue-100 text-sm sm:text-base">Kolkata, West Bengal</p>
                    </div>
                    <div className="text-4xl sm:text-6xl opacity-80 flex-shrink-0">
                      {getWeatherIcon(weatherData.current.condition, weatherData.current.icon)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">{weatherData.current.temperature}°</div>
                      <p className="text-lg sm:text-xl text-blue-100 mb-3 sm:mb-4">{weatherData.current.condition}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                        <span>{t.feelsLike} {weatherData.current.temperature + 2}°</span>
                        <span className="hidden sm:inline">•</span>
                        <span>H: {weatherData.today.high}° L: {weatherData.today.low}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Metrics - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border border-blue-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-600">{t.humidity}</div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{weatherData.current.humidity}%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-600">{t.windSpeed}</div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{weatherData.current.windSpeed} km/h</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-600">{t.visibility}</div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{weatherData.current.visibility} km</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4 border border-orange-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-600">{t.uvIndex}</div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{weatherData.current.uvIndex}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Details */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">{t.todayOverview}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">{weatherData.today.high}°</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">High Temperature</div>
                </div>
                <div className="text-center bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">{weatherData.today.low}°</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Low Temperature</div>
                </div>
                <div className="text-center bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">{weatherData.today.precipitation}%</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Rain Chance</div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">Hourly Forecast</h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
                {weatherData.today.hourly.map((hour, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center bg-gradient-to-b from-gray-50 to-white rounded-xl p-2 sm:p-4 hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">{hour.time}</div>
                    <div className="mb-2 sm:mb-3">
                      {getWeatherIcon(hour.condition, hour.icon)}
                    </div>
                    <div className="text-sm sm:text-lg font-bold text-gray-900">{hour.temp}°</div>
                    <div className="text-xs text-gray-500 mt-1 hidden sm:block">{hour.condition}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedPeriod === 'past' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-purple-200">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-4 sm:mb-6">Past 7 Days Weather</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {weatherData.past7Days.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xl sm:text-2xl">
                        {getWeatherIcon(day.condition, 'cloud')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm sm:text-base mb-1">{day.condition}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-3">{day.precipitation}mm rain</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <div className="font-bold text-base sm:text-lg text-gray-900">{day.high}°</div>
                        <div className="text-xs sm:text-sm text-gray-600">{day.low}°</div>
                      </div>
                      {index > 0 && (
                        <div className="flex items-center">
                          {getTemperatureTrend(day.high, weatherData.past7Days[index - 1].high)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedPeriod === 'forecast' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-green-200">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-4 sm:mb-6">7-Day Forecast</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {weatherData.forecast7Days.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs sm:text-sm font-medium text-gray-600 bg-blue-100 px-2 sm:px-3 py-1 rounded-lg">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xl sm:text-2xl">
                        {getWeatherIcon(day.condition, day.icon)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm sm:text-base mb-1">{day.condition}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-3">{day.precipitation}% rain chance</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <div className="font-bold text-base sm:text-lg text-gray-900">{day.high}°</div>
                        <div className="text-xs sm:text-sm text-gray-600">{day.low}°</div>
                      </div>
                      {index > 0 && (
                        <div className="flex items-center">
                          {getTemperatureTrend(day.high, weatherData.forecast7Days[index - 1].high)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherReport;
