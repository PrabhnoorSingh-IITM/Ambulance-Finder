const { useState, useEffect } = React;



// Backend Database Simulation - Delhi Area Hospitals
const hospitalDatabase = [
    {
        id: 1,
        name: "AIIMS Delhi",
        location: {
            latitude: 28.6368,
            longitude: 77.2090
        },
        address: "Ansari Nagar, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 5,
        specialties: ["Emergency", "Cardiology", "Trauma", "Neurology"],
        rating: 4.8,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 2,
        name: "Safdarjung Hospital",
        location: {
            latitude: 28.6100,
            longitude: 77.2089
        },
        address: "Safdarjung Enclave, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 3,
        specialties: ["Emergency", "Pediatrics", "Maternity", "Surgery"],
        rating: 4.3,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 3,
        name: "Max Super Speciality Hospital",
        location: {
            latitude: 28.6394,
            longitude: 77.2735
        },
        address: "Saket, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 0,
        specialties: ["Emergency", "Oncology", "Orthopedics"],
        rating: 4.5,
        emergencyBed: false,
        lastUpdated: new Date()
    },
    {
        id: 4,
        name: "Apollo Hospital",
        location: {
            latitude: 28.5530,
            longitude: 77.2090
        },
        address: "Mathura Road, Sarita Vihar, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 2,
        specialties: ["Emergency", "Cardiology", "ICU", "Multi-Specialty"],
        rating: 4.6,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 5,
        name: "Fortis Escorts Heart Institute",
        location: {
            latitude: 28.6331,
            longitude: 77.2188
        },
        address: "Okhla Road, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 4,
        specialties: ["Emergency", "Cardiology", "Heart Surgery", "Trauma"],
        rating: 4.7,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 6,
        name: "LNJP Hospital",
        location: {
            latitude: 28.6428,
            longitude: 77.2194
        },
        address: "Jawahar Lal Nehru Marg, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 1,
        specialties: ["Emergency", "General Medicine", "Surgery"],
        rating: 3.8,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 7,
        name: "BLK Super Speciality Hospital",
        location: {
            latitude: 28.5670,
            longitude: 77.2720
        },
        address: "Pusa Road, Rajendra Nagar, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 3,
        specialties: ["Emergency", "Cancer", "Kidney", "Liver"],
        rating: 4.4,
        emergencyBed: true,
        lastUpdated: new Date()
    },
    {
        id: 8,
        name: "Indraprastha Apollo Hospital",
        location: {
            latitude: 28.6408,
            longitude: 77.2950
        },
        address: "Sarita Vihar, New Delhi",
        phone: "+91-9999426675",
        ambulanceCount: 2,
        specialties: ["Emergency", "Multi-Specialty", "Trauma"],
        rating: 4.5,
        emergencyBed: true,
        lastUpdated: new Date()
    }
];

// Backend API Simulation
class HospitalAPI {
    static async fetchHospitals(userLocation) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return hospitalDatabase.map(hospital => {
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                hospital.location.latitude,
                hospital.location.longitude
            );
            
            return {
                ...hospital,
                distance: distance
            };
        }).sort((a, b) => a.distance - b.distance);
    }
    
    static async updateAmbulanceCount(hospitalId, newCount) {
        const hospital = hospitalDatabase.find(h => h.id === hospitalId);
        if (hospital) {
            hospital.ambulanceCount = newCount;
            hospital.lastUpdated = new Date();
        }
        return hospital;
    }
}

// Distance calculation utility
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Distance in km, rounded to 1 decimal
}

// Google Maps Service
class GoogleMapsService {
    static map = null;
    static markers = [];
    static infoWindow = null;

    static async initializeMap(userLocation, hospitals) {
        return new Promise((resolve) => {
            window.initMap = () => {
                // Create map centered on user location
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: userLocation.latitude, lng: userLocation.longitude },
                    zoom: 13,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                });

                // Add user location marker
                this.addUserLocationMarker(userLocation);

                // Add hospital markers
                this.addHospitalMarkers(hospitals);

                resolve();
            };
        });
    }

    static addUserLocationMarker(userLocation) {
        const userMarker = new google.maps.Marker({
            position: { lat: userLocation.latitude, lng: userLocation.longitude },
            map: this.map,
            title: "Your Location",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#059669",
                fillOpacity: 0.8,
                strokeColor: "#ffffff",
                strokeWeight: 2
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="p-2">
                    <h3 class="font-bold user-location-marker">Your Location</h3>
                    <p class="text-sm">Accuracy: ±${userLocation.accuracy || 50}m</p>
                </div>
            `
        });

        userMarker.addListener('click', () => {
            infoWindow.open(this.map, userMarker);
        });
    }

    static addHospitalMarkers(hospitals) {
        this.infoWindow = new google.maps.InfoWindow();

        hospitals.forEach(hospital => {
            const marker = new google.maps.Marker({
                position: { lat: hospital.location.latitude, lng: hospital.location.longitude },
                map: this.map,
                title: hospital.name,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 6,
                    fillColor: "#dc2626",
                    fillOpacity: 0.9,
                    strokeColor: "#ffffff",
                    strokeWeight: 1
                }
            });

            const infoContent = `
                <div class="p-3 max-w-xs">
                    <h3 class="font-bold hospital-marker mb-2">${hospital.name}</h3>
                    <p class="text-sm text-gray-600 mb-1">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        ${hospital.address}
                    </p>
                    <p class="text-sm mb-1">
                        <i class="fas fa-route mr-1"></i>
                        <strong>Distance:</strong> ${hospital.distance} km
                    </p>
                    <p class="text-sm mb-1">
                        <i class="fas fa-ambulance mr-1"></i>
                        <strong>Ambulances:</strong> ${hospital.ambulanceCount}
                    </p>
                    <p class="text-sm mb-2">
                        <i class="fas fa-phone mr-1"></i>
                        <strong>Phone:</strong> ${hospital.phone}
                    </p>
                    ${hospital.emergencyBed ? `
                        <div class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            <i class="fas fa-procedures mr-1"></i>
                            Emergency Bed Available
                        </div>
                    ` : ''}
                    <div class="mt-3 flex space-x-2">
                        <button onclick="window.location.href='tel:${hospital.phone}'" 
                                class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                            <i class="fas fa-phone mr-1"></i>
                            Call
                        </button>
                        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${hospital.location.latitude},${hospital.location.longitude}')"
                                class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            <i class="fas fa-directions mr-1"></i>
                            Directions
                        </button>
                    </div>
                </div>
            `;

            marker.addListener('click', () => {
                this.infoWindow.setContent(infoContent);
                this.infoWindow.open(this.map, marker);
            });

            this.markers.push(marker);
        });
    }

    static updateMapCenter(userLocation) {
        if (this.map) {
            this.map.setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
        }
    }
}
class LocationService {
    static async requestLocationPermission() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error('Location permission denied'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error('Location information unavailable'));
                            break;
                        case error.TIMEOUT:
                            reject(new Error('Location request timed out'));
                            break;
                        default:
                            reject(new Error('Unknown location error'));
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
}

// Dummy data for ambulance services - Delhi Area
const ambulanceServices = [
    {
        id: 1,
        name: "Delhi Emergency Ambulance Service",
        phone: "+91-9999426675",
        status: "available",
        lastUpdate: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        responseTime: "8-12 minutes",
        serviceArea: "Central Delhi, South Delhi",
        vehicles: 3
    },
    {
        id: 2,
        name: "AIIMS Emergency Response",
        phone: "+91-9999426675",
        status: "busy",
        lastUpdate: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        responseTime: "12-18 minutes",
        serviceArea: "Ansari Nagar, South Delhi",
        vehicles: 2
    },
    {
        id: 3,
        name: "Apollo 24/7 Emergency",
        phone: "+91-9999426675",
        status: "available",
        lastUpdate: new Date(Date.now() - 2 * 60000), // 2 minutes ago
        responseTime: "10-15 minutes",
        serviceArea: "Sarita Vihar, South Delhi",
        vehicles: 5
    },
    {
        id: 4,
        name: "Fortis Emergency Transport",
        phone: "+91-9999426675",
        status: "unavailable",
        lastUpdate: new Date(Date.now() - 30 * 60000), // 30 minutes ago
        responseTime: "N/A",
        serviceArea: "Okhla, New Delhi",
        vehicles: 0
    },
    {
        id: 5,
        name: "National Emergency Service 108",
        phone: "+91-9999426675",
        status: "available",
        lastUpdate: new Date(Date.now() - 8 * 60000), // 8 minutes ago
        responseTime: "6-10 minutes",
        serviceArea: "Delhi NCR",
        vehicles: 4
    }
];

function App() {
    const [activeTab, setActiveTab] = useState('hospitals');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [filteredAmbulances, setFilteredAmbulances] = useState(ambulanceServices);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);

    // Initialize location and fetch hospitals
    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        setIsLoadingLocation(true);
        setLocationError(null);
        
        try {
            // Request location permission
            const location = await LocationService.requestLocationPermission();
            setUserLocation(location);
            
            // Fetch hospitals based on location
            setIsLoadingHospitals(true);
            const hospitalData = await HospitalAPI.fetchHospitals(location);
            setHospitals(hospitalData);
            setFilteredHospitals(hospitalData);
            setIsLoadingHospitals(false);
            
        } catch (error) {
            console.error('Location error:', error);
            setLocationError(error.message);
            
            // Fallback to default location (Delhi coordinates)
            const defaultLocation = { latitude: 28.63, longitude: 77.12 };
            setUserLocation(defaultLocation);
            
            setIsLoadingHospitals(true);
            const hospitalData = await HospitalAPI.fetchHospitals(defaultLocation);
            setHospitals(hospitalData);
            setFilteredHospitals(hospitalData);
            setIsLoadingHospitals(false);
        } finally {
            setIsLoadingLocation(false);
        }
    };

    // Filter hospitals based on search
    useEffect(() => {
        const filtered = hospitals.filter(hospital =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredHospitals(filtered);
    }, [searchTerm, hospitals]);

    // Filter ambulances based on search
    useEffect(() => {
        const filtered = ambulanceServices.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.serviceArea.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAmbulances(filtered);
    }, [searchTerm]);

    // Initialize map when hospitals tab is active and data is ready
    useEffect(() => {
        if (activeTab === 'hospitals' && userLocation && hospitals.length > 0) {
            GoogleMapsService.initializeMap(userLocation, hospitals);
        }
    }, [activeTab, userLocation, hospitals]);

    const formatLastUpdate = (date) => {
        const minutes = Math.floor((Date.now() - date) / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours} hours ago`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'available': return 'status-available';
            case 'busy': return 'status-busy';
            case 'unavailable': return 'status-unavailable';
            default: return '';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'busy': return 'bg-yellow-100 text-yellow-800';
            case 'unavailable': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleEmergencyCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handleCallAmbulance = (hospital) => {
        // Direct call to hospital for ambulance
        handleEmergencyCall(hospital.phone);
        
        // Update ambulance count (simulate dispatch)
        if (hospital.ambulanceCount > 0) {
            HospitalAPI.updateAmbulanceCount(hospital.id, hospital.ambulanceCount - 1);
            // Update local state
            setHospitals(prev => prev.map(h => 
                h.id === hospital.id 
                    ? { ...h, ambulanceCount: h.ambulanceCount - 1 }
                    : h
            ));
        }
    };

    const getAmbulanceStatus = (count) => {
        if (count === 0) return { text: 'None Available', class: 'text-red-600 bg-red-100' };
        if (count <= 2) return { text: `${count} Available`, class: 'text-yellow-600 bg-yellow-100' };
        return { text: `${count} Available`, class: 'text-green-600 bg-green-100' };
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-red-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-ambulance text-2xl"></i>
                            <h1 className="text-2xl font-bold">Smart Ambulance Finder</h1>
                        </div>
                        <button 
                            onClick={() => handleEmergencyCall('112')}
                            className="emergency-pulse bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-50 transition-colors"
                        >
                            <i className="fas fa-phone-alt mr-2"></i>
                            Emergency: 112
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Location Status */}
                {locationError && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        Location access denied. Showing results for default location.
                    </div>
                )}
                
                {isLoadingLocation && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Getting your location...
                    </div>
                )}

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search hospitals, specialties, or areas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <i className="fas fa-search absolute left-4 top-4 text-gray-400"></i>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-gray-200 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('hospitals')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                            activeTab === 'hospitals' 
                                ? 'bg-white text-red-600 shadow-sm' 
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <i className="fas fa-hospital mr-2"></i>
                        Hospitals
                    </button>
                    <button
                        onClick={() => setActiveTab('ambulances')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                            activeTab === 'ambulances' 
                                ? 'bg-white text-red-600 shadow-sm' 
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <i className="fas fa-ambulance mr-2"></i>
                        Ambulance Services
                    </button>
                </div>

                {/* Hospitals Tab */}
                {activeTab === 'hospitals' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Map */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold mb-4 text-gray-800">
                                    <i className="fas fa-map-marked-alt mr-2 text-red-600"></i>
                                    Hospital Locations
                                </h2>
                                <div id="map"></div>
                            </div>
                        </div>

                        {/* Hospital List */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                <i className="fas fa-hospital mr-2 text-red-600"></i>
                                Nearby Hospitals ({filteredHospitals.length})
                            </h2>
                            
                            {isLoadingHospitals ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-spinner fa-spin text-4xl text-red-600 mb-4"></i>
                                    <p className="text-gray-600">Loading hospitals...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredHospitals.map(hospital => {
                                        const ambulanceStatus = getAmbulanceStatus(hospital.ambulanceCount);
                                        return (
                                            <div key={hospital.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800">{hospital.name}</h3>
                                                        <p className="text-gray-600 flex items-center mt-1">
                                                            <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                                                            {hospital.address}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-red-600">{hospital.distance} km</div>
                                                        <div className="flex items-center mt-1">
                                                            <i className="fas fa-star text-yellow-400 mr-1"></i>
                                                            <span className="text-gray-600">{hospital.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {hospital.specialties.map((specialty, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                    {hospital.emergencyBed && (
                                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            <i className="fas fa-procedures mr-1"></i>
                                                            Emergency Bed Available
                                                        </span>
                                                    )}
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${ambulanceStatus.class}`}>
                                                        <i className="fas fa-ambulance mr-1"></i>
                                                        {ambulanceStatus.text}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-phone-alt mr-2 text-green-600"></i>
                                                        <span>{hospital.phone}</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleCallAmbulance(hospital)}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                hospital.ambulanceCount > 0
                                                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                            }`}
                                                            disabled={hospital.ambulanceCount === 0}
                                                        >
                                                            <i className="fas fa-ambulance mr-2"></i>
                                                            {hospital.ambulanceCount > 0 ? 'Call Ambulance' : 'No Ambulance'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleEmergencyCall(hospital.phone)}
                                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                        >
                                                            <i className="fas fa-phone mr-2"></i>
                                                            Call Hospital
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Ambulances Tab */}
                {activeTab === 'ambulances' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            <i className="fas fa-ambulance mr-2 text-red-600"></i>
                            Ambulance Services ({filteredAmbulances.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredAmbulances.map(service => (
                                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                                            <p className="text-gray-600 mt-1">
                                                <i className="fas fa-map-marked-alt mr-2 text-red-500"></i>
                                                {service.serviceArea}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(service.status)}`}>
                                                <i className={`fas fa-circle mr-2 text-xs ${getStatusClass(service.status)}`}></i>
                                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{service.vehicles}</div>
                                            <div className="text-sm text-gray-600">Available Vehicles</div>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <div className="text-lg font-bold text-gray-800">{service.responseTime}</div>
                                            <div className="text-sm text-gray-600">Response Time</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-sm text-gray-500">
                                            <i className="fas fa-clock mr-1"></i>
                                            Last updated: {formatLastUpdate(service.lastUpdate)}
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleEmergencyCall(service.phone)}
                                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                            service.status === 'available' 
                                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                        disabled={service.status !== 'available'}
                                    >
                                        <i className="fas fa-phone mr-2"></i>
                                        {service.status === 'available' ? 'Call Now' : 'Currently Unavailable'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-2">
                        <i className="fas fa-info-circle mr-2"></i>
                        This is a demo application for emergency medical services
                    </p>
                    <p className="text-sm text-gray-400">
                        In case of real emergency, always call your local emergency number immediately
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
