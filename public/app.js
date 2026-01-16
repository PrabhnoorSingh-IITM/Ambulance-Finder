// Hospital data
const mockHospitals = [
    // Delhi Hospitals
    { id: "1", name: "AIIMS Delhi", latitude: 28.6368, longitude: 77.2090, ambulanceAvailability: "available", hospitalPhone: "+91-9999426676", ambulancePhone: "+91-9999426675", lastUpdated: new Date(Date.now() - 15 * 60 * 1000) },
    { id: "2", name: "Safdarjung Hospital", latitude: 28.6100, longitude: 77.2089, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426678", ambulancePhone: "+91-9999426677", lastUpdated: new Date(Date.now() - 5 * 60 * 1000) },
    { id: "3", name: "Max Super Speciality Hospital", latitude: 28.6394, longitude: 77.2735, ambulanceAvailability: "available", hospitalPhone: "+91-9999426680", ambulancePhone: "+91-9999426679", lastUpdated: new Date(Date.now() - 30 * 60 * 1000) },
    { id: "4", name: "Apollo Hospital Delhi", latitude: 28.5530, longitude: 77.2090, ambulanceAvailability: "unknown", hospitalPhone: "+91-9999426682", ambulancePhone: "+91-9999426681", lastUpdated: new Date(Date.now() - 120 * 60 * 1000) },
    { id: "5", name: "Fortis Escorts Heart Institute", latitude: 28.6331, longitude: 77.2188, ambulanceAvailability: "available", hospitalPhone: "+91-9999426684", ambulancePhone: "+91-9999426683", lastUpdated: new Date(Date.now() - 45 * 60 * 1000) },
    { id: "6", name: "Sir Ganga Ram Hospital", latitude: 28.6372, longitude: 77.1874, ambulanceAvailability: "available", hospitalPhone: "+91-9999426686", ambulancePhone: "+91-9999426685", lastUpdated: new Date(Date.now() - 20 * 60 * 1000) },
    { id: "7", name: "BLK Super Speciality Hospital", latitude: 28.6769, longitude: 77.2132, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426688", ambulancePhone: "+91-9999426687", lastUpdated: new Date(Date.now() - 10 * 60 * 1000) },
    { id: "8", name: "Indraprastha Apollo Hospital", latitude: 28.5672, longitude: 77.2734, ambulanceAvailability: "available", hospitalPhone: "+91-9999426690", ambulancePhone: "+91-9999426689", lastUpdated: new Date(Date.now() - 25 * 60 * 1000) },
    
    // Mumbai Hospitals
    { id: "9", name: "Lilavati Hospital Mumbai", latitude: 19.0544, longitude: 72.8402, ambulanceAvailability: "available", hospitalPhone: "+91-9999426692", ambulancePhone: "+91-9999426691", lastUpdated: new Date(Date.now() - 18 * 60 * 1000) },
    { id: "10", name: "Kokilaben Dhirubhai Ambani Hospital", latitude: 19.1079, longitude: 72.8347, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426694", ambulancePhone: "+91-9999426693", lastUpdated: new Date(Date.now() - 8 * 60 * 1000) },
    { id: "11", name: "Fortis Hospital Mulund", latitude: 19.1694, longitude: 72.9447, ambulanceAvailability: "available", hospitalPhone: "+91-9999426696", ambulancePhone: "+91-9999426695", lastUpdated: new Date(Date.now() - 35 * 60 * 1000) },
    { id: "12", name: "Hinduja Hospital Mumbai", latitude: 19.0667, longitude: 72.8444, ambulanceAvailability: "unknown", hospitalPhone: "+91-9999426698", ambulancePhone: "+91-9999426697", lastUpdated: new Date(Date.now() - 90 * 60 * 1000) },
    { id: "13", name: "Nanavati Super Speciality Hospital", latitude: 19.0836, longitude: 72.8364, ambulanceAvailability: "available", hospitalPhone: "+91-9999426700", ambulancePhone: "+91-9999426699", lastUpdated: new Date(Date.now() - 40 * 60 * 1000) },
    { id: "14", name: "Jaslok Hospital Mumbai", latitude: 19.0030, longitude: 72.8280, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426702", ambulancePhone: "+91-9999426701", lastUpdated: new Date(Date.now() - 12 * 60 * 1000) },
    { id: "15", name: "Breach Candy Hospital", latitude: 19.0008, longitude: 72.8283, ambulanceAvailability: "available", hospitalPhone: "+91-9999426704", ambulancePhone: "+91-9999426703", lastUpdated: new Date(Date.now() - 28 * 60 * 1000) },
    { id: "16", name: "Wockhardt Hospital Mumbai Central", latitude: 19.0176, longitude: 72.8561, ambulanceAvailability: "available", hospitalPhone: "+91-9999426706", ambulancePhone: "+91-9999426705", lastUpdated: new Date(Date.now() - 22 * 60 * 1000) },

    // Bangalore Hospitals
    { id: "17", name: "Manipal Hospital Bangalore", latitude: 12.9716, longitude: 77.5946, ambulanceAvailability: "available", hospitalPhone: "+91-9999426708", ambulancePhone: "+91-9999426707", lastUpdated: new Date(Date.now() - 16 * 60 * 1000) },
    { id: "18", name: "Apollo Hospital Bangalore", latitude: 12.9766, longitude: 77.6033, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426710", ambulancePhone: "+91-9999426709", lastUpdated: new Date(Date.now() - 7 * 60 * 1000) },
    { id: "19", name: "Fortis Hospital Bangalore", latitude: 12.9352, longitude: 77.6244, ambulanceAvailability: "available", hospitalPhone: "+91-9999426712", ambulancePhone: "+91-9999426711", lastUpdated: new Date(Date.now() - 33 * 60 * 1000) },
    { id: "20", name: "Narayana Health City Bangalore", latitude: 12.8997, longitude: 77.5997, ambulanceAvailability: "unknown", hospitalPhone: "+91-9999426714", ambulancePhone: "+91-9999426713", lastUpdated: new Date(Date.now() - 85 * 60 * 1000) },
    { id: "21", name: "Columbia Asia Hospital Bangalore", latitude: 12.9279, longitude: 77.6272, ambulanceAvailability: "available", hospitalPhone: "+91-9999426716", ambulancePhone: "+91-9999426715", lastUpdated: new Date(Date.now() - 38 * 60 * 1000) },
    { id: "22", name: "Sakra World Hospital Bangalore", latitude: 12.9239, longitude: 77.6202, ambulanceAvailability: "busy", hospitalPhone: "+91-9999426718", ambulancePhone: "+91-9999426717", lastUpdated: new Date(Date.now() - 14 * 60 * 1000) },
    { id: "23", name: "Vikram Hospital Bangalore", latitude: 12.9569, longitude: 77.7011, ambulanceAvailability: "available", hospitalPhone: "+91-9999426720", ambulancePhone: "+91-9999426719", lastUpdated: new Date(Date.now() - 26 * 60 * 1000) },
    { id: "24", name: "BGS Global Hospital Bangalore", latitude: 12.9345, longitude: 77.5457, ambulanceAvailability: "available", hospitalPhone: "+91-9999426722", ambulancePhone: "+91-9999426721", lastUpdated: new Date(Date.now() - 31 * 60 * 1000) }
];

// Distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
};

// Main React App
const { useState, useEffect } = React;

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [userLocation, setUserLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [adminPassword, setAdminPassword] = useState('');
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    useEffect(() => {
        setHospitals(mockHospitals);
    }, []);

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
                
                const hospitalsWithDistance = mockHospitals.map(hospital => {
                    const distance = calculateDistance(
                        location.latitude,
                        location.longitude,
                        hospital.latitude,
                        hospital.longitude
                    );
                    return { ...hospital, distance };
                }).sort((a, b) => a.distance - b.distance);

                setHospitals(hospitalsWithDistance);
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

    const handleAdminLogin = () => {
        if (adminPassword === 'admin123') {
            setIsAdminAuthenticated(true);
            setCurrentScreen('admin');
            setAdminPassword('');
        } else {
            alert('Incorrect password. Please try again.');
            setAdminPassword('');
        }
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setCurrentScreen('home');
    };

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
                        onClick={() => setCurrentScreen('admin-login')}
                        className="text-white opacity-75 hover:opacity-100 text-lg underline transition-opacity"
                    >
                        Admin Panel
                    </button>
                </div>
            </div>
        </div>
    );

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
                <div className="space-y-6">
                    {hospitals.map(hospital => {
                        const statusColor = hospital.ambulanceAvailability === 'available' 
                            ? 'text-green-600 bg-green-100 border-green-200'
                            : hospital.ambulanceAvailability === 'busy'
                            ? 'text-red-600 bg-red-100 border-red-200'
                            : 'text-gray-600 bg-gray-100 border-gray-200';
                        
                        const statusIcon = hospital.ambulanceAvailability === 'available' 
                            ? 'check-circle'
                            : hospital.ambulanceAvailability === 'busy'
                            ? 'times-circle'
                            : 'question-circle';
                        
                        const statusText = hospital.ambulanceAvailability === 'available' 
                            ? 'Available'
                            : hospital.ambulanceAvailability === 'busy'
                            ? 'Busy'
                            : 'Unknown';

                        return (
                            <div key={hospital.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-gray-100">
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-gray-800 mb-3">{hospital.name}</h3>
                                        <div className="flex items-center text-gray-700 mb-3 text-lg">
                                            <i className="fas fa-map-marker-alt mr-3 text-red-500 text-xl"></i>
                                            <span className="font-medium">
                                                {hospital.distance ? `${hospital.distance} km away` : 'Delhi, India'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-base">
                                            <i className="fas fa-clock mr-2"></i>
                                            <span>Last updated: {Math.floor((new Date() - hospital.lastUpdated) / 60000)} minutes ago</span>
                                        </div>
                                    </div>
                                    <div className="lg:text-left mt-4 lg:mt-0">
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${statusColor} border mb-4`}>
                                            <i className={`fas fa-${statusIcon} mr-2`}></i>
                                            <span>{statusText}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
                                    <button
                                        onClick={() => window.location.href = `tel:${hospital.ambulancePhone}`}
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
                                        onClick={() => window.location.href = `tel:${hospital.hospitalPhone}`}
                                        className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        <i className="fas fa-phone mr-3 text-lg"></i>
                                        <span className="text-lg">Call Hospital</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const AdminLoginScreen = () => (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-shield-alt text-3xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-black text-gray-800 mb-3">Admin Login</h1>
                    <p className="text-gray-600">Enter password to access admin panel</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none text-lg"
                            placeholder="Enter admin password"
                        />
                    </div>

                    <button
                        onClick={handleAdminLogin}
                        className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl font-black text-lg hover:bg-gray-700 transition-all shadow-lg"
                    >
                        <i className="fas fa-sign-in-alt mr-3"></i>
                        Login to Admin Panel
                    </button>

                    <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-full text-gray-600 hover:text-gray-800 text-lg underline transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );

    const AdminPanel = () => (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-800 text-white p-6 shadow-xl">
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
                            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-lg"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Logout
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
                        Update ambulance availability status for each hospital. Changes reflect immediately in hospital list.
                    </p>

                    <div className="space-y-6">
                        {hospitals.map(hospital => {
                            const statusColor = hospital.ambulanceAvailability === 'available' 
                                ? 'text-green-600 bg-green-100 border-green-200'
                                : hospital.ambulanceAvailability === 'busy'
                                ? 'text-red-600 bg-red-100 border-red-200'
                                : 'text-gray-600 bg-gray-100 border-gray-200';
                            
                            const statusIcon = hospital.ambulanceAvailability === 'available' 
                                ? 'check-circle'
                                : hospital.ambulanceAvailability === 'busy'
                                ? 'times-circle'
                                : 'question-circle';
                            
                            const statusText = hospital.ambulanceAvailability === 'available' 
                                ? 'Available'
                                : hospital.ambulanceAvailability === 'busy'
                                ? 'Busy'
                                : 'Unknown';

                            return (
                                <div key={hospital.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 mb-3">{hospital.name}</h3>
                                            <div className="text-gray-500 text-base mb-4">
                                                <i className="fas fa-clock mr-2"></i>
                                                <span>Last updated: {Math.floor((new Date() - hospital.lastUpdated) / 60000)} minutes ago</span>
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${statusColor} border-2`}>
                                            <i className={`fas fa-${statusIcon} mr-2`}></i>
                                            <span>{statusText}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => {
                                                const updatedHospitals = hospitals.map(h => 
                                                    h.id === hospital.id 
                                                        ? { ...h, ambulanceAvailability: 'available', lastUpdated: new Date() }
                                                        : h
                                                );
                                                setHospitals(updatedHospitals);
                                                alert('Hospital availability updated successfully!');
                                            }}
                                            className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-lg shadow-lg"
                                        >
                                            <i className="fas fa-check mr-2"></i>
                                            Available
                                        </button>
                                        <button
                                            onClick={() => {
                                                const updatedHospitals = hospitals.map(h => 
                                                    h.id === hospital.id 
                                                        ? { ...h, ambulanceAvailability: 'busy', lastUpdated: new Date() }
                                                        : h
                                                );
                                                setHospitals(updatedHospitals);
                                                alert('Hospital availability updated successfully!');
                                            }}
                                            className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-lg shadow-lg"
                                        >
                                            <i className="fas fa-times mr-2"></i>
                                            Busy
                                        </button>
                                        <button
                                            onClick={() => {
                                                const updatedHospitals = hospitals.map(h => 
                                                    h.id === hospital.id 
                                                        ? { ...h, ambulanceAvailability: 'unknown', lastUpdated: new Date() }
                                                        : h
                                                );
                                                setHospitals(updatedHospitals);
                                                alert('Hospital availability updated successfully!');
                                            }}
                                            className="bg-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-lg shadow-lg"
                                        >
                                            <i className="fas fa-question mr-2"></i>
                                            Unknown
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {currentScreen === 'home' && <HomeScreen />}
            {currentScreen === 'hospitals' && <HospitalListScreen />}
            {currentScreen === 'admin-login' && <AdminLoginScreen />}
            {currentScreen === 'admin' && isAdminAuthenticated && <AdminPanel />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
