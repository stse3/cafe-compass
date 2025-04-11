import {useState, useEffect} from 'react';
import CafeList from '../components/cafe/cafeList.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import useLocation from '../hooks/useLocation.js';
import {cafeService} from '../services/cafe-service.js'; //import cafe service for API calls
//getNearby, searchCafes

export default function CafeListingPage () {
    const [mode, setMode] = useState('nearby');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const  {location, error:locationError, loading:locationLoading} = useLocation();
    const location = { latitude: 43.6532, longitude: -79.3832 } //FOR TESTING
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [cafes, setCafes] = useState([])

    const fetchNearbyCafes = async () => {
        setIsLoading(true);
        setError(false);
        setError(false);
        if (location.latitude && location.longitude) { // Ensure location is available
            try {
                const response = await cafeService.getNearby(location.latitude, location.longitude);
                setCafes(response);
            } catch (error) {
                console.error("Error loading nearby cafes: ", error);
                setError(true);
            } finally {
                setIsLoading(false); // Reset loading after fetch
            }
        }

    }
    const fetchSearchedCafes = async (query) => {
        console.log("ITS HAPPENING")
        setIsLoading(true);
        setError(false);
        //assume its always searching by name for now
        const params = {'name': query}
        if (params){
            try {
                const response = await cafeService.searchedCafes(params);
                console.log(response)
                setCafes(response);
            }catch (error) {
                console.error("Error fetching searched and filtered cafes: ",error);
                setError(true);
            }
        }
    }
    const handleSearch = () => {
        console.log('handleSearch called with mode:', mode, 'and query:', searchQuery);
        if (mode ==="nearby") {
            fetchNearbyCafes();

        }else if (mode ==="search"){
            fetchSearchedCafes(searchQuery);
        }
    }
    
    //RENDERING THE UI
    return (<>

        {/* Render SearchBar  */}
        <div>
                    <SearchBar placeholder="Searching cafe results by name..."
                        searchInput = {searchQuery}
                        setSearchInput={setSearchQuery}
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
                    
    </>)

}
