const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require('./service-account-key.json')),
    databaseURL: 'https://YOUR_PROJECT.firebaseio.com'
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
                hospitalPhone: "+91-9999426676",
                ambulancePhone: "+91-9999426675",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Safdarjung Hospital", 
                latitude: 28.6100,
                longitude: 77.2089,
                ambulanceAvailability: "busy",
                hospitalPhone: "+91-9999426678",
                ambulancePhone: "+91-9999426677",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Max Super Speciality Hospital",
                latitude: 28.6394,
                longitude: 77.2735,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-9999426680",
                ambulancePhone: "+91-9999426679",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Apollo Hospital",
                latitude: 28.5530,
                longitude: 77.2090,
                ambulanceAvailability: "unknown",
                hospitalPhone: "+91-9999426682",
                ambulancePhone: "+91-9999426681",
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            },
            {
                name: "Fortis Escorts Heart Institute",
                latitude: 28.6331,
                longitude: 77.2188,
                ambulanceAvailability: "available",
                hospitalPhone: "+91-9999426684",
                ambulancePhone: "+91-9999426683",
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
