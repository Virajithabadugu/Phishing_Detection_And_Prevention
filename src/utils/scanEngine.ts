import { ScanResult, DetectedThreat, ScanRequest } from '../types';
import { PHISHING_KEYWORDS, SUSPICIOUS_DOMAINS, DANGEROUS_EXTENSIONS, TRUSTED_DOMAINS } from '../data/threatPatterns';

export class ScanEngine {
  static scan(request: ScanRequest): ScanResult {
    const threats: DetectedThreat[] = [];
    const { content, fileName } = request;
    
    // Check for phishing keywords
    threats.push(...this.detectKeywords(content));
    
    // Check for suspicious URLs
    threats.push(...this.detectSuspiciousUrls(content));
    
    // Check for dangerous attachments
    if (fileName) {
      threats.push(...this.detectDangerousAttachments(fileName));
    }
    
    // Check email headers (simulate)
    threats.push(...this.detectSuspiciousHeaders(content));
    
    // Calculate confidence score and safety rating
    const confidenceScore = this.calculateConfidenceScore(threats);
    const safetyRating = this.determineSafetyRating(confidenceScore, threats);
    const threatType = this.determineThreatType(threats);
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      content,
      fileName,
      safetyRating,
      threatType,
      confidenceScore,
      threats
    };
  }
  
  private static detectKeywords(content: string): DetectedThreat[] {
    const threats: DetectedThreat[] = [];
    const lowerContent = content.toLowerCase();
    
    PHISHING_KEYWORDS.forEach(keyword => {
      if (lowerContent.includes(keyword.toLowerCase())) {
        threats.push({
          type: 'keyword',
          description: `Phishing keyword detected: "${keyword}"`,
          severity: 'high',
          evidence: keyword
        });
      }
    });
    
    return threats;
  }
  
  private static detectSuspiciousUrls(content: string): DetectedThreat[] {
    const threats: DetectedThreat[] = [];
    
    // Regex to find URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = content.match(urlRegex) || [];
    
    urls.forEach(url => {
      try {
        const urlObj = new URL(url);
        
        // Check for HTTP instead of HTTPS
        if (urlObj.protocol === 'http:') {
          threats.push({
            type: 'url',
            description: 'Insecure HTTP link detected',
            severity: 'medium',
            evidence: url
          });
        }
        
        // Check for suspicious domains
        const domain = urlObj.hostname;
        if (SUSPICIOUS_DOMAINS.some(suspicious => domain.includes(suspicious))) {
          threats.push({
            type: 'url',
            description: 'Suspicious URL shortener detected',
            severity: 'high',
            evidence: url
          });
        }
        
        // Check for domain spoofing (basic check)
        if (this.isPotentialSpoofing(domain)) {
          threats.push({
            type: 'url',
            description: 'Potential domain spoofing detected',
            severity: 'high',
            evidence: url
          });
        }
        
      } catch (e) {
        threats.push({
          type: 'url',
          description: 'Malformed URL detected',
          severity: 'medium',
          evidence: url
        });
      }
    });
    
    return threats;
  }
  
  private static isPotentialSpoofing(domain: string): boolean {
    // Check for domains that might be spoofing trusted services
    const spoofingPatterns = [
      /g[o0]ogle/,
      /micr[o0]soft/,
      /app[l1]e/,
      /amaz[o0]n/,
      /payp[a4]l/,
      /[e3]bay/,
      /fac[e3]book/,
      /twitt[e3]r/,
      /link[e3]din/
    ];
    
    return spoofingPatterns.some(pattern => pattern.test(domain.toLowerCase()));
  }
  
  private static detectDangerousAttachments(fileName: string): DetectedThreat[] {
    const threats: DetectedThreat[] = [];
    const extension = '.' + fileName.split('.').pop()?.toLowerCase();
    
    if (DANGEROUS_EXTENSIONS.includes(extension)) {
      threats.push({
        type: 'attachment',
        description: `Dangerous file extension detected: ${extension}`,
        severity: 'high',
        evidence: fileName
      });
    }
    
    return threats;
  }
  
  private static detectSuspiciousHeaders(content: string): DetectedThreat[] {
    const threats: DetectedThreat[] = [];
    
    // Simulate email header analysis
    if (content.includes('X-Originating-IP') && !content.includes('Return-Path')) {
      threats.push({
        type: 'header',
        description: 'Suspicious email headers detected',
        severity: 'medium',
        evidence: 'Missing expected email headers'
      });
    }
    
    return threats;
  }
  
  private static calculateConfidenceScore(threats: DetectedThreat[]): number {
    if (threats.length === 0) return 95; // High confidence it's safe
    
    let riskScore = 0;
    threats.forEach(threat => {
      switch (threat.severity) {
        case 'low':
          riskScore += 10;
          break;
        case 'medium':
          riskScore += 25;
          break;
        case 'high':
          riskScore += 40;
          break;
      }
    });
    
    // Convert risk score to confidence score (inverse relationship)
    return Math.max(5, Math.min(95, 95 - riskScore));
  }
  
  private static determineSafetyRating(confidenceScore: number, threats: DetectedThreat[]): 'Safe' | 'Suspicious' | 'Dangerous' {
    const highSeverityThreats = threats.filter(t => t.severity === 'high').length;
    
    if (highSeverityThreats >= 2 || confidenceScore < 30) {
      return 'Dangerous';
    } else if (highSeverityThreats >= 1 || confidenceScore < 70) {
      return 'Suspicious';
    } else {
      return 'Safe';
    }
  }
  
  private static determineThreatType(threats: DetectedThreat[]): 'None' | 'Phishing' | 'Malware' | 'Spam' {
    if (threats.length === 0) return 'None';
    
    const keywordThreats = threats.filter(t => t.type === 'keyword').length;
    const attachmentThreats = threats.filter(t => t.type === 'attachment').length;
    
    if (attachmentThreats > 0) return 'Malware';
    if (keywordThreats >= 2) return 'Phishing';
    if (threats.length >= 3) return 'Spam';
    
    return 'Phishing';
  }
  
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}