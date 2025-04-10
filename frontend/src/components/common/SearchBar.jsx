import {useState,useEffect} from 'react';
import {Search} from 'lucide-react'
//search bar can be reused across different API calls
//Keeps UI seperate from search logic, uses props for flexibility 
//utility  function - for debouncing search input --> to avoid calling search function on each keystroke

const useDebounce = (value,delay) => {
    const [debounceValue, setDebouncedvalue] = useState(value); //holds the final value after the delay 
    //hook runs everytime value or delay dependencies change
    useEffect (()=> {
        const handler = setTimeout(() => { //set to update debounceValue after a delay --> wait X amount of time
            setDebouncedvalue(value); //after user stops tying after delay, debounceValue is set to the value of the input 
        }, delay);
        return () => {
            clearTimeout(handler); //cleanup function to clear the timeout if value or delay changes before the timeout is reached
        };
    }, [value, delay]); //
}


export default function SearchBar ({onSearch,loading,placeholder}){
    const [inputValue, setInputValue]  = useState(''); 

    //use debounced input value for search
    const debouncedSearchQuery = useDebounce(inputValue, 500); //debounce search 
    useEffect ( ()=>{
        if (debouncedSearchQuery){
            onSearch(debouncedSearchQuery) //calls the external function after debounce
        }
    }, [debouncedSearchQuery, onSearch]); //call external search function when debounced query changes
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value); //update the input value as the user types 
    }
    return ( 
        <div className="font-sans bg-gray-100 rounded-xl">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={loading}//loading state 
            
            ></input>
            Hello
        </div>
    )

}