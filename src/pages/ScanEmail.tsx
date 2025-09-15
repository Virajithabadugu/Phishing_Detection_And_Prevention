import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Scan, AlertCircle } from 'lucide-react';
import { ScanEngine } from '../utils/scanEngine';
import { StorageManager } from '../utils/storage';
import { ReportGenerator } from '../utils/reportGenerator';
import { ScanResult } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ScanEmail: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/plain' || file.name.endsWith('.eml') || file.name.endsWith('.txt')) {
        setSelectedFile(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setEmailContent(content);
        };
        reader.readAsText(file);
      } else {
        alert('Please select a text file (.txt) or email file (.eml)');
      }
    }
  }, []);
  
  const handleScan = async () => {
    if (!emailContent.trim()) {
      alert('Please enter email content or upload a file to scan');
      return;
    }
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = ScanEngine.scan({
        content: emailContent,
        fileName: selectedFile?.name
      });
      
      setScanResult(result);
      StorageManager.saveResult(result);
    } catch (error) {
      console.error('Error during scan:', error);
      alert('An error occurred during the scan. Please try again.');
    }
    
    setIsScanning(false);
  };
  
  const resetScan = () => {
    setEmailContent('');
    setSelectedFile(null);
    setScanResult(null);
    setActiveTab('text');
  };
  
  if (scanResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Scan Complete</h1>
            <button
              onClick={resetScan}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Scan Another Email
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Safety Rating */}
            <div className="text-center">
              <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
                scanResult.safetyRating === 'Safe' 
                  ? 'bg-green-100 text-green-800' 
                  : scanResult.safetyRating === 'Suspicious'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {scanResult.safetyRating}
              </div>
            </div>
            
            {/* Confidence Score */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                <span className="text-2xl font-bold text-gray-900">{scanResult.confidenceScore}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    scanResult.confidenceScore >= 80 ? 'bg-green-500' :
                    scanResult.confidenceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${scanResult.confidenceScore}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            
            {/* Threat Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Threat Type</h3>
                <p className="text-gray-700">{scanResult.threatType}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Threats Found</h3>
                <p className="text-gray-700">{scanResult.threats.length} issues detected</p>
              </div>
            </div>
            
            {/* Detected Threats */}
            {scanResult.threats.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detected Threats</h3>
                <div className="space-y-3">
                  {scanResult.threats.map((threat, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        threat.severity === 'high' 
                          ? 'bg-red-50 border-red-200' 
                          : threat.severity === 'medium'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertCircle className={`w-5 h-5 mt-0.5 ${
                          threat.severity === 'high' 
                            ? 'text-red-600' 
                            : threat.severity === 'medium'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{threat.description}</p>
                          <p className="text-sm text-gray-600 mt-1">Evidence: {threat.evidence}</p>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${
                            threat.severity === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : threat.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {threat.severity.toUpperCase()} SEVERITY
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => ReportGenerator.generatePDF(scanResult)}
              >
                Generate Report
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Prevention Tips
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Security Scanner</h1>
            <p className="text-lg text-gray-600">
              Analyze email content and attachments for potential phishing and malware threats
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'text'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paste Email Content</span>
            </button>
            
            <button
              onClick={() => setActiveTab('file')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'file'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Email File</span>
            </button>
          </div>
          
          {/* Content Area */}
          {activeTab === 'text' ? (
            <div className="space-y-4">
              <label htmlFor="email-content" className="block text-sm font-medium text-gray-700">
                Email Content
              </label>
              <textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste your email content here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Email File
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">
                  Drop your email file here or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports .txt and .eml files
                </p>
                
                <input
                  type="file"
                  accept=".txt,.eml"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Select File
                </label>
              </div>
              
              {selectedFile && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">{selectedFile.name}</p>
                      <p className="text-sm text-blue-700">
                        {Math.round(selectedFile.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {emailContent && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Preview
                  </label>
                  <div className="bg-gray-50 border rounded-lg p-4 max-h-48 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {emailContent.substring(0, 500)}
                      {emailContent.length > 500 && '...'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Scan Button */}
          <div className="mt-8 text-center">
            {isScanning ? (
              <div className="py-4">
                <LoadingSpinner text="Analyzing email content..." />
              </div>
            ) : (
              <button
                onClick={handleScan}
                disabled={!emailContent.trim()}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 mx-auto"
              >
                <Scan className="w-5 h-5" />
                <span>Scan for Threats</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScanEmail;