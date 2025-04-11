import {useState, useEffect} from 'react';

export default function useLocation () {
    const [location, setLocation] = useState({latitude:null, longitude:null});
    const [error,setError] = useState(false);
    const [loading, setLoading] = useState(true);

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({longitude,latitude});
        setLoading(false);
    }
    function errorCallback() {
        setError(true);
        setLoading(false);
    }

    // calls location from browser
    useEffect (()=>{
        setLoading(true);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            }else {
                setError(true);
                setLoading(false);
            }
        }, [])
    return {location, error,loading};

}