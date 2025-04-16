import axios from 'axios';
    
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`

export const userService = {

    getCurrentUser: async() => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                withCredentials: true,
            });
            return response.data;

        }catch (error){
            console.error('Error fetching user: ', error);
            throw new Error('Not authenticated');
        }
    }

}
