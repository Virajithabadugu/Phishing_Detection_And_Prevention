export interface ScanResult {
  id: string;
  timestamp: Date;
  content: string;
  fileName?: string;
  safetyRating: 'Safe' | 'Suspicious' | 'Dangerous';
  threatType: 'None' | 'Phishing' | 'Malware' | 'Spam';
  confidenceScore: number;
  threats: DetectedThreat[];
}

export interface DetectedThreat {
  type: 'keyword' | 'url' | 'attachment' | 'header';
  description: string;
  severity: 'low' | 'medium' | 'high';
  evidence: string;
}

export interface ScanRequest {
  content: string;
  fileName?: string;
  fileType?: string;
}