# Smart Ambulance Finder

A full-stack web application that helps users quickly find nearby hospitals and ambulance contact details during emergencies.

## 🚨 Project Overview

This project is a **decision-support system**, not real-time ambulance tracking. It provides last-known ambulance availability status with timestamps for emergency medical services.

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern React 18 with hooks
- **JavaScript** - ES6+ with async/await
- **HTML5** - Semantic markup with accessibility
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Firebase Cloud Functions** - Serverless Node.js backend
- **Firebase SDK** - Direct frontend integration
- **Firebase Firestore** - NoSQL database

### APIs
- **Browser Geolocation API** - User location detection
- **Firebase Functions** - Backend API calls

## 📁 Project Structure

```
smart-ambulance-finder/
├── public/                    # Static files served to browser
│   ├── pages/
│   │   ├── home.html      # Emergency landing page
│   │   ├── hospitals.html # Hospital list page
│   │   └── admin.html     # Admin panel page
│   ├── index.html          # Main entry point
│   ├── style.css           # Global styles
│   └── assets/            # Static images, icons
├── src/                       # Frontend source code
│   ├── pages/
│   │   ├── Home.jsx       # Home page component
│   │   ├── Hospitals.jsx  # Hospital list component
│   │   └── Admin.jsx      # Admin panel component
│   ├── components/         # Reusable UI components
│   ├── services/          # Firebase integration
│   ├── utils/             # Helper functions
│   └── styles/            # Component-specific CSS
├── functions/                 # Backend Cloud Functions
│   ├── index.js            # Main functions file
│   ├── package.json         # Node.js dependencies
│   └── service-account-key.json  # Firebase credentials
├── package.json               # Frontend dependencies
├── firebase.json             # Firebase configuration
└── README.md                # This file
```

## 🚀 Features

### 🏠 Home/Emergency Screen
- **Large emergency button**: "Find Nearby Hospitals"
- **Location permission**: Browser geolocation API
- **Emergency call**: Direct dial to emergency number (112)
- **High contrast design**: Emergency-first UI with large buttons

### 📋 Hospital List Screen
- **Distance-based sorting**: Hospitals sorted by proximity
- **Status indicators**: Available/Busy/Unknown with colors
- **Timestamp display**: "Last updated" relative time
- **One-tap actions**: Call Ambulance, Call Hospital
- **Responsive design**: Mobile-first approach

### ⚙️ Admin Panel
- **Availability updates**: Change ambulance status in real-time
- **Automatic timestamps**: Updated when status changes
- **Immediate reflection**: Changes show in hospital list
- **Simple interface**: Easy status management

## 🔧 Technical Implementation

### Database Structure (Firestore)
```javascript
{
  name: "Hospital Name",
  latitude: 28.6368,
  longitude: 77.2090,
  ambulanceAvailability: "available|busy|unknown",
  hospitalPhone: "+91-9999426676",
  ambulancePhone: "+91-9999426675",
  lastUpdated: Firestore Timestamp
}
```

### Cloud Functions
- **getNearbyHospitals**: Fetch with distance calculation
- **updateHospitalAvailability**: Update status with validation
- **seedHospitals**: Initialize demo data

### Frontend Components
- **React 18**: Modern hooks and createRoot API
- **Tailwind CSS**: Utility classes for styling
- **Responsive design**: Mobile-first breakpoints
- **Error handling**: Graceful fallbacks

## 🎨 UI/UX Design

### Design Principles
- **Emergency-first**: Large buttons, high contrast
- **Color coding**: Green (Available), Red (Busy), Gray (Unknown)
- **Clear typography**: Readable fonts and sizes
- **Touch-friendly**: Minimum 44px touch targets

### Status Colors
```css
.available    → Green (#10b981)
.busy        → Red (#ef4444)
.unknown      → Gray (#6b7280)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Firebase project created
- Modern web browser with geolocation support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd smart-ambulance-finder

# Install frontend dependencies
npm install

# Install backend dependencies
cd functions
npm install

# Add Firebase credentials
# Add service-account-key.json to functions/ folder
# Update firebaseConfig in src/pages/*.jsx files
```

### Development
```bash
# Start local development server
npm start

# Deploy to Firebase
npm run deploy
```

### Firebase Setup
1. Create Firebase project at https://console.firebase.google.com
2. Download service account key JSON file
3. Place in `functions/` folder
4. Update Firebase config in React components
5. Deploy Cloud Functions: `firebase deploy --only functions`

## 🔒 Security & Privacy

### Data Protection
- **No personal data**: Only hospital information stored
- **No tracking**: No GPS or user behavior tracking
- **Secure calls**: tel: links for emergency dialing
- **Input validation**: Server-side validation for all inputs

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    allow read, write: true;
  }
}
```

## 🌐 Deployment

### Firebase Hosting
```bash
# Deploy frontend and functions
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting
```

### Environment Variables
- **Firebase Config**: Replace placeholder values in React components
- **Service Account**: Add JSON file to functions/ folder
- **API Keys**: Keep secure, never commit to version control

## 🧪 Testing

### Manual Testing
1. Test location permission on different browsers
2. Verify emergency call functionality
3. Test admin panel status updates
4. Validate responsive design on mobile devices
5. Test with and without Firebase backend

### Automated Testing
```bash
# Run local tests (when implemented)
npm test

# Lint code
npm run lint
```

## 📱 Browser Support

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers with geolocation support

### Required Features
- **Geolocation API**: For user location
- **ES6+ JavaScript**: Modern JS features
- **CSS Grid/Flexbox**: For responsive layouts

## 🚨 Limitations

### Non-Goals (Explicitly NOT Built)
- ❌ No real hospital API integrations
- ❌ No ambulance GPS tracking
- ❌ No medical decision-making logic
- ❌ No authentication or user accounts
- ❌ No real-time data synchronization

### Data Freshness
- **Status becomes "Unknown"** if older than 1 hour
- **Last-known status only** - not real-time tracking
- **Clear timestamps** - always show data age

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with proper testing
3. Update documentation as needed
4. Submit pull request with clear description
5. Ensure all tests pass before merge

### Code Standards
- **ES6+ JavaScript**: Modern syntax and features
- **React 18 patterns**: Hooks and functional components
- **Tailwind CSS**: Utility classes for styling
- **Firebase best practices**: Secure and efficient queries

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues, questions, or contributions:
- Create an issue in the project repository
- Check existing documentation before asking
- Provide clear steps to reproduce any bugs

---

## 🎯 Hackathon Notes

### Scope Reminder
- **Keep it simple**: Focus on core functionality
- **Be honest**: Don't claim real-time tracking
- **Demo-ready**: Ensure impressive presentation
- **Avoid overengineering**: Prioritize clarity and speed

### Success Metrics
- **Working demo**: All screens functional
- **Clear UI**: Easy to understand and use
- **Fast loading**: Optimized for demo environment
- **Mobile responsive**: Works on all devices

---
<!--
**Built with ❤️ for emergency medical services accessibility**
-->
