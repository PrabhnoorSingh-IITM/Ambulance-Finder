const { useState, useEffect } = React;

// Initialize Google Maps callback
window.initMap = function() {
    console.log('Google Maps API loaded');
};

// Backend Database Simulation - Delhi Area Hospitals with real data
const hospitalDatabase = [
    {
        id: 1,
        name: "AIIMS Delhi",
        location: { latitude: 28.6368, longitude: 77.2090 },
        address: "Ansari Nagar, New Delhi",
        phone: "+91-11-26588500",
        ambulanceCount: 5,
        emergencyBeds: 12,
        specialties: ["Emergency", "Cardiology", "Trauma", "Neurology"],
        rating: 4.8,
        lastUpdated: new Date()
    },
    {
        id: 2,
        name: "Safdarjung Hospital",
        location: { latitude: 28.6100, longitude: 77.2089 },
        address: "Safdarjung Enclave, New Delhi",
        phone: "+91-11-26702700",
        ambulanceCount: 3,
        emergencyBeds: 8,
        specialties: ["Emergency", "Pediatrics", "Maternity", "Surgery"],
        rating: 4.3,
        lastUpdated: new Date()
    },
    {
        id: 3,
        name: "Max Super Speciality Hospital",
        location: { latitude: 28.6394, longitude: 77.2735 },
        address: "Saket, New Delhi",
        phone: "+91-11-41422444",
        ambulanceCount: 2,
        emergencyBeds: 6,
        specialties: ["Emergency", "Oncology", "Orthopedics"],
        rating: 4.5,
        lastUpdated: new Date()
    },
    {
        id: 4,
        name: "Apollo Hospital",
        location: { latitude: 28.5530, longitude: 77.2090 },
        address: "Mathura Road, Sarita Vihar, New Delhi",
        phone: "+91-11-26925801",
        ambulanceCount: 4,
        emergencyBeds: 15,
        specialties: ["Emergency", "Cardiology", "ICU", "Multi-Specialty"],
        rating: 4.6,
        lastUpdated: new Date()
    },
    {
        id: 5,
        name: "Fortis Escorts Heart Institute",
        location: { latitude: 28.6331, longitude: 77.2188 },
        address: "Okhla Road, New Delhi",
        phone: "+91-11-41422422",
        ambulanceCount: 4,
        emergencyBeds: 18,
        specialties: ["Emergency", "Cardiology", "Heart Surgery", "Trauma"],
        rating: 4.7,
        lastUpdated: new Date()
    },
    {
        id: 6,
        name: "Sir Ganga Ram Hospital",
        location: { latitude: 28.5672, longitude: 77.2432 },
        address: "Rajender Nagar, New Delhi",
        phone: "+91-11-27003400",
        ambulanceCount: 6,
        emergencyBeds: 20,
        specialties: ["Emergency", "Cardiology", "Neurology", "Orthopedics"],
        rating: 4.4,
        lastUpdated: new Date()
    },
    {
        id: 7,
        name: "Indraprastha Apollo Hospital",
        location: { latitude: 28.6270, longitude: 77.2090 },
        address: "Sarita Vihar, New Delhi",
        phone: "+91-11-26895000",
        ambulanceCount: 3,
        emergencyBeds: 10,
        specialties: ["Emergency", "Cardiology", "Gastroenterology", "Pulmonology"],
        rating: 4.2,
        lastUpdated: new Date()
    },
    {
        id: 8,
        name: "BLK Super Speciality Hospital",
        location: { latitude: 28.7061, longitude: 77.1027 },
        address: "Pusa, New Delhi",
        phone: "+91-11-22566555",
        ambulanceCount: 7,
        emergencyBeds: 25,
        specialties: ["Emergency", "Cardiology", "Neurosurgery", "Urology"],
        rating: 4.6,
        lastUpdated: new Date()
    },
    {
        id: 9,
        name: "Medanta - The Medicity",
        location: { latitude: 28.4479, longitude: 77.0764 },
        address: "Sector 38, Gurgaon",
        phone: "+91-124-4834222",
        ambulanceCount: 8,
        emergencyBeds: 30,
        specialties: ["Emergency", "Cardiology", "Neurology", "Transplant"],
        rating: 4.7,
        lastUpdated: new Date()
    },
    {
        id: 10,
        name: "Artemis Hospital",
        location: { latitude: 28.5406, longitude: 77.1548 },
        address: "Sector 51, Gurgaon",
        phone: "+91-124-45111111",
        ambulanceCount: 5,
        emergencyBeds: 22,
        specialties: ["Emergency", "Cardiology", "Oncology", "Orthopedics"],
        rating: 4.5,
        lastUpdated: new Date()
    },
    {
        id: 11,
        name: "Fortis Memorial Research Institute",
        location: { latitude: 28.5489, longitude: 77.2197 },
        address: "Sector 44, Gurgaon",
        phone: "+91-124-4199999",
        ambulanceCount: 6,
        emergencyBeds: 28,
        specialties: ["Emergency", "Cardiology", "Neurology", "Critical Care"],
        rating: 4.8,
        lastUpdated: new Date()
    },
    {
        id: 12,
        name: "Max Smart Super Speciality Hospital",
        location: { latitude: 28.4975, longitude: 77.0918 },
        address: "Saket, New Delhi",
        phone: "+91-11-40559555",
        ambulanceCount: 4,
        emergencyBeds: 16,
        specialties: ["Emergency", "Cardiology", "Gastroenterology", "Pulmonology"],
        rating: 4.3,
        lastUpdated: new Date()
    },
    {
        id: 13,
        name: "Rockland Hospital",
        location: { latitude: 28.6951, longitude: 77.1227 },
        address: "Qutab Institutional Area, New Delhi",
        phone: "+91-11-26177000",
        ambulanceCount: 3,
        emergencyBeds: 12,
        specialties: ["Emergency", "Cardiology", "Neurosurgery", "Trauma"],
        rating: 4.1,
        lastUpdated: new Date()
    },
    {
        id: 14,
        name: "Batra Hospital & Medical Research Centre",
        location: { latitude: 28.5632, longitude: 77.2754 },
        address: "Tughlakabad, New Delhi",
        phone: "+91-11-22099000",
        ambulanceCount: 2,
        emergencyBeds: 8,
        specialties: ["Emergency", "Cardiology", "Urology", "Laparoscopic Surgery"],
        rating: 4.0,
        lastUpdated: new Date()
    },
    {
        id: 15,
        name: "Primus Super Speciality Hospital",
        location: { latitude: 28.7021, longitude: 77.1234 },
        address: "Chanakyapuri, New Delhi",
        phone: "+91-11-42404040",
        ambulanceCount: 4,
        emergencyBeds: 14,
        specialties: ["Emergency", "Cardiology", "Neurology", "Orthopedics"],
        rating: 4.2,
        lastUpdated: new Date()
    },
    {
        id: 16,
        name: "Columbia Asia Hospital",
        location: { latitude: 28.5489, longitude: 77.0895 },
        address: "Sector 44, Gurgaon",
        phone: "+91-124-41414100",
        ambulanceCount: 5,
        emergencyBeds: 18,
        specialties: ["Emergency", "Cardiology", "Neurology", "Transplant"],
        rating: 4.4,
        lastUpdated: new Date()
    },
    {
        id: 17,
        name: "Paras Hospital",
        location: { latitude: 28.6395, longitude: 77.3535 },
        address: "Gurgaon",
        phone: "+91-124-4002400",
        ambulanceCount: 3,
        emergencyBeds: 11,
        specialties: ["Emergency", "Cardiology", "Gastroenterology", "Critical Care"],
        rating: 4.3,
        lastUpdated: new Date()
    },
    {
        id: 18,
        name: "Park Hospital",
        location: { latitude: 28.6951, longitude: 77.1227 },
        address: "Greater Kailash, New Delhi",
        phone: "+91-11-26486000",
        ambulanceCount: 4,
        emergencyBeds: 15,
        specialties: ["Emergency", "Cardiology", "Neurology", "Orthopedics"],
        rating: 4.2,
        lastUpdated: new Date()
    },
    {
        id: 19,
        name: "Manipal Hospital",
        location: { latitude: 28.5996, longitude: 77.0290 },
        address: "Dwarka, New Delhi",
        phone: "+91-11-47677000",
        ambulanceCount: 6,
        emergencyBeds: 24,
        specialties: ["Emergency", "Cardiology", "Neurology", "Oncology"],
        rating: 4.6,
        lastUpdated: new Date()
    },
    {
        id: 20,
        name: "Jaypee Hospital",
        location: { latitude: 28.6308, longitude: 77.3717 },
        address: "Sector 128, Noida",
        phone: "+91-120-4771234",
        ambulanceCount: 7,
        emergencyBeds: 32,
        specialties: ["Emergency", "Cardiology", "Neurology", "Trauma"],
        rating: 4.5,
        lastUpdated: new Date()
    }
];

// Calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
};

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [userLocation, setUserLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [map, setMap] = useState(null);
    const [nearestHospital, setNearestHospital] = useState(null);
    const [newHospital, setNewHospital] = useState({
        name: '',
        address: '',
        phone: '',
        ambulanceCount: 0,
        emergencyBeds: 0,
        specialties: '',
        latitude: '',
        longitude: ''
    });
    const [showAddHospital, setShowAddHospital] = useState(false);

    // Initialize hospitals with distances on mount
    useEffect(() => {
        const hospitalsWithDistance = hospitalDatabase.map(hospital => ({
            ...hospital,
            distance: userLocation ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                hospital.location.latitude,
                hospital.location.longitude
            ) : null
        })).sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
        });

        setHospitals(hospitalsWithDistance);
        if (hospitalsWithDistance.length > 0 && hospitalsWithDistance[0].distance !== null) {
            setNearestHospital(hospitalsWithDistance[0]);
        }
    }, [userLocation]);

    // Initialize Google Maps when view changes to hospitals
    useEffect(() => {
        if (currentView === 'hospitals' && !map) {
            // Wait for DOM to be ready and Google Maps to load
            const initializeWhenReady = () => {
                const mapElement = document.getElementById('map');
                if (window.google && window.google.maps && mapElement) {
                    initializeMap();
                } else {
                    setTimeout(initializeWhenReady, 300);
                }
            };
            // Small delay to ensure DOM is rendered
            setTimeout(initializeWhenReady, 100);
        }
    }, [currentView, userLocation, hospitals]);

    const initializeMap = () => {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.log('Map element not found');
            return;
        }
        
        if (!window.google || !window.google.maps) {
            console.log('Google Maps not loaded');
            return;
        }

        console.log('Initializing map...');

        const center = userLocation ? 
            { lat: userLocation.latitude, lng: userLocation.longitude } :
            { lat: 28.6139, lng: 77.2090 }; // Delhi center

        const mapInstance = new window.google.maps.Map(mapElement, {
            center: center,
            zoom: userLocation ? 12 : 10,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        // Add user location marker
        if (userLocation) {
            new window.google.maps.Marker({
                position: { lat: userLocation.latitude, lng: userLocation.longitude },
                map: mapInstance,
                title: "Your Location",
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#10b981",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2
                }
            });
        }

        // Add hospital markers
        hospitals.forEach(hospital => {
            const markerColor = hospital.ambulanceCount > 0 ? "#10b981" : "#ef4444";
            new window.google.maps.Marker({
                position: { lat: hospital.location.latitude, lng: hospital.location.longitude },
                map: mapInstance,
                title: hospital.name,
                icon: {
                    path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 6,
                    fillColor: markerColor,
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 1
                }
            });
        });

        setMap(mapInstance);
        console.log('Map initialized successfully with', hospitals.length, 'hospitals');
    };

    const requestLocation = async () => {
        setLoading(true);
        setLocationError(null);

        try {
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    });
                });

                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                setUserLocation(location);
                setCurrentView('hospitals');
            } else {
                setLocationError('Geolocation is not supported by your browser');
            }
        } catch (error) {
            setLocationError('Unable to get your location. Please enable location services.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = () => {
        if (adminPassword === 'admin123') {
            setIsAdminAuthenticated(true);
            setCurrentView('admin');
            setAdminPassword('');
        } else {
            alert('Incorrect password. Please try again.');
            setAdminPassword('');
        }
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setCurrentView('home');
    };

    const handleAddHospital = () => {
        if (newHospital.name && newHospital.address && newHospital.phone && 
            newHospital.latitude && newHospital.longitude) {
            
            const hospital = {
                id: hospitals.length + 1,
                name: newHospital.name,
                location: {
                    latitude: parseFloat(newHospital.latitude),
                    longitude: parseFloat(newHospital.longitude)
                },
                address: newHospital.address,
                phone: newHospital.phone,
                ambulanceCount: parseInt(newHospital.ambulanceCount),
                emergencyBeds: parseInt(newHospital.emergencyBeds),
                specialties: newHospital.specialties.split(',').map(s => s.trim()),
                rating: 4.0,
                lastUpdated: new Date()
            };

            setHospitals([...hospitals, hospital]);
            setNewHospital({
                name: '',
                address: '',
                phone: '',
                ambulanceCount: 0,
                emergencyBeds: 0,
                specialties: '',
                latitude: '',
                longitude: ''
            });
            setShowAddHospital(false);
        }
    };

    const updateHospital = (id, field, value) => {
        setHospitals(hospitals.map(hospital => 
            hospital.id === id 
                ? { ...hospital, [field]: value, lastUpdated: new Date() }
                : hospital
        ));
    };

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const HomeView = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <i className="fas fa-ambulance text-5xl text-red-600"></i>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3">Smart Ambulance Finder</h1>
                    <p className="text-xl text-white opacity-90 mb-8">Find nearby hospitals in emergency situations</p>
                </div>

                {nearestHospital && (
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 mb-8 text-white">
                        <h3 className="text-lg font-semibold mb-2">Nearest Hospital</h3>
                        <p className="text-2xl font-bold">{nearestHospital.name}</p>
                        <p className="text-lg opacity-90">{nearestHospital.distance} km away</p>
                        <p className="text-sm opacity-75">
                            {nearestHospital.ambulanceCount > 0 ? `${nearestHospital.ambulanceCount} ambulances` : 'No ambulances'} | 
                            {nearestHospital.emergencyBeds} emergency beds
                        </p>
                    </div>
                )}

                {locationError && (
                    <div className="bg-red-800 bg-opacity-90 backdrop-blur-lg rounded-2xl p-6 mb-8 text-white">
                        <i className="fas fa-exclamation-triangle mr-3 text-2xl"></i>
                        <span className="text-lg">{locationError}</span>
                    </div>
                )}

                <button
                    onClick={requestLocation}
                    disabled={loading}
                    className="w-full bg-white text-red-600 px-8 py-6 rounded-2xl font-black text-xl hover:bg-red-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl mb-6"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <i className="fas fa-spinner fa-spin mr-3 text-xl"></i>
                            <span>Getting Your Location...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <i className="fas fa-hospital mr-3 text-xl"></i>
                            <span>Find Nearby Hospitals</span>
                        </div>
                    )}
                </button>

                <button
                    onClick={() => window.location.href = 'tel:112'}
                    className="w-full bg-red-800 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-900 transition-all shadow-xl mb-8"
                >
                    <i className="fas fa-phone-alt mr-2"></i>
                    <span>Emergency Call</span>
                </button>

                <button
                    onClick={() => setCurrentView('admin-login')}
                    className="text-white opacity-75 hover:opacity-100 text-lg underline transition-opacity"
                >
                    Admin Panel
                </button>
            </div>
        </div>
    );

    const HospitalsView = () => (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-red-600 text-white p-6 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setCurrentView('home')}
                                className="mr-4 text-white hover:text-red-200 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Nearby Hospitals</h1>
                        </div>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search hospitals, specialties, or locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                // Allow any input without interference
                                e.stopPropagation();
                            }}
                            className="w-full px-4 py-3 rounded-xl text-gray-800 placeholder-gray-500 bg-white bg-opacity-90 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white"
                            autoFocus
                        />
                        <i className="fas fa-search absolute right-4 top-4 text-gray-500"></i>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {/* Map Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        <i className="fas fa-map-marked-alt mr-2 text-red-600"></i>
                        Hospital Locations
                    </h2>
                    <div id="map" className="w-full h-96 rounded-xl" style={{ minHeight: '400px' }}></div>
                </div>

                {/* Hospitals List */}
                <div className="space-y-4">
                    {filteredHospitals.map(hospital => {
                        const statusColor = hospital.ambulanceCount > 0 ? 'text-green-600' : 'text-red-600';
                        const statusIcon = hospital.ambulanceCount > 0 ? 'check-circle' : 'times-circle';
                        const statusText = hospital.ambulanceCount > 0 ? `${hospital.ambulanceCount} Available` : 'Unavailable';

                        return (
                            <div key={hospital.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                                            <span>{hospital.address}</span>
                                        </div>
                                        {hospital.distance && (
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <i className="fas fa-route mr-2 text-blue-500"></i>
                                                <span>{hospital.distance} km away</span>
                                            </div>
                                        )}
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <i className="fas fa-star mr-2 text-yellow-500"></i>
                                            <span>{hospital.rating} ⭐</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <i className="fas fa-bed mr-2 text-purple-500"></i>
                                            <span>{hospital.emergencyBeds} emergency beds</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {hospital.specialties.slice(0, 3).map((specialty, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lg:text-left mt-4 lg:mt-0">
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${statusColor} bg-opacity-10`}>
                                            <i className={`fas fa-${statusIcon} mr-2`}></i>
                                            <span>{statusText}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
                                    <button
                                        onClick={() => window.location.href = `tel:${hospital.phone}`}
                                        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                                            hospital.ambulanceCount > 0
                                                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                        disabled={hospital.ambulanceCount === 0}
                                    >
                                        <i className="fas fa-ambulance mr-2"></i>
                                        Call Ambulance
                                    </button>
                                    <button
                                        onClick={() => window.location.href = `tel:${hospital.phone}`}
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        <i className="fas fa-phone mr-2"></i>
                                        Call Hospital
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const AdminLoginView = () => (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <i className="fas fa-shield-alt text-4xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-black text-gray-800 mb-3">Admin Login</h1>
                    <p className="text-gray-600">Enter password to access admin panel</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-gray-600 focus:outline-none text-lg transition-colors"
                            placeholder="Enter admin password"
                            autoComplete="current-password"
                            autoFocus
                        />
                    </div>

                    <button
                        onClick={handleAdminLogin}
                        className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 rounded-xl font-black text-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-xl transform hover:scale-105"
                    >
                        <i className="fas fa-sign-in-alt mr-3"></i>
                        Login to Admin Panel
                    </button>

                    <button
                        onClick={() => setCurrentView('home')}
                        className="w-full text-gray-600 hover:text-gray-800 text-lg underline transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );

    const AdminView = () => (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 shadow-xl">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={handleAdminLogout}
                                className="mr-6 text-white hover:text-gray-300 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Admin Panel</h1>
                        </div>
                        <button
                            onClick={handleAdminLogout}
                            className="bg-white bg-opacity-20 backdrop-blur-lg px-4 py-2 rounded-xl hover:bg-opacity-30 transition-all text-lg"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black text-gray-800">
                            <i className="fas fa-cog mr-3 text-gray-600"></i>
                            Hospital Management
                        </h2>
                        <button
                            onClick={() => setShowAddHospital(!showAddHospital)}
                            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Hospital
                        </button>
                    </div>
                    
                    {showAddHospital && (
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Hospital</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Hospital Name"
                                    value={newHospital.name}
                                    onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newHospital.address}
                                    onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={newHospital.phone}
                                    onChange={(e) => setNewHospital({...newHospital, phone: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Specialties (comma separated)"
                                    value={newHospital.specialties}
                                    onChange={(e) => setNewHospital({...newHospital, specialties: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Latitude"
                                    value={newHospital.latitude}
                                    onChange={(e) => setNewHospital({...newHospital, latitude: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Longitude"
                                    value={newHospital.longitude}
                                    onChange={(e) => setNewHospital({...newHospital, longitude: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Ambulance Count"
                                    value={newHospital.ambulanceCount}
                                    onChange={(e) => setNewHospital({...newHospital, ambulanceCount: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Emergency Beds"
                                    value={newHospital.emergencyBeds}
                                    onChange={(e) => setNewHospital({...newHospital, emergencyBeds: e.target.value})}
                                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none"
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleAddHospital}
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg"
                                >
                                    <i className="fas fa-save mr-2"></i>
                                    Save Hospital
                                </button>
                                <button
                                    onClick={() => setShowAddHospital(false)}
                                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all shadow-lg"
                                >
                                    <i className="fas fa-times mr-2"></i>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <p className="text-gray-600 text-lg mb-8">
                        Update ambulance availability and emergency beds for each hospital. Changes reflect immediately in the app.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {hospitals.map(hospital => (
                            <div key={hospital.id} className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
                                        <div className="flex items-center text-gray-500 text-sm mb-2">
                                            <i className="fas fa-ambulance mr-2"></i>
                                            <span>{hospital.ambulanceCount} ambulances</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm mb-2">
                                            <i className="fas fa-bed mr-2"></i>
                                            <span>{hospital.emergencyBeds} emergency beds</span>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-lg font-medium ${
                                        hospital.ambulanceCount > 0 
                                            ? 'bg-green-100 text-green-800 border-2 border-green-200'
                                            : 'bg-red-100 text-red-800 border-2 border-red-200'
                                    }`}>
                                        {hospital.ambulanceCount > 0 ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700 font-medium">Ambulances:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateHospital(hospital.id, 'ambulanceCount', Math.max(0, hospital.ambulanceCount - 1))}
                                                className="bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-colors"
                                            >
                                                <i className="fas fa-minus text-xs"></i>
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center">{hospital.ambulanceCount}</span>
                                            <button
                                                onClick={() => updateHospital(hospital.id, 'ambulanceCount', hospital.ambulanceCount + 1)}
                                                className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 transition-colors"
                                            >
                                                <i className="fas fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700 font-medium">Emergency Beds:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateHospital(hospital.id, 'emergencyBeds', Math.max(0, hospital.emergencyBeds - 1))}
                                                className="bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-colors"
                                            >
                                                <i className="fas fa-minus text-xs"></i>
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center">{hospital.emergencyBeds}</span>
                                            <button
                                                onClick={() => updateHospital(hospital.id, 'emergencyBeds', hospital.emergencyBeds + 1)}
                                                className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 transition-colors"
                                            >
                                                <i className="fas fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {currentView === 'home' && <HomeView />}
            {currentView === 'hospitals' && <HospitalsView />}
            {currentView === 'admin-login' && <AdminLoginView />}
            {currentView === 'admin' && isAdminAuthenticated && <AdminView />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
