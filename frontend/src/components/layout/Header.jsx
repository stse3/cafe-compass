import {Menu, X, ChevronDown} from 'lucide-react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "../common/Button";
import {useAuth} from '../../context/authContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {user,logOut,loading} = useAuth();
    const [authState,setAuthState] = useState('loading'); //loading, authenticated, unauthenticated

    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    
    const handleLogOut = () =>{
        logOut();
        navigate('/'); //navigates back to the home page
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const handleLogin = () => {
        navigate('/login');
    }
    
    //effect to manage the changing auth states

    useEffect(()=>{
        if (loading){
            setAuthState('loading');
        }else if (user && user.name){
            setAuthState('authenticated');
        }else{
            setAuthState('unauthenticated');
        }
        
    },[loading,user]);

    return (
        <header className=" flex items-center justify-between px-6 py-4 bg-transparent w-full">
            
            
            {/* Center navigation links*/}
            <div className="font-sans flex flex-row items-center justify-center gap-6 text-md">
                <a href="/">home</a>
                {/* search  */}
                <a href="/search">search</a>
                {/* your notebook */}
                <a href="#">notebook</a>
                <a href="/profile">profile</a>
            </div>
            
            {/* Login button */}
            <div className="flex items-center gap-3 min-w-[150px] justify-end">
                {authState==='loading' ? (
                    <div className="h-8 w-20 bg-gray-100 rounded animate-pulse"></div>
                ):authState==='authenticated'? (
                    <>
                    {user && user.name && (
                        <span >Welcome, {user.name}</span>
                    )}
                    <Button
                    type="logOut"
                    onClick={handleLogOut}
                    label="Log Out">     
                    </Button>
                    </>
                    
                ):(
                
                <Button
                    type="primary"
                    onClick={handleLogin}
                    label="Log In"
                ></Button>
                )}
            </div>
        </header>
    )
}