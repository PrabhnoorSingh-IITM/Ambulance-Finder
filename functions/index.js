const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require('./service-account-key.json')),
    databaseURL: 'https://smart-ambulance-finder-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

// Get nearby hospitals Cloud Function
exports.getNearbyHospitals = functions.https.onCall(async (data, context) => {
    try {
        const { latitude, longitude } = data;
        
        // Get all hospitals from Firestore
        const hospitalsSnapshot = await db.collection('hospitals').get();
        const hospitals = [];
        
        hospitalsSnapshot.forEach(doc => {
            const hospital = doc.data();
            // Calculate distance using Haversine formula
            const distance = calculateDistance(
                latitude,
                longitude,
                hospital.latitude,
                hospital.longitude
            );
            
            hospitals.push({
                ...hospital,
                distance: distance,
                // Check data freshness - mark as unknown if older than 1 hour
                ambulanceAvailability: isDataFresh(hospital.lastUpdated) ? hospital.ambulanceAvailability : 'unknown'
            });
        });
        
        // Sort by distance
        hospitals.sort((a, b) => a.distance - b.distance);
        
        return { hospitals: hospitals };
    } catch (error) {
        console.error('Error in getNearbyHospitals:', error);
        throw new functions.https.HttpsError('internal', 'Error fetching hospitals');
    }
});

// Update hospital availability Cloud Function
exports.updateHospitalAvailability = functions.https.onCall(async (data, context) => {
    try {
        const { hospitalId, availability } = data;
        
        // Validate availability status
        const validStatuses = ['available', 'busy', 'unknown'];
        if (!validStatuses.includes(availability)) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid availability status');
        }
        
        // Update hospital in Firestore
        await db.collection('hospitals').doc(hospitalId).update({
            ambulanceAvailability: availability,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, message: 'Hospital availability updated successfully' };
    } catch (error) {
        console.error('Error in updateHospitalAvailability:', error);
        throw new functions.https.HttpsError('internal', 'Error updating hospital availability');
    }
});

// Seed initial data Cloud Function
exports.seedHospitals = functions.https.onCall(async (data, context) => {
    try {
        const initialHospitals = [
            {
                name: "AIIMS Delhi",
                latitude: 28.6368,
                longitude: 77.2090,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-11-26588500",
                ambulancePhone: "+91-11-26588500",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Safdarjung Hospital", 
                latitude: 28.6100,
                longitude: 77.2089,
                ambulanceAvailability: "busy",
                hospitalPhone: "+91-11-26702000",
                ambulancePhone: "+91-11-26702000",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Max Super Speciality Hospital",
                latitude: 28.6394,
                longitude: 77.2735,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-11-40404040",
                ambulancePhone: "+91-11-40404040",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Apollo Hospital",
                latitude: 28.5530,
                longitude: 77.2090,
                ambulanceAvailability: "unknown",
                hospitalPhone: "+91-11-26925001",
                ambulancePhone: "+91-11-26925001",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Fortis Escorts Heart Institute",
                latitude: 28.6331,
                longitude: 77.2188,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-11-42888888",
                ambulancePhone: "+91-11-42888888",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Sir Ganga Ram Hospital",
                latitude: 28.6314,
                longitude: 77.2159,
                ambulanceAvailability: "busy",
                hospitalPhone: "+91-11-42257000",
                ambulancePhone: "+91-11-42257000",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "BLK Super Speciality Hospital",
                latitude: 28.6363,
                longitude: 77.2010,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-11-26495050",
                ambulancePhone: "+91-11-26495050",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Indraprastha Apollo Hospital",
                latitude: 28.6448,
                longitude: 77.2133,
                ambulanceAvailability: "unknown",
                hospitalPhone: "+91-11-41755555",
                ambulancePhone: "+91-11-41755555",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }
        ];
        
        // Add to Firestore
        const batch = db.batch();
        initialHospitals.forEach((hospital, index) => {
            const docRef = db.collection('hospitals').doc(`hospital_${index + 1}`);
            batch.set(docRef, hospital);
        });
        
        await batch.commit();
        
        return { success: true, message: 'Hospitals seeded successfully' };
    } catch (error) {
        console.error('Error in seedHospitals:', error);
        throw new functions.https.HttpsError('internal', 'Error seeding hospitals');
    }
});

// Fetch nearby hospitals from OpenStreetMap Nominatim API
exports.fetchNearbyHospitalsOSM = functions.https.onCall(async (data, context) => {
    try {
        const { latitude, longitude } = data;
        
        // Call Nominatim API with proper User-Agent
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&amenity=hospital&limit=10&lat=${latitude}&lon=${longitude}`,
            {
                headers: {
                    'User-Agent': 'SmartAmbulanceFinder/1.0 (hackathon-demo@example.com)'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error('Nominatim API request failed');
        }
        
        const osmData = await response.json();
        
        // Transform OSM data to our format
        const hospitals = osmData.map(place => ({
            name: place.display_name.split(',')[0] || 'Unknown Hospital',
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
            ambulanceAvailability: "unknown",
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }));
        
        return { hospitals: hospitals };
    } catch (error) {
        console.error('Error in fetchNearbyHospitalsOSM:', error);
        throw new functions.https.HttpsError('internal', 'Error fetching hospitals from OpenStreetMap');
    }
});

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

// Check if data is fresh (less than 1 hour old)
function isDataFresh(lastUpdated) {
    if (!lastUpdated) return false;
    
    const now = new Date();
    const updatedAt = lastUpdated.toDate ? lastUpdated.toDate() : lastUpdated;
    const diffHours = (now - updatedAt) / (1000 * 60 * 60);
    
    return diffHours < 1;
}
