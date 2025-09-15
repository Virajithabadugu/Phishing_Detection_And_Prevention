import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import ScanEmail from './pages/ScanEmail';
import History from './pages/History';
import PreventionTips from './pages/PreventionTips';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/scan" element={<ScanEmail />} />
            <Route path="/history" element={<History />} />
            <Route path="/prevention" element={<PreventionTips />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
        
        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">
                © 2025 PhishGuard - AI-Driven Phishing Detection System
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Built with React, TypeScript, and advanced security algorithms
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;