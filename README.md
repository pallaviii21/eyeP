# 👁️ EyeP — IP Validation & Geolocation Intelligence Platform

EyeP is a full-stack IP analysis tool that validates public IP addresses and retrieves structured geolocation, network ownership, and security intelligence data.

Built with strict validation logic, secure API handling, and transparent reporting — no misleading fields, no exposed API keys.

---

## 🚀 Live Capabilities

### 🔍 Advanced IP Validation
- Supports IPv4 and IPv6
- Rejects malformed input
- Blocks private & loopback ranges
- Prevents unnecessary API calls

### 🌍 Geolocation Intelligence
- Country, Region, City
- Latitude & Longitude
- Timezone
- Currency
- Country Flag

### 🌐 Network Metadata
- ASN (Autonomous System Number)
- ASN Organization
- Company / ISP

### 🛡 Security Detection
- VPN detection
- Proxy detection
- Tor detection
- Hosting / Data Center detection
- Automatic IP Category Classification Badge

### 📊 Smart Data Transparency
- Explicit "Unavailable" labels
- Missing field reporting
- Data completeness percentage
- Clear explanation for API limitations

---

## 🧱 Architecture

### Secure Full-Stack Flow

User Input  
↓  
Frontend Validation  
↓  
Backend Proxy (Express Server)  
↓  
AbstractAPI Request  
↓  
Structured Response Rendering  

The API key is securely stored in environment variables and never exposed to the frontend.

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3 (Glass UI, gradients, responsive layout)
- JavaScript (ES6+ modular structure)

### Backend
- Node.js (v20+)
- Express.js
- dotenv (environment variable management)
- CORS middleware

### External API
- AbstractAPI – IP Geolocation API

---

### 📂 Project Structure
```text
EyeP/
├── server.js            # Express server & API routing
├── package.json         # Dependencies and scripts
├── .env                 # Local environment variables (not committed)
└── public/              # Static assets and frontend
    ├── index.html       # Main entry point
    ├── css/             # Stylesheets
    └── js/              # Frontend logic
        ├── app.js       # Main UI controller
        ├── validator.js # Input validation logic
        └── api.js       # Fetch wrappers
    └── assets/          # Images and icons
```
---

## ⚠ Limitations

- Accuracy depends on ISP data sources
- Some fields may be restricted by API plan
- IP geolocation ≠ precise physical tracking

---

## 📌 Future Enhancements

- Interactive map integration
- IP risk scoring system
- Rate limiting & caching
- Mobile-first optimization
- Dark / Light theme toggle
- Deployment analytics
- Serverless architecture version

---

## 📈 Use Cases

- Network debugging
- Cybersecurity education
- VPN / proxy verification
- API integration practice
- Portfolio demonstration
- Academic submission

---

## 👩‍💻 Author

Developed by Pallavi  
Full-stack implementation focused on validation, security, and structured reporting.
