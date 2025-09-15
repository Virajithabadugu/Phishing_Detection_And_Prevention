import jsPDF from 'jspdf';
import { ScanResult } from '../types';

export class ReportGenerator {
  static generatePDF(result: ScanResult): void {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Phishing Detection Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${result.timestamp.toLocaleString()}`, 20, 35);
    
    // Results Summary
    doc.setFontSize(16);
    doc.text('Scan Results', 20, 55);
    
    doc.setFontSize(12);
    doc.text(`Safety Rating: ${result.safetyRating}`, 20, 70);
    doc.text(`Threat Type: ${result.threatType}`, 20, 85);
    doc.text(`Confidence Score: ${result.confidenceScore}%`, 20, 100);
    
    if (result.fileName) {
      doc.text(`File Name: ${result.fileName}`, 20, 115);
    }
    
    // Threats
    if (result.threats.length > 0) {
      doc.setFontSize(16);
      doc.text('Detected Threats', 20, 135);
      
      doc.setFontSize(10);
      let yPos = 150;
      
      result.threats.forEach((threat, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.text(`${index + 1}. ${threat.description}`, 20, yPos);
        doc.text(`   Severity: ${threat.severity.toUpperCase()}`, 25, yPos + 10);
        doc.text(`   Evidence: ${threat.evidence}`, 25, yPos + 20);
        yPos += 35;
      });
    }
    
    // Recommendations
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Security Recommendations', 20, 20);
    
    doc.setFontSize(10);
    const recommendations = this.getRecommendations(result);
    let yPos = 35;
    
    recommendations.forEach((rec, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(`${index + 1}. ${rec}`, 20, yPos);
      yPos += 15;
    });
    
    doc.save(`phishing-report-${result.id}.pdf`);
  }
  
  private static getRecommendations(result: ScanResult): string[] {
    const recommendations: string[] = [];
    
    if (result.safetyRating === 'Dangerous') {
      recommendations.push('Do not interact with this email or any links/attachments');
      recommendations.push('Delete the email immediately');
      recommendations.push('Report the email to your IT security team');
      recommendations.push('Consider changing passwords if you clicked any links');
    } else if (result.safetyRating === 'Suspicious') {
      recommendations.push('Exercise caution when interacting with this content');
      recommendations.push('Verify sender identity through alternative means');
      recommendations.push('Do not provide personal information');
    } else {
      recommendations.push('Email appears safe, but remain vigilant');
      recommendations.push('Always verify unexpected requests');
    }
    
    recommendations.push('Keep your antivirus software updated');
    recommendations.push('Enable two-factor authentication on important accounts');
    recommendations.push('Regularly update your passwords');
    
    return recommendations;
  }
}