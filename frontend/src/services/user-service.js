import axios from 'axios';
    
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const userService = {
    getCurrentUser: async () => {
        try {
            const response = await axios.get(`${API_URL}/user/getUserData`, {
                withCredentials: true,
            });
            return response.data; //user data
        }catch (err){
            console.error('Error fetching user data: ',err);
            throw err;
        }
    },
    logOut: async () => {
        try {
            await axios.get(`${API_URL}/auth/logout`, {
                withCredentials: true,
            });
            return true; // Indicate successful logout
        } catch (error) {
            console.error('Error during logout: ', error);
            throw error; // Propagate the error to the caller
        }
    }


}
