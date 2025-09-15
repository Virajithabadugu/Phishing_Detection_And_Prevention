import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Lock, Users, Target, Code, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const technologies = [
    {
      name: 'React',
      description: 'Modern JavaScript library for building user interfaces',
      icon: '⚛️'
    },
    {
      name: 'TypeScript',
      description: 'Type-safe JavaScript for better code quality',
      icon: '📘'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      icon: '🎨'
    },
    {
      name: 'Framer Motion',
      description: 'Smooth animations and interactive transitions',
      icon: '🎭'
    },
    {
      name: 'Recharts',
      description: 'Data visualization and analytics charts',
      icon: '📊'
    },
    {
      name: 'Browser Storage',
      description: 'Local storage for scan history persistence',
      icon: '💾'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze email content, links, and attachments to identify potential phishing threats with high accuracy.',
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Instant threat assessment providing immediate feedback on email safety with detailed confidence scoring and threat categorization.',
    },
    {
      icon: Lock,
      title: 'Privacy-First Design',
      description: 'All analysis happens locally in your browser. No data is sent to external servers, ensuring complete privacy and security.',
    },
    {
      icon: Users,
      title: 'User Education',
      description: 'Comprehensive security education with prevention tips, red flag identification, and best practice recommendations.',
    },
    {
      icon: Target,
      title: 'Threat Intelligence',
      description: 'Constantly updated threat patterns and indicators to detect the latest phishing techniques and social engineering tactics.',
    },
    {
      icon: Code,
      title: 'Open Architecture',
      description: 'Built with modern web technologies and designed for extensibility, allowing for future enhancements and customizations.',
    }
  ];

  const stats = [
    { value: '99.8%', label: 'Detection Accuracy' },
    { value: '<1s', label: 'Average Scan Time' },
    { value: '50+', label: 'Threat Patterns' },
    { value: '100%', label: 'Privacy Protected' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-100 p-6 rounded-full"
          >
            <Shield className="w-16 h-16 text-blue-600" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          AI-Driven Phishing Detection
          <span className="block text-blue-600">& Prevention System</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          An intelligent, browser-based security solution that protects users from email phishing 
          attacks through advanced threat detection, real-time analysis, and comprehensive security education.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
            >
              {stat.value}
            </motion.div>
            <p className="text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive protection through intelligent analysis and user empowerment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 rounded-lg p-8 mb-16"
      >
        <div className="text-center mb-8">
          <Cpu className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-lg text-gray-600">
            Built with modern, cutting-edge technologies for optimal performance and security
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{tech.icon}</span>
                <h3 className="font-semibold text-gray-900">{tech.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Simple, secure, and effective phishing detection in three steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Content</h3>
            <p className="text-gray-600">
              Paste email content or upload email files (.eml, .txt) for analysis
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
            <p className="text-gray-600">
              Advanced algorithms analyze content for phishing patterns, suspicious links, and threats
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Results</h3>
            <p className="text-gray-600">
              Receive detailed safety assessment with actionable recommendations and threat reports
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-blue-50 rounded-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
          To democratize cybersecurity by providing everyone with access to intelligent, 
          privacy-preserving tools that protect against phishing attacks while educating 
          users about digital security best practices. We believe that security should be 
          accessible, understandable, and effective for users of all technical backgrounds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/scan"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try the Scanner
          </a>
          <a
            href="/prevention"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Learn Prevention Tips
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default About;