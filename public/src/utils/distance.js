// Distance calculation using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Distance in km, rounded to 1 decimal
};

// Format timestamp to relative time
export const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
};

// Get status styling and text
export const getStatusInfo = (status) => {
    switch(status) {
        case 'available':
            return { color: 'text-green-600 bg-green-100 border-green-200', text: 'Available', icon: 'check-circle' };
        case 'busy':
            return { color: 'text-red-600 bg-red-100 border-red-200', text: 'Busy', icon: 'times-circle' };
        default:
            return { color: 'text-gray-600 bg-gray-100 border-gray-200', text: 'Unknown', icon: 'question-circle' };
    }
};
