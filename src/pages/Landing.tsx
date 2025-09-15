import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Scan, History, BookOpen, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Scan,
      title: 'AI-Powered Detection',
      description: 'Advanced algorithms analyze emails and files for phishing threats and malware'
    },
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Instant threat assessment with detailed confidence scoring'
    },
    {
      icon: History,
      title: 'Scan History',
      description: 'Track all your scans and monitor threat patterns over time'
    },
    {
      icon: BookOpen,
      title: 'Security Education',
      description: 'Learn best practices to stay protected from cyber threats'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-blue-600 p-6 rounded-full shadow-lg">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Driven Phishing
            <span className="text-blue-600 block">Detection System</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Protect yourself from email threats with our intelligent detection system. 
            Analyze emails and attachments in real-time with advanced AI algorithms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scan"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Scan className="w-5 h-5" />
              <span>Start Scanning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/about"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Protection Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our advanced system provides multiple layers of security to keep you safe from cyber threats
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
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
      
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-blue-600 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.8%</div>
              <div className="text-blue-100">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">&lt;1s</div>
              <div className="text-blue-100">Average Scan Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Protection Available</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;