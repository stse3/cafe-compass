import {useState, useEffect} from 'react';
import CafeList from '../components/cafe/CafeList.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import useLocation from '../hooks/useLocation.js';
import {cafeService} from '../services/cafe-service.js'; //import cafe service for API calls
//getNearby, searchCafes
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function CafeListing () {
    const [mode, setMode] = useState('nearby');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const  {location, error:locationError, loading:locationLoading} = useLocation();
    const location = { latitude: 43.6532, longitude: -79.3832 } //FOR TESTING
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [cafes, setCafes] = useState([])

    //Call fetchNearbyCafes when component mounts or mode changes to nearby
    useEffect(()=>{
        if (mode==='nearby') {
            fetchNearbyCafes();
        }
    }, [mode]);
    const fetchNearbyCafes = async () => {
        setIsLoading(true);
        setError(false);
        if (location.latitude && location.longitude) { // Ensure location is available
            try {
                const response = await cafeService.getNearby(location.latitude, location.longitude);
                if (response && response.length > 0 ) {
                    setCafes(response);
                }
            } catch (error) {
                console.error("Error loading nearby cafes: ", error);
                setError(true);
            } finally {
                setIsLoading(false); // Reset loading after fetch
            }
        }

    }
    const fetchSearchedCafes = async (query) => {
        setIsLoading(true);
        setError(false);
        //assume its always searching by name for now
        const params = {name: query}
        if (params){
            try {
                const response = await cafeService.searchCafes(params);
                setCafes(response);
                
            }catch (error) {
                console.error("Error fetching searched and filtered cafes: ",error);
                setError(true);
            } finally {
                setIsLoading(false)
            }
        }
    }
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (mode==="search" || query && query.length > 0) {
            setMode('search');
            fetchSearchedCafes(query);
        } else { //fix this to switch components later
            console.log("trying nearby")
            setMode('nearby');
            fetchNearbyCafes();
        }
    };
    
    //RENDERING THE UI
    return (<div>
    
        {/* Render SearchBar  */}
        <div>
                    <SearchBar placeholder="Searching cafe results..."
                        onSearch={handleSearch}  
                        
                    />
        </div>
            {/* Render cafes list when loading is complete and no error */}
            {!isLoading && !error && cafes.length > 0 && (
                <CafeList cafes={cafes} />

            )}

            {/* Render message if there are no cafes */}
            {!isLoading && !error && cafes.length === 0 && (
                <p>No cafes found.</p>
            )}
                    
    </div>)

}
