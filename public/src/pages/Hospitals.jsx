const { useState, useEffect } = React;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUkNwf9TklqtndzzTqtLmadflsMgc2380",
  authDomain: "smart-ambulance-finder.firebaseapp.com",
  projectId: "smart-ambulance-finder",
  storageBucket: "smart-ambulance-finder.firebasestorage.app",
  messagingSenderId: "1001766044880",
  appId: "1:1001766044880:web:0ef411fa66cc2a2cd3cad5",
  measurementId: "G-CKBLY4PSSY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();

// Format timestamp to relative time
function formatTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
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

// Distance calculation (fallback)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
}

// Main Hospitals Component
function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [useLiveOSM, setUseLiveOSM] = useState(false); // Toggle for OSM vs Firestore

    // Initialize with user location from URL params or default
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const lat = urlParams.get('lat');
        const lng = urlParams.get('lng');
        
        if (lat && lng) {
            const location = { latitude: parseFloat(lat), longitude: parseFloat(lng) };
            setUserLocation(location);
            fetchNearbyHospitals(location);
        } else {
            // Use default location (Delhi)
            const defaultLocation = { latitude: 28.6139, longitude: 77.2090 };
            setUserLocation(defaultLocation);
            fetchNearbyHospitals(defaultLocation);
        }
    }, []);

    // Fetch nearby hospitals from Cloud Function
    const fetchNearbyHospitals = async (location) => {
        try {
            let result;
            
            if (useLiveOSM) {
                // Use OSM data
                const fetchNearbyHospitalsOSM = functions.httpsCallable('fetchNearbyHospitalsOSM');
                result = await fetchNearbyHospitalsOSM({
                    latitude: location.latitude,
                    longitude: location.longitude
                });
            } else {
                // Use existing Firestore data
                const getNearbyHospitals = functions.httpsCallable('getNearbyHospitals');
                result = await getNearbyHospitals({
                    latitude: location.latitude,
                    longitude: location.longitude
                });
            }
            
            const hospitalsData = result.data.hospitals || [];
            
            // Calculate distances for all hospitals
            const hospitalsWithDistance = hospitalsData.map(hospital => ({
                ...hospital,
                distance: calculateDistance(
                    location.latitude,
                    location.longitude,
                    hospital.latitude,
                    hospital.longitude
                )
            })).sort((a, b) => a.distance - b.distance);
            
            setHospitals(hospitalsWithDistance);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            // Fallback to mock data
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
            setLoading(false);
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-red-600 text-white p-6 shadow-xl">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.location.href = 'home.html'}
                                className="mr-6 text-white hover:text-red-200 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Nearby Hospitals</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-lg opacity-90">
                                {userLocation ? 'Location Found' : 'Using Default Location'}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm opacity-75">Live Data:</span>
                                <button
                                    onClick={() => {
                                        setUseLiveOSM(!useLiveOSM);
                                        if (userLocation) {
                                            setLoading(true);
                                            fetchNearbyHospitals(userLocation);
                                        }
                                    }}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        useLiveOSM 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-300 text-gray-700'
                                    }`}
                                >
                                    {useLiveOSM ? 'OSM' : 'Demo'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {loading ? (
                    <div className="text-center py-16">
                        <i className="fas fa-spinner fa-spin text-7xl text-gray-300 mb-6"></i>
                        <p className="text-2xl text-gray-600">Loading hospitals...</p>
                    </div>
                ) : hospitals.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-hospital text-7xl text-gray-300 mb-6"></i>
                        <p className="text-2xl text-gray-600">No hospitals found nearby</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {hospitals.map(hospital => {
                            const statusInfo = getStatusInfo(hospital.ambulanceAvailability);
                            return (
                                <div key={hospital.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-102 border-2 border-gray-100">
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
                                                <span>Last updated: {formatTimeAgo(hospital.lastUpdated)}</span>
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
                                            onClick={() => callAmbulance(hospital)}
                                            className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all transform hover:scale-105 ${
                                                hospital.ambulanceAvailability === 'available' && hospital.ambulancePhone
                                                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            }`}
                                            disabled={hospital.ambulanceAvailability !== 'available' || !hospital.ambulancePhone}
                                        >
                                            <i className="fas fa-ambulance mr-3 text-lg"></i>
                                            <span className="text-lg">
                                                {hospital.ambulancePhone ? 'Call Ambulance' : 'No Phone Available'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => callHospital(hospital)}
                                            className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg ${
                                                hospital.hospitalPhone 
                                                    ? 'bg-green-600 text-white hover:bg-green-700' 
                                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            }`}
                                            disabled={!hospital.hospitalPhone}
                                        >
                                            <i className="fas fa-phone mr-3 text-lg"></i>
                                            <span className="text-lg">
                                                {hospital.hospitalPhone ? 'Call Hospital' : 'No Phone Available'}
                                            </span>
                                        </button>
                                    </div>
                                    {useLiveOSM && (
                                        <div className="mt-3 text-sm text-gray-500 italic">
                                            <i className="fas fa-info-circle mr-2"></i>
                                            Public map data (availability unknown)
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hospitals />);
