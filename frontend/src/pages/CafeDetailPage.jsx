import {useParams, useNavigate} from 'react-router-dom';
import {cafeService} from '../services/cafe-service';
import {useState, useEffect} from 'react';
import {CircleChevronLeft } from 'lucide-react'


export default function CafeDetail(){
    const {id} = useParams(); //grabs the id from the URL
    const [isLoading, setIsLoading] = useState("");
    const [error,setError] = useState('');
    const [cafeDetails, setCafeDetails] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchCafeDetails()

    },[id])
    const fetchCafeDetails = async () => {
        setIsLoading(true);
        setError(false);
        
        try {
            const response = await cafeService.getDetails(id);
            console.log("cafe details response", response);
                setCafeDetails(response);
        }catch (error){
            setError(true)
        }finally{
            setIsLoading(false)
        }
    }

    const handleBackToSearch = () =>{
        navigate('/search')
    }

    //make Cafe not found page later 
    if (!cafeDetails || Object.keys(cafeDetails).length === 0) {
        return <div className="p-4">Café not found ☕</div>;
      }
    return (
        <div className="p-4">
             {/* Back to search button */}
             <button 
                onClick={handleBackToSearch}
                className="m-5 text-charcoal"
            >
                <div className="flex flex-row gap-2"><CircleChevronLeft/> <p>back to search</p></div>
            </button>
            <div className="border border-charcoal rounded rounded-3xl h-auto w-124 p-32 flex flex-col justify-start">
            <h1 className="text-3xl font-bold">{cafeDetails.name}</h1>
            <p className="mt-2 text-gray-600">{cafeDetails.address}</p>

            </div>


        </div>
    )


}