import {Menu, X, ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "../common/Button";
export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const handleLogin = () =>{
        navigate('/login');
    }

    return (
        <header className=" m-5 rounded rounded-xl shadow-md mb-5 flex items-center justify-between px-6 py-4">

                {/* logo name */}
                <a href="/" className="text-shadow-md font-pixel text-2xl">Cafe Compass</a>

                    <div className="font-sans flex flex-row items-center justify-center gap-20 text text-md">
                        <a href="/">Home</a>
                        {/* search  */}
                        <a href="/search">Search Cafes</a>
                        
                        {/* your notebook */} 
                        <a href="#">Cafe Diary</a>

                        {/* sign in - turn this into a button later */}
                    </div>
                    <div >
                        <Button
                            type="primary"
                            onClick={handleLogin}
                            label="Sign Up"
                        ></Button>
                    </div>

    

        </header>
    
    
       )

}