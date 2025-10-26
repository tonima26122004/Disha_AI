import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Brain, 
  MapPin, 
  Phone, 
  Globe,
  Users,
  BarChart3,
  MessageCircle,
  Siren
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Real-time Alerts",
      description: "Get instant notifications about disasters and emergencies in your area"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Risk Prediction", 
      description: "Advanced AI models predict and assess disaster risks before they happen"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Multilingual Chat",
      description: "Get safety guidance in your preferred language with our AI assistant"
    },
    {
      icon: <Siren className="w-8 h-8" />,
      title: "SOS Tools",
      description: "One-tap emergency alerts and offline safety resources"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Authority Dashboard",
      description: "Comprehensive tools for disaster management and rescue coordination"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location Services",
      description: "GPS tracking and location-based risk assessment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Disha AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Disaster Awareness & 
              <span className="text-blue-600"> Risk Guidance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered platform for disaster preparedness, real-time alerts, and emergency coordination. 
              Stay safe, stay informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Log In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for disaster preparedness and emergency response
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Disha AI
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Disha AI is an innovative disaster awareness platform that combines artificial intelligence, 
                real-time data, and community coordination to enhance disaster preparedness and response.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to save lives by providing timely information, predictive insights, 
                and emergency tools to citizens, authorities, and rescue teams.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                  AI-Powered
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  Real-time
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
                  Multilingual
                </div>
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-semibold">
                  Community
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Lives Saved</span>
                  <span className="font-bold">1,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Alerts Sent</span>
                  <span className="font-bold">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Communities Served</span>
                  <span className="font-bold">100+</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="font-bold">&lt; 5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Disha AI for their disaster preparedness needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">Disha AI</span>
              </div>
              <p className="text-gray-400">
                Disaster awareness and risk guidance platform powered by AI.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Alerts</li>
                <li>AI Assistant</li>
                <li>Emergency Tools</li>
                <li>Risk Prediction</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Emergency: 112</li>
                <li>Safety Guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Language</h3>
              <select className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700">
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Disha AI. Built for disaster preparedness and community safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
