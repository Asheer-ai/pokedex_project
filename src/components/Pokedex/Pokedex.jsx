import React from "react";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  return (
    <div className="pokedex-wrapper">
      <h1 id="text-heading">Pokédex</h1>
      <Search />
    </div>
  );
}

export default Pokedex;
