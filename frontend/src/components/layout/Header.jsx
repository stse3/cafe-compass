import {Menu, X, ChevronDown} from 'lucide-react';
import {useState} from 'react';
import Button from "../common/Button";
export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }


    return (
        <header className="bg-white shadow-md mb-5 flex items-center justify-between px-6 py-4">

                {/* logo name */}
                <a href="/" className="font-pixel text-3xl">Cafe Compass</a>

                    <div className="flex flex-row items-center justify-center gap-20 text text-md">
                        <a href="/">home</a>
                        {/* search  */}
                        <a href="/search">search</a>
                        
                        {/* your notebook */} 
                        <a href="#">cafe diary</a>

                        {/* sign in - turn this into a button later */}
                    </div>
                    <div >
                        <Button
                            label="Sign Up"
                            
                        ></Button>
                    </div>

    

        </header>
    
    
       )

}