# Smart Ambulance Finder

A React-based web application that helps users quickly find nearby hospitals and ambulance contact details during emergencies.

## Features

### Core Functionality
- **Hospital Finder**: Search and filter nearby hospitals with real-time distance information
- **Ambulance Directory**: View ambulance service availability with last-known status timestamps
- **Interactive Map**: Visual representation of hospital locations using Leaflet
- **Emergency Quick-Call**: One-click calling to hospitals and ambulance services
- **Search & Filter**: Find hospitals by name, address, or medical specialties

### Key Features
- **Decision Support Tool**: Shows last-known availability status with timestamps
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Search**: Instant filtering of hospitals and ambulance services
- **Status Indicators**: Visual indicators for ambulance availability (Available/Busy/Unavailable)
- **Emergency Bed Status**: Shows which hospitals have emergency beds available
- **Service Area Coverage**: Displays coverage areas for ambulance services

## Technology Stack

- **React 18**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Interactive maps
- **Font Awesome**: Icons
- **OpenStreetMap**: Map tiles

## Project Structure

```
smart-ambulance-finder/
├── index.html          # Main HTML file
├── app.js             # React application code
├── README.md          # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading CDN resources)

### Installation & Running

1. **Clone or download the project files**
2. **Open `index.html` in your web browser**
   - Simply double-click the `index.html` file
   - Or right-click and select "Open with" your preferred browser

### Alternative: Local Server (Recommended)

For better development experience, you can serve the files locally:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

### Finding Hospitals
1. Use the search bar to find hospitals by name, address, or specialty
2. View results on the interactive map
3. Check distance, ratings, and emergency bed availability
4. Click "Call Now" to contact the hospital directly

### Ambulance Services
1. Switch to the "Ambulance Services" tab
2. View real-time availability status
3. Check response times and service areas
4. Call available services directly

### Emergency Features
- **Emergency Button**: Quick access to 911 from the header
- **One-Click Calling**: Direct phone integration with hospitals and ambulance services
- **Status Updates**: See when ambulance availability was last updated

## Data Structure

### Hospital Data
```javascript
{
  id: number,
  name: string,
  address: string,
  phone: string,
  distance: number,
  specialties: string[],
  coordinates: [latitude, longitude],
  rating: number,
  emergencyBed: boolean
}
```

### Ambulance Service Data
```javascript
{
  id: number,
  name: string,
  phone: string,
  status: "available" | "busy" | "unavailable",
  lastUpdate: Date,
  responseTime: string,
  serviceArea: string,
  vehicles: number
}
```

## Customization

### Adding New Hospitals
Edit the `hospitals` array in `app.js` to add new hospital entries.

### Modifying Ambulance Services
Update the `ambulanceServices` array in `app.js` to modify service information.

### Changing Map Center
Update the `userLocation` state in `app.js` to change the default map center.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Important Notes

- This is a **demo application** with dummy data suitable for hackathon presentations
- **Not for real emergency use** - always call local emergency services in real emergencies
- Location services require user permission for accurate distance calculations
- Phone calling functionality works on mobile devices and systems with configured telephony

## Development

### Code Structure
- **Component-based architecture** using React hooks
- **Responsive design** with Tailwind CSS utilities
- **State management** using React useState and useEffect
- **Map integration** with Leaflet JavaScript library

### Styling
- Tailwind CSS for responsive design
- Custom CSS animations for emergency indicators
- Font Awesome icons for visual elements

## Future Enhancements

- Real-time GPS tracking integration
- Hospital bed availability API integration
- User accounts and saved preferences
- Multi-language support
- Offline functionality
- Push notifications for emergency updates

## License

This project is open source and available under the MIT License.
