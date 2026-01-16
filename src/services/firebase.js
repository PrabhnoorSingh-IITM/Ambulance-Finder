import React from 'react';

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
