import {Menu, X, ChevronDown} from 'lucide-react';


export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const navItems = [
        {title: "Home", link: '#'},
        {title: "Search Cafes", link: '#'},
        {title: "User Profile", link:'#'}
    ]
    return (
        <header className="bg-white shadow-md">
            <div></div>

        </header>
    
    
       )

}