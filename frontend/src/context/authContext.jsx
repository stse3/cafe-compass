import {createContext, useContext, useState, useEffect} from 'react';
import {userService} from '../services/user-service';

//1. create the context
const AuthContext = createContext();

//2. make the custom hook - called to pull data out of the context
export function useAuth(){
    return useContext(AuthContext);
}

//3. make provider - stores and provides data, component that wraps the entire app 
export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    //use effect - to check login on load

    const fetchUser = async () => {
        try {
            const userData = await userService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            // Only set user to null if it's an auth error
            setUser(null);
            console.error('Auth error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])
    
    const logOut = async() =>{
        try{
            await userService.logOut();
            setUser(null);
        }catch (error){
            console.error('Error logging out:', error);
        }
    }

    return (

        <AuthContext.Provider value={{user, loading, logOut}}>
            {children}
        </AuthContext.Provider>
    )

}