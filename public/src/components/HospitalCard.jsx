import React from 'react';
import { getStatusInfo } from '../utils/distance';

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

export default HospitalCard;
