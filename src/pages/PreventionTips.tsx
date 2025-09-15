import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Eye, Lock, Mail, Link, FileX, Users } from 'lucide-react';

const PreventionTips: React.FC = () => {
  const tips = [
    {
      icon: Eye,
      title: 'Inspect Email Addresses',
      description: 'Always check the sender\'s email address carefully. Look for misspellings or suspicious domains.',
      details: [
        'Hover over the sender name to see the full email address',
        'Be wary of generic addresses like "security@company" without a proper domain',
        'Check for character substitutions like "rn" instead of "m"',
        'Legitimate companies use their official domain names'
      ]
    },
    {
      icon: Link,
      title: 'Verify Links Before Clicking',
      description: 'Never click on suspicious links. Always verify the destination URL before clicking.',
      details: [
        'Hover over links to preview the destination URL',
        'Look for URL shorteners (bit.ly, tinyurl) which can hide malicious sites',
        'Check for HTTPS instead of HTTP for secure connections',
        'Type URLs manually instead of clicking when in doubt'
      ]
    },
    {
      icon: FileX,
      title: 'Be Cautious with Attachments',
      description: 'Don\'t open unexpected attachments, especially executable files.',
      details: [
        'Avoid .exe, .bat, .scr, and other executable file types',
        'Be suspicious of .zip files from unknown senders',
        'Scan all attachments with antivirus software',
        'Contact the sender through a separate channel to verify legitimacy'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Recognize Urgency Tactics',
      description: 'Phishing emails often create false urgency to pressure you into acting quickly.',
      details: [
        'Phrases like "act now" or "immediate action required" are red flags',
        'Claims about account suspension or security breaches',
        'Time-limited offers that seem too good to be true',
        'Threats of legal action or account closure'
      ]
    },
    {
      icon: Lock,
      title: 'Protect Personal Information',
      description: 'Never provide sensitive information via email, even if the request seems legitimate.',
      details: [
        'Banks and legitimate companies never ask for passwords via email',
        'Don\'t provide SSN, credit card numbers, or account details',
        'Use official websites or phone numbers to verify requests',
        'Enable two-factor authentication on important accounts'
      ]
    },
    {
      icon: Mail,
      title: 'Use Email Filters',
      description: 'Set up email filters and use spam protection to reduce phishing attempts.',
      details: [
        'Enable spam filters in your email client',
        'Mark phishing emails as spam to improve filtering',
        'Use email clients with built-in phishing protection',
        'Consider using email security services for additional protection'
      ]
    },
    {
      icon: Users,
      title: 'Educate Your Team',
      description: 'If you\'re in an organization, ensure everyone knows about phishing threats.',
      details: [
        'Conduct regular security awareness training',
        'Share examples of recent phishing attempts',
        'Create a culture where asking about suspicious emails is encouraged',
        'Implement reporting procedures for suspected phishing'
      ]
    },
    {
      icon: Shield,
      title: 'Keep Software Updated',
      description: 'Maintain updated software and use security tools to protect against threats.',
      details: [
        'Keep your operating system and browsers updated',
        'Use reputable antivirus software',
        'Enable automatic updates for security patches',
        'Use a firewall to block malicious connections'
      ]
    }
  ];

  const redFlags = [
    'Urgent action required',
    'Verify your account immediately',
    'Suspicious activity detected',
    'Your account will be suspended',
    'Click here to secure your account',
    'Congratulations, you\'ve won!',
    'Limited time offer',
    'Act now to claim your prize',
    'Update your payment information',
    'Confirm your identity'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Phishing Prevention Guide
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to identify and protect yourself from phishing attacks with these 
          essential security tips and best practices.
        </p>
      </motion.div>

      {/* Prevention Tips */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <tip.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tip.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {tip.description}
                </p>
                
                <ul className="space-y-2">
                  {tip.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Red Flags Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-red-50 rounded-lg p-8 mb-12"
      >
        <div className="text-center mb-8">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">
            Common Phishing Red Flags
          </h2>
          <p className="text-red-700">
            Be extra cautious when you see these phrases in emails
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {redFlags.map((flag, index) => (
            <motion.div
              key={flag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="bg-white border border-red-200 rounded-lg p-3 text-center"
            >
              <span className="text-red-800 font-medium text-sm">"{flag}"</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-green-50 rounded-lg p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Take Action Today
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Enable 2FA</h3>
            <p className="text-green-700 text-sm">
              Add an extra layer of security to your important accounts
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Update Passwords</h3>
            <p className="text-green-700 text-sm">
              Use strong, unique passwords for each of your accounts
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Stay Vigilant</h3>
            <p className="text-green-700 text-sm">
              Always verify suspicious emails before taking any action
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <a
            href="/scan"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-block"
          >
            Test Your Knowledge - Scan an Email
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PreventionTips;