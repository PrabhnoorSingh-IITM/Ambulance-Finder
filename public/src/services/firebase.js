import React from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { getFunctions } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-functions.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUkNwf9TklqtndzzTqtLmadflsMgc2380",
  authDomain: "smart-ambulance-finder.firebaseapp.com",
  projectId: "smart-ambulance-finder",
  storageBucket: "smart-ambulance-finder.appspot.com",
  messagingSenderId: "1001766044880",
  appId: "1:1001766044880:web:0ef411fa66cc2a2cd3cad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

// Get nearby hospitals from Cloud Function
export const getNearbyHospitals = async (latitude, longitude) => {
    try {
        const getNearbyHospitals = functions.httpsCallable('getNearbyHospitals');
        const result = await getNearbyHospitals({
            latitude: latitude,
            longitude: longitude
        });
        
        return result.data.hospitals || [];
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
    }
};

// Update hospital availability via Cloud Function
export const updateHospitalAvailability = async (hospitalId, availability) => {
    try {
        const updateHospitalAvailability = functions.httpsCallable('updateHospitalAvailability');
        const result = await updateHospitalAvailability({
            hospitalId: hospitalId,
            availability: availability
        });
        
        return result.data;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw error;
    }
};

// Export Firebase instances for direct use if needed
export { db, functions };
