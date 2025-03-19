import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const[pokemonList,setpokemonList]=useState([]);
    const[loading,setLoading]=useState(true);

    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon'

    async function Pokemons() {
        const response=await axios.get(POKEDEX_URL); //this downloads list of 20 pokemons
        const PokemonResults=response.data.results;//we will get an array of Pokemons from result
        const PookieResultPromise=PokemonResults.map((pokemon)=>axios.get(pokemon.url));//iterating over the array of pokemons,and using their url, to create an array of promises
        //that will download those 20 pokemons
        
        //passing that promise array to axios.all
        const pokemonData=await axios.all(PookieResultPromise);

        //now iterate on the data of each pokemon and extract id,name,image,types
        const pokemonResult=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shinny,
                types:pokemon.types
            }
        })
        console.log(pokemonResult);
        setpokemonList(pokemonResult);
        setLoading(false);
    }

    useEffect(()=>{
        Pokemons();
    },[]);

    

    return (
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            {(loading) ? "Downloading..":
            pokemonList.map((p)=>(
                <Pokemon name={p.name} image={p.image} key={p.id}/>)
            )
            }
        </div>
    )
}

export default PokemonList