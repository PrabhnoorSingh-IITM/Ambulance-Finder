# Smart Ambulance Finder

A modern emergency medical services locator that helps users quickly find nearby hospitals with real-time ambulance availability and emergency bed information.

## Project Overview

Smart Ambulance Finder is a location-based emergency service that provides users with instant access to:
- Nearby hospitals with accurate distance calculations
- Real-time ambulance availability status
- Emergency bed availability information
- Direct hospital contact capabilities
- Interactive map visualization
- Fully functional text inputs and map integration

## Tech Stack

### Frontend
- React 18 - Modern React with hooks and functional components
- JavaScript ES6+ - Modern JavaScript with async/await
- HTML5 - Semantic markup with accessibility features
- Tailwind CSS - Utility-first CSS framework for responsive design
- Google Maps API - Interactive maps with custom markers
- Font Awesome - Professional icons and UI elements

### Backend & Services
- Firebase Hosting - Static site hosting with global CDN
- Browser Geolocation API - User location detection
- Google Maps JavaScript API - Mapping and location services

## Project Structure

```
smart-ambulance-finder/
├── public/                    # Static files served to browser
│   ├── app.js                # Main React application
│   └── index.html             # Entry point with CDN dependencies
├── .firebase/                 # Firebase deployment cache
├── .git/                     # Git repository
├── .gitignore                 # Git ignore rules
├── firebase.json             # Firebase configuration
├── package.json              # Project metadata
└── README.md                # This file
```

## Features

### Home Screen
- Emergency-first design: Large, accessible buttons for urgent situations
- Nearest hospital display: Shows closest hospital with distance
- One-tap location access: Instant geolocation detection
- Emergency call button: Direct dial to emergency services (112)
- Admin access: Secure admin panel entry
- Clean interface: No redundant buttons or confusing options

### Hospital Finder
- Interactive Google Maps: Visual hospital locations with custom markers
- Real-time search: Filter hospitals by name, address, or specialties
- Distance-based sorting: Hospitals sorted by proximity to user
- Detailed information: Phone numbers, specialties, ratings, emergency beds
- Status indicators: Visual ambulance availability with color coding
- Mobile responsive: Optimized for all device sizes
- Working text inputs: Search functionality without keyboard issues

### Admin Panel
- Hospital management: Add new hospitals with complete details
- Real-time updates: Modify ambulance counts and emergency bed availability
- Instant reflection: Changes immediately visible to users
- Secure access: Password-protected admin interface
- Data validation: Input validation for all hospital data
- Functional inputs: All form fields work properly on mobile

## UI/UX Design

### Design Principles
- Emergency-first: Large buttons, high contrast, clear typography
- Accessibility: WCAG compliant with proper color contrast
- Mobile-first: Responsive design optimized for smartphones
- Touch-friendly: Minimum 44px touch targets for mobile devices
- Clean interface: Removed unnecessary elements for better UX

### Color Scheme
- Red (#dc2626): Emergency actions and primary branding
- Green (#10b981): Available ambulances and positive status
- Gray (#6b7280): Unavailable status and neutral elements
- White: Clean backgrounds and text contrast

### Status Indicators
- Green: Ambulances available, emergency beds available
- Red: No ambulances available, emergency unavailable
- Gray: Unknown status or loading states

## Technical Implementation

### Hospital Data Structure
```javascript
{
  id: 1,
  name: "AIIMS Delhi",
  location: {
    latitude: 28.6368,
    longitude: 77.2090
  },
  address: "Ansari Nagar, New Delhi",
  phone: "+91-11-26588500",
  ambulanceCount: 5,
  emergencyBeds: 12,
  specialties: ["Emergency", "Cardiology", "Trauma", "Neurology"],
  rating: 4.8,
  lastUpdated: Date
}
```

### Distance Calculation
- Haversine formula: Accurate distance calculation between coordinates
- Real-time updates: Distances recalculated when user location changes
- Kilometer precision: Rounded to 1 decimal place for clarity

### Map Implementation
- Google Maps JavaScript API: Professional mapping solution
- Custom markers: Color-coded markers for ambulance availability
- User location: Visual indicator for current position
- Responsive sizing: Optimized map dimensions for all devices
- Proper initialization: Fixed callback and loading issues

## Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Geolocation API support
- Internet connection for map services

### Quick Start
```bash
# Clone the repository
git clone https://github.com/PrabhnoorSingh-IITM/Ambulance-Finder.git
cd smart-ambulance-finder

# Open in browser (no build required)
# Simply open public/index.html in your browser
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Firebase Deployment
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to hosting
firebase deploy --only hosting
```

## Security & Privacy

### Data Protection
- No user tracking: No personal data collection or storage
- Local processing: All calculations done client-side
- Secure calls: Uses tel: protocol for emergency dialing
- HTTPS only: Secure connection for all communications

### Admin Security
- Password protection: Admin panel secured with password
- Input validation: All inputs validated before processing
- No sensitive data exposure: Only hospital information displayed

## Live Demo

URL: https://smart-ambulance-finder.web.app

### Admin Access
- Password: `admin123`
- Features: Hospital management, real-time updates

## Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Chrome/Safari

### Required Features
- Geolocation API: For user location detection
- JavaScript ES6+: Modern language features
- CSS Grid/Flexbox: Responsive layout support

## Testing

### Manual Testing Checklist
- [x] Location permission on different browsers
- [x] Emergency call functionality
- [x] Search and filter functionality
- [x] Admin panel operations
- [x] Mobile responsiveness
- [x] Map loading and interaction
- [x] Hospital distance calculations
- [x] Text input functionality (keyboard issues fixed)
- [x] Google Maps integration (callback issues fixed)

### Automated Testing
```bash
# Run linting (when configured)
npm run lint

# Run tests (when implemented)
npm test
```

## Emergency Features

### One-Tap Emergency
- Direct dialing: Emergency number (112) without typing
- Location sharing: Quick access to nearby hospitals
- Clear information: Large, readable text and buttons

### Real-time Information
- Live updates: Admin changes reflected immediately
- Status indicators: Visual availability at a glance
- Distance information: Accurate proximity calculations

## Contributing

### Development Guidelines
1. Emergency-first approach: Prioritize emergency use cases
2. Mobile optimization: Ensure excellent mobile experience
3. Accessibility: Follow WCAG guidelines
4. Performance: Optimize for fast loading
5. Clear documentation: Update README for new features

### Code Standards
- React 18 patterns: Use hooks and functional components
- ES6+ JavaScript: Modern syntax and features
- Tailwind CSS: Utility-first styling approach
- Semantic HTML: Proper HTML5 structure

## License

MIT License - See LICENSE file for details

## Support & Contact

For issues, questions, or emergency support:
- Create an issue: Report bugs or request features
- Emergency contact: Use the app's emergency calling feature
- Documentation: Check this README for common questions

## Future Enhancements

### Planned Features
- [ ] Real hospital API integrations
- [ ] Advanced filtering options
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Push notifications for emergencies
- [ ] Hospital reviews and ratings
- [ ] Ambulance tracking integration

### Technical Improvements
- [ ] Progressive Web App (PWA)
- [ ] Service worker implementation
- [ ] Advanced caching strategies
- [ ] Performance optimization
- [ ] Automated testing suite

---

## Project Achievements

### Current Status
- [x] Fully functional: All core features working
- [x] Mobile responsive: Optimized for all devices
- [x] Real-time updates: Admin changes reflect immediately
- [x] Professional UI: Modern, accessible design
- [x] Emergency ready: One-tap emergency features
- [x] Deployed: Live at smart-ambulance-finder.web.app
- [x] Clean structure: Minimal, organized codebase
- [x] Fixed inputs: Text inputs work without keyboard issues
- [x] Working maps: Google Maps integration fully functional

### Technical Highlights
- Zero build required: Direct HTML/JS deployment
- CDN performance: Fast loading via Firebase Hosting
- Modern stack: React 18, Google Maps, Tailwind CSS
- Secure design: No user data collection, HTTPS only
- Scalable architecture: Easy to extend and maintain
- Clean project structure: Only essential files included
- Robust error handling: Proper initialization and fallbacks

### Recent Fixes (V2.0)
- Keyboard Input Issues: Fixed text inputs closing after each character
- Google Maps Loading: Resolved callback and initialization problems
- Mobile Compatibility: All inputs work perfectly on smartphones
- Project Cleanup: Removed unnecessary files and dependencies
- DOM Element Fixes: All interactive elements now functional

---

Built with care for emergency medical services accessibility

This application is designed to save lives by providing quick, reliable access to emergency medical services.
