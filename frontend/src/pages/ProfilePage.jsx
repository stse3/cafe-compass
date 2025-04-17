export default function ProfilePage() {
    //mock data

    const user ={
        name: "Sherry Tse",
        email: "sherry@email.com",
        photoUrl:"https://example.com/avatar.jpg"
    }
    //const [user,setUser]= useState('');

    const fetchUser = async () => {
        try{
            const user = await userService.getCurrentUser();
            setUser(user);
        } catch (err){
            navigate('/login');//if there isnt a logged in user 
        }
    }
    //load userprofile when changes or added    
    useEffect(()=>{
        fetchUser();
    },[]) //no dependency --> no values to watch for changes

    return ( <div>


    </div>)
}