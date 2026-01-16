const { useState, useEffect } = React;

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();

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

// Format timestamp to relative time
function formatTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Main Home Component
function Home() {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);

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
                // Navigate to hospitals page
                window.location.href = 'hospitals.html';
            } else {
                setLocationError('Geolocation is not supported by your browser');
            }
        } catch (error) {
            setLocationError('Unable to get your location. Please enable location services.');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                        onClick={() => window.location.href = 'admin.html'}
                        className="text-white opacity-75 hover:opacity-100 text-lg underline transition-opacity"
                    >
                        Admin Panel
                    </button>
                </div>
            </div>
        </div>
    );
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
