import { ScanResult } from '../types';

export class StorageManager {
  private static readonly STORAGE_KEY = 'phishing_scan_history';
  
  static saveResult(result: ScanResult): void {
    const history = this.getHistory();
    history.unshift(result);
    
    // Keep only last 50 scans
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }
  
  static getHistory(): ScanResult[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      }));
    } catch (error) {
      console.error('Error loading scan history:', error);
      return [];
    }
  }
  
  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
  
  static deleteResult(id: string): void {
    const history = this.getHistory();
    const filtered = history.filter(result => result.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}