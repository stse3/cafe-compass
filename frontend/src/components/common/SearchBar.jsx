import {useState,useEffect} from 'react';
import {Search} from 'lucide-react'
//search bar can be reused across different API calls
//Keeps UI seperate from search logic, uses props for flexibility 
//utility  function - for debouncing search input --> to avoid calling search function on each keystroke

export default function SearchBar ({searchInput, setSearchInput, placeholder}){

    return ( 
        <div >
            <input
                type="text"
                value={searchInput}
                onChange={(e)=> setSearchInput(e.target.value)}
                placeholder={placeholder}
                className="font-sans bg-gray-100 rounded-xl px-6 py-3"
            
            ></input>
            
        </div>
    )

}