import React from "react";
import { useState } from "react";

export default function Searchbar({searches, setSearches}){

    function handleSearch(e){
        setSearches(e.target.value)
        console.log(searches)
    }

    return(
        <input type="text" value={searches} placeholder='buscar'  onChange={handleSearch}/>
    );
}