# PhishGuard: AI-Driven Phishing Detection System

PhishGuard is a web application that helps users detect phishing, malware, and spam threats in emails and attachments using advanced AI algorithms. All analysis is performed locally in your browser for privacy and security.

## Features
- **AI-Powered Email Scanning:** Analyze email content and attachments for phishing keywords, suspicious links, and dangerous file types.
- **Real-Time Results:** Instantly receive a safety rating, confidence score, and detailed threat report after each scan.
- **Scan History:** View and manage your previous scans, download PDF reports, or clear your history.
- **Security Education:** Access prevention tips and best practices to stay safe from cyber threats.
- **Privacy-First:** No email data is sent to any server; all processing is done in your browser.

## How to Use
1. **Clone or Download the Repository**
   ```sh
   git clone https://github.com/Virajithabadugu/Phishing_Detection_And_Prevention.git
   cd project
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Start the Application**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or as shown in your terminal).

4. **Scan an Email**
   - Click "Scan" in the navigation bar.
   - Paste email content or upload a `.txt` or `.eml` file.
   - Click "Scan for Threats" to analyze.
   - View the results, download a PDF report, or scan another email.

5. **View Scan History**
   - Click "History" to see all previous scans.
   - Download reports or delete scans as needed.

6. **Learn Prevention Tips**
   - Click "Prevention" for security tips and red flag examples.

## Technology Stack
- React, TypeScript, Tailwind CSS
- Framer Motion (animations)
- jsPDF (PDF report generation)
- Local Storage (scan history)

## License
This project is for educational and demonstration purposes.

---

For any issues or questions, please open an issue in the repository.
