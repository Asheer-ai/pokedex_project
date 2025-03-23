import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails({ pokemonName }) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPokemonDetails() {
    try {
      setLoading(true);
      setError(""); 

      let response;
      if(pokemonName){
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      }else{
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
      }
      const data = response.data;

      setPokemon({
        name: data.name,
        image: data.sprites.other?.dream_world.front_default || data.sprites.front_default,
        weight: data.weight,
        height: data.height,
        types: data.types.map((t) => t.type.name),
      });
    } catch (err) {
      setError("Failed to load Pokémon details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading Pokémon...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pokemon-details-wrapper">
      
      <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />

      <h2 className="pokemon-details-name">{pokemon.name}</h2>
      <div className="pokemon-info">
        <p><strong>Height:</strong> {pokemon.height} dm</p>
        <p><strong>Weight:</strong> {pokemon.weight} hg</p>
        <div className="pokemon-types">
          <strong>Type:</strong>
          {pokemon.types.map((type) => (
            <span key={type} className={`pokemon-type ${type}`}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;