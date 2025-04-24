import {useState,useEffect} from 'react';
import {useAuth} from '../context/authContext';
import {useNavigate} from 'react-router-dom';

export default function Profile() {
    const {user,logOut,loading} = useAuth();
    const navigate = useNavigate();
    const [isClient, setIsClient] = useState(false); //tracks if user signed in

    //mark when the component has mounted on client  
    //code runs after component mounts on client side 
   useEffect(()=>{
    setIsClient(true)
   },[])
    //use effect  --> navigate rather then doing this on render 
    useEffect(()=>{
        if (isClient && !loading && !user){
            navigate('/login')
        }
    },[loading,user,navigate])

     // Only render content if we have a user and we're on client-side
    if (!isClient || loading || !user) {
            return <div>Loading...</div>;
    }
    if (!user|| !user.name) {
        return (
            <div className="flex flex-col justify-center items-center">
            <div className="px-6 py-4 text-center">
                <h2 className="text-lg font-semibold mb-2">You're not logged in</h2>
                <p>Please log in to view your profile.</p>
            </div>
            </div>

        );
    }
    //
    const photoUrl = user.photo_url;

    return (
        <>  {/* profile information */}
            <div className="flex flex-row gap-6 px-6 py-4 m-5  border border-charcoal rounded-3xl bg-white shadow-md" >
              
                <div > 
                    {photoUrl ? (
                        <img 
                            className="w-50 h-25 rounded rounded-3xl" 
                            src={photoUrl} 
                            referrerPolicy="no-referrer"
                            onError={(e) => console.error("Image failed to load:", e)}
                        />
                    ) : (
                        <div className="w-25 h-10 rounded rounded-xl bg-gray-200 flex items-center justify-center">
                            No Image
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="font-bold text-lg">
                        {user?.name} 
                    </h2>
                </div>
            </div>
        </>
    );
}
    


