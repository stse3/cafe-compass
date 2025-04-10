import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cafes';

export const cafeService = {
    getNearby: async (lat, lng, radius) => {
        const response = await axios.get(`${API_URL}/cafes/nearby`, {
            params: {lat,lng, radius}
        });
        return response.data;
    },
    searchCafes: async (query) => {
        const response = await axios.get(`${API_URL}/cafes/search`, {
            params: {query}
        })
        return response.data;
    },

    getDetails: async (cafeId) => {
        const response = await axios.get(`{API_URL}/cafes/${cafeId}`);
        return response.data;
    }
}