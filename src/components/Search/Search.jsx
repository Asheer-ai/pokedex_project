import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

function Search({updateSearchTerm}) {
    const debouncedCallback=useDebounce((e)=>updateSearchTerm(e.target.value))
    return (
        <div className="search-wrapper">
            <div className="search-box">
                <input
                    id="pokemon-name-search"
                    type="text"
                    placeholder="Search for a Pokémon..."
                    onChange={debouncedCallback}
                />
                <FaSearch className="search-icon" />
                
            </div>
        </div>
    );
}

export default Search;
