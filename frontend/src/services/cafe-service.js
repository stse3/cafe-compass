import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const cafeService = {
    getNearby: async (lat, lng, radius) => {
        try {
            const response = await axios.get(`${API_URL}/cafes/nearby`, {
                params: { lat, lng, radius }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching nearby cafes:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response from server. Please check your connection and try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Request error: ${error.message}`);
            }
        }
    },

    searchCafes: async (filters) => {
        try {
            const response = await axios.get(`${API_URL}/cafes/search`, {
                params: filters
            });
            return response.data;
        } catch (error) {
            console.error('Error searching cafes:', error);
            if (error.response) {
                throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection and try again.');
            } else {
                throw new Error(`Request error: ${error.message}`);
            }
        }
    },
    
    getDetails: async (cafeId) => {
        try {
            // Fixed the string interpolation syntax here (was using {API_URL} instead of ${API_URL})
            const response = await axios.get(`${API_URL}/cafes/${cafeId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cafe details:', error);
            if (error.response) {
                throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection and try again.');
            } else {
                throw new Error(`Request error: ${error.message}`);
            }
        }
    }
    
};