import {useState,useEffect} from 'react';
import {Search} from 'lucide-react'
//search bar can be reused across different API calls
//Keeps UI seperate from search logic, uses props for flexibility 
//utility  function - for debouncing search input --> to avoid calling search function on each keystroke

export default function SearchBar ({placeholder ,handleFetch}){
     const [input,setInput] = useState('');
     const [debouncedInput, setDebouncedInput] = useState('')
 
    const handleChange = (val) => {
        setInput(val);
    }
    //Debounce Input Change
    useEffect (()=> {
        const timer = setTimeout(()=>{
            setDebouncedInput(input);
        },500)
        return () => clearTimeout(timer);//clear timer when if input changes before delay
    },[input])



    //Trigger parent fetch, when debounce input changes 
    useEffect(()=>
        {if (debouncedInput){
            handleFetch(debouncedInput);
        }
        },[debouncedInput])


    return ( 
        <div >
            <input
                type="text"
                value={input}
                onChange={(e)=> handleChange(e.target.value)}
                placeholder={placeholder}
                className="font-sans bg-gray-100 rounded-xl px-6 py-3"
                
            
            ></input>
            
        </div>
    )

}