import {useState,useEffect} from 'react';
import {Search} from 'lucide-react'
//search bar can be reused across different API calls
//Keeps UI seperate from search logic, uses props for flexibility 
//utility  function - for debouncing search input --> to avoid calling search function on each keystroke

export default function SearchBar ({placeholder ,onSearch}){
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
            onSearch(debouncedInput);
        }
        },[debouncedInput])


    return ( 
        <div className="bg-white flex flex-row rounded-3xl py-1.5 border border-charcoal w-96 gap-5 px-6 m-5 items-center">
            <Search strokeWidth={2} size={20}></Search>
            <input
                type="text"
                value={input}
                onChange={(e)=> handleChange(e.target.value)}
                placeholder={placeholder}
                className="outline-none"
                
                
            
            ></input>

            
        </div>
    )

}