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

// Main Admin Component
function Admin() {
    const [hospitals, setHospitals] = useState(mockHospitals);

    // Update hospital availability (admin function)
    const updateAvailability = async (hospitalId, newStatus) => {
        try {
            const updateHospitalAvailability = functions.httpsCallable('updateHospitalAvailability');
            await updateHospitalAvailability({
                hospitalId: hospitalId,
                availability: newStatus
            });

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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-800 text-white p-6 shadow-xl">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.location.href = 'home.html'}
                                className="mr-6 text-white hover:text-gray-300 transition-colors"
                            >
                                <i className="fas fa-arrow-left text-2xl"></i>
                            </button>
                            <h1 className="text-2xl font-black">Admin Panel</h1>
                        </div>
                        <button
                            onClick={() => window.location.href = 'home.html'}
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
                                        <button
                                            onClick={() => updateAvailability(hospital.id, 'available')}
                                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 text-lg shadow-lg"
                                        >
                                            <i className="fas fa-check mr-2"></i>
                                            Available
                                        </button>
                                        <button
                                            onClick={() => updateAvailability(hospital.id, 'busy')}
                                            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 text-lg shadow-lg"
                                        >
                                            <i className="fas fa-times mr-2"></i>
                                            Busy
                                        </button>
                                        <button
                                            onClick={() => updateAvailability(hospital.id, 'unknown')}
                                            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 text-lg shadow-lg"
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
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Admin />);
