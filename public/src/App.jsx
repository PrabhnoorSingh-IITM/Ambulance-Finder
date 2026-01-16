const { useState, useEffect } = React;

// Include Button component inline
const Button = ({ children, onClick, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-lg shadow-lg ${className}`}
        >
            {children}
        </button>
    );
};

// Include HospitalCard component inline
const HospitalCard = ({ hospital, statusInfo, onCallAmbulance, onCallHospital }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-102 border-2 border-gray-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-800 mb-3">{hospital.name}</h3>
                    <div className="flex items-center text-gray-700 mb-3 text-lg">
                        <i className="fas fa-map-marker-alt mr-3 text-red-500 text-xl"></i>
                        <span className="font-medium">
                            {hospital.distance ? `${hospital.distance} km away` : 'Distance calculating...'}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-base">
                        <i className="fas fa-clock mr-2"></i>
                        <span>Last updated: {hospital.lastUpdated ? `${Math.floor((new Date() - hospital.lastUpdated) / 60000)} minutes ago` : 'Unknown'}</span>
                    </div>
                </div>
                <div className="lg:text-left mt-4 lg:mt-0">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${statusInfo.color} border mb-4`}>
                        <i className={`fas fa-${statusInfo.icon} mr-2`}></i>
                        <span>{statusInfo.text}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
                <button
                    onClick={() => onCallAmbulance(hospital)}
                    className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all transform hover:scale-105 ${
                        hospital.ambulanceAvailability === 'available'
                            ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={hospital.ambulanceAvailability !== 'available'}
                >
                    <i className="fas fa-ambulance mr-3 text-lg"></i>
                    <span className="text-lg">Call Ambulance</span>
                </button>
                <button
                    onClick={() => onCallHospital(hospital)}
                    className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                >
                    <i className="fas fa-phone mr-3 text-lg"></i>
                    <span className="text-lg">Call Hospital</span>
                </button>
            </div>
        </div>
    );
};

// Include utility functions inline
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Distance in km, rounded to 1 decimal
};

const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
};

// Mock Firebase functions (fallback)
const getNearbyHospitalsFromAPI = async (latitude, longitude) => {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockHospitals.map(hospital => ({
                ...hospital,
                distance: calculateDistance(latitude, longitude, hospital.latitude, hospital.longitude)
            })).sort((a, b) => a.distance - b.distance));
        }, 500);
    });
};

const updateHospitalAvailabilityAPI = async (hospitalId, newStatus) => {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true });
        }, 300);
    });
};

// Mock data for demo
const mockHospitals = [
    {
        id: "1",
        name: "AIIMS Delhi",
        latitude: 28.6368,
        longitude: 77.2090,
        ambulanceAvailability: "available",
        hospitalPhone: "+91-9999426676",
        ambulancePhone: "+91-9999426675",
        lastUpdated: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
        id: "2", 
        name: "Safdarjung Hospital",
        latitude: 28.6100,
        longitude: 77.2089,
        ambulanceAvailability: "busy",
        hospitalPhone: "+91-9999426678",
        ambulancePhone: "+91-9999426677",
        lastUpdated: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
        id: "3",
        name: "Max Super Speciality Hospital",
        latitude: 28.6394,
        longitude: 77.2735,
        ambulanceAvailability: "available",
        hospitalPhone: "+91-9999426680",
        ambulancePhone: "+91-9999426679",
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
        id: "4",
        name: "Apollo Hospital",
        latitude: 28.5530,
        longitude: 77.2090,
        ambulanceAvailability: "unknown",
        hospitalPhone: "+91-9999426682",
        ambulancePhone: "+91-9999426681",
        lastUpdated: new Date(Date.now() - 120 * 60 * 1000)
    },
    {
        id: "5",
        name: "Fortis Escorts Heart Institute",
        latitude: 28.6331,
        longitude: 77.2188,
        ambulanceAvailability: "available",
        hospitalPhone: "+91-9999426684",
        ambulancePhone: "+91-9999426683",
        lastUpdated: new Date(Date.now() - 45 * 60 * 1000)
    }
];

// Main App Component
function App() {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [userLocation, setUserLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);

    // Initialize with mock data
    useEffect(() => {
        setHospitals(mockHospitals);
    }, []);

    // Request browser location permission
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
                fetchNearbyHospitals(location);
                setCurrentScreen('hospitals');
            } else {
                setLocationError('Geolocation is not supported by your browser');
            }
        } catch (error) {
            setLocationError('Unable to get your location. Please enable location services.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch nearby hospitals from Cloud Function
    const fetchNearbyHospitals = async (location) => {
        try {
            const result = await getNearbyHospitalsFromAPI(location.latitude, location.longitude);
            setHospitals(result);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            // Fallback to mock data with distance calculation
            const hospitalsWithDistance = mockHospitals.map(hospital => ({
                ...hospital,
                distance: calculateDistance(
                    location.latitude,
                    location.longitude,
                    hospital.latitude,
                    hospital.longitude
                )
            })).sort((a, b) => a.distance - b.distance);
            
            setHospitals(hospitalsWithDistance);
        }
    };

    // Call ambulance service
    const callAmbulance = (hospital) => {
        window.location.href = `tel:${hospital.ambulancePhone}`;
    };

    // Call hospital directly
    const callHospital = (hospital) => {
        window.location.href = `tel:${hospital.hospitalPhone}`;
    };

    // Update hospital availability (admin function)
    const updateAvailability = async (hospitalId, newStatus) => {
        try {
            await updateHospitalAvailabilityAPI(hospitalId, newStatus);

            // Update local state immediately
            const updatedHospitals = hospitals.map(h => 
                h.id === hospitalId 
                    ? { ...h, ambulanceAvailability: newStatus, lastUpdated: new Date() }
                    : h
            );
            setHospitals(updatedHospitals);
            
            alert('Hospital availability updated successfully!');
        } catch (error) {
            console.error('Error updating availability:', error);
            alert('Error updating availability. Please try again.');
        }
    };

    // Home/Emergency Screen
    const HomeScreen = () => (
        <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-4">
            <div className="text-center text-white max-w-md w-full">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <i className="fas fa-ambulance text-5xl text-red-600"></i>
                    </div>
                    <h1 className="text-4xl font-black mb-3">Smart Ambulance Finder</h1>
                    <p className="text-xl opacity-90 mb-8">Find nearby hospitals in emergency situations</p>
                </div>

                {locationError && (
                    <div className="bg-red-700 border border-red-400 text-white px-6 py-4 rounded-xl mb-8">
                        <i className="fas fa-exclamation-triangle mr-3 text-xl"></i>
                        <span className="text-lg">{locationError}</span>
                    </div>
                )}

                <button
                    onClick={requestLocation}
                    disabled={loading}
                    className="w-full bg-white text-red-600 px-10 py-8 rounded-2xl font-black text-2xl hover:bg-red-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <i className="fas fa-spinner fa-spin mr-4 text-2xl"></i>
                            <span className="text-xl">Getting Your Location...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <i className="fas fa-hospital mr-4 text-2xl"></i>
                            <span className="text-xl">Find Nearby Hospitals</span>
                        </div>
                    )}
                </button>

                <div className="mt-8">
                    <button
                        onClick={() => window.location.href = 'tel:112'}
                        className="bg-red-800 text-white px-8 py-6 rounded-xl font-black text-xl hover:bg-red-900 transition-all w-full shadow-xl"
                    >
                        <i className="fas fa-phone-alt mr-3"></i>
                        <span>Emergency: 112</span>
                    </button>
                </div>

                <div className="mt-12">
                    <button
                        onClick={() => setCurrentScreen('admin')}
                        className="text-white opacity-75 hover:opacity-100 text-lg underline transition-opacity"
                    >
                        Admin Panel
                    </button>
                </div>
            </div>
        </div>
    );

    // Hospital List Screen
    const HospitalListScreen = () => (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-red-600 text-white p-6 shadow-xl">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setCurrentScreen('home')}
                                className="mr-6 text-white hover:text-red-200 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Nearby Hospitals</h1>
                        </div>
                        <div className="text-lg opacity-90">
                            {userLocation ? 'Location Found' : 'Using Default Location'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {hospitals.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-hospital text-7xl text-gray-300 mb-6"></i>
                        <p className="text-2xl text-gray-600">No hospitals found nearby</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {hospitals.map(hospital => {
                            const statusInfo = getStatusInfo(hospital.ambulanceAvailability);
                            return (
                                <HospitalCard 
                                    key={hospital.id}
                                    hospital={hospital}
                                    statusInfo={statusInfo}
                                    onCallAmbulance={callAmbulance}
                                    onCallHospital={callHospital}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );

    // Admin Panel Screen
    const AdminPanel = () => (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-800 text-white p-6 shadow-xl">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setCurrentScreen('home')}
                                className="mr-6 text-white hover:text-gray-300 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Admin Panel</h1>
                        </div>
                        <button
                            onClick={() => setCurrentScreen('home')}
                            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-lg"
                        >
                            Exit Admin
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-black text-gray-800 mb-6">
                        <i className="fas fa-cog mr-3"></i>
                        Update Hospital Availability
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Update ambulance availability status for each hospital. Changes reflect immediately in the hospital list.
                    </p>

                    <div className="space-y-6">
                        {hospitals.map(hospital => {
                            const statusInfo = getStatusInfo(hospital.ambulanceAvailability);
                            return (
                                <div key={hospital.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 mb-3">{hospital.name}</h3>
                                            <div className="text-gray-500 text-base mb-4">
                                                <i className="fas fa-clock mr-2"></i>
                                                <span>Last updated: {formatTimeAgo(hospital.lastUpdated)}</span>
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${statusInfo.color} border-2`}>
                                            <i className={`fas fa-${statusInfo.icon} mr-2`}></i>
                                            <span>{statusInfo.text}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            onClick={() => updateAvailability(hospital.id, 'available')}
                                            className="bg-green-600 text-white hover:bg-green-700"
                                        >
                                            <i className="fas fa-check mr-2"></i>
                                            Available
                                        </Button>
                                        <Button
                                            onClick={() => updateAvailability(hospital.id, 'busy')}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                            <i className="fas fa-times mr-2"></i>
                                            Busy
                                        </Button>
                                        <Button
                                            onClick={() => updateAvailability(hospital.id, 'unknown')}
                                            className="bg-gray-600 text-white hover:bg-gray-700"
                                        >
                                            <i className="fas fa-question mr-2"></i>
                                            Unknown
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

    // Main render logic
    return (
        <div>
            {currentScreen === 'home' && <HomeScreen />}
            {currentScreen === 'hospitals' && <HospitalListScreen />}
            {currentScreen === 'admin' && <AdminPanel />}
        </div>
    );
}

// Get status styling and text
function getStatusInfo(status) {
    switch(status) {
        case 'available':
            return { color: 'text-green-600 bg-green-100 border-green-200', text: 'Available', icon: 'check-circle' };
        case 'busy':
            return { color: 'text-red-600 bg-red-100 border-red-200', text: 'Busy', icon: 'times-circle' };
        default:
            return { color: 'text-gray-600 bg-gray-100 border-gray-200', text: 'Unknown', icon: 'question-circle' };
    }
}

export default App;
