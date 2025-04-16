export default function ProfilePage() {
    
    const [user,setUser]= useState('');
    const fetchUser = async () => {
        try{
            const user = await userService.getCurrentUser();
            setUser(user);
        } catch (err){
            navigate('/login');
        }
    }
    //load userprofile when changes or added    
    useEffect(()=>{
        fetchUser();
    },[]) //no dependency --> no values to watch for changes

    return ( <div>


    </div>)
}