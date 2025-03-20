import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search() {
    return (
        <div className="search-wrapper">
            <div className="search-box">
                <input
                    id="pokemon-name-search"
                    type="text"
                    placeholder="Search for a Pokémon..."
                />
                <FaSearch className="search-icon" />
            </div>
        </div>
    );
}

export default Search;
