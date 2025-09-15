import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Download, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { StorageManager } from '../utils/storage';
import { ReportGenerator } from '../utils/reportGenerator';
import { ScanResult } from '../types';
import SafetyBadge from '../components/SafetyBadge';

const History: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  
  useEffect(() => {
    setScanHistory(StorageManager.getHistory());
  }, []);
  
  const handleDeleteScan = (id: string) => {
    if (confirm('Are you sure you want to delete this scan?')) {
      StorageManager.deleteResult(id);
      setScanHistory(StorageManager.getHistory());
      if (selectedScan?.id === id) {
        setSelectedScan(null);
      }
    }
  };
  
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all scan history?')) {
      StorageManager.clearHistory();
      setScanHistory([]);
      setSelectedScan(null);
    }
  };
  
  const handleDownloadReport = (scan: ScanResult) => {
    ReportGenerator.generatePDF(scan);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (scanHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Scan History</h2>
          <p className="text-gray-600 mb-8">
            You haven't performed any scans yet. Start scanning emails to see your history here.
          </p>
          <a
            href="/scan"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start First Scan
          </a>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scan History</h1>
          <p className="text-gray-600 mt-2">{scanHistory.length} scans performed</p>
        </div>
        
        <button
          onClick={handleClearHistory}
          className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* History List */}
        <div className="lg:col-span-2 space-y-4">
          {scanHistory.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-shadow ${
                selectedScan?.id === scan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedScan(scan)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <SafetyBadge rating={scan.safetyRating} size="sm" />
                    <span className="text-sm text-gray-500">
                      {formatDate(scan.timestamp)}
                    </span>
                  </div>
                  
                  {scan.fileName && (
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      File: {scan.fileName}
                    </p>
                  )}
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {scan.content.substring(0, 100)}...
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm font-medium text-gray-700">
                    {scan.confidenceScore}%
                  </span>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadReport(scan);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Download Report"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteScan(scan.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Scan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Threat Type: <span className="font-medium">{scan.threatType}</span>
                  </span>
                  
                  <span className="text-gray-600">
                    Threats: <span className="font-medium">{scan.threats.length}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Scan Details */}
        <div className="lg:col-span-1">
          {selectedScan ? (
            <motion.div
              key={selectedScan.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Scan Details</h3>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <SafetyBadge rating={selectedScan.safetyRating} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Confidence</span>
                    <p className="font-semibold">{selectedScan.confidenceScore}%</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Threat Type</span>
                    <p className="font-semibold">{selectedScan.threatType}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Date</span>
                    <p className="font-semibold">{formatDate(selectedScan.timestamp)}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Threats Found</span>
                    <p className="font-semibold">{selectedScan.threats.length}</p>
                  </div>
                </div>
                
                {selectedScan.fileName && (
                  <div>
                    <span className="text-gray-600 text-sm">File Name</span>
                    <p className="font-semibold">{selectedScan.fileName}</p>
                  </div>
                )}
                
                {selectedScan.threats.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Detected Threats</span>
                    </h4>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedScan.threats.map((threat, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-sm ${
                            threat.severity === 'high' 
                              ? 'bg-red-50 border border-red-200' 
                              : threat.severity === 'medium'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-blue-50 border border-blue-200'
                          }`}
                        >
                          <p className="font-medium">{threat.description}</p>
                          <p className="text-xs text-gray-600 mt-1">{threat.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <button
                    onClick={() => handleDownloadReport(selectedScan)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Select a scan from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;