import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setpokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pokedex_url, setpokedex_url] = useState('https://pokeapi.co/api/v2/pokemon')
    const [next_url, setnext_url] = useState('');
    const [prev_url, setprev_url] = useState('');

    async function Pokemons() {
        setLoading(true);
        const response = await axios.get(pokedex_url); //this downloads list of 20 pokemons
        const PokemonResults = response.data.results;//we will get an array of Pokemons from result

        setnext_url(response.data.next);
        setprev_url(response.data.previous)

        const PookieResultPromise = PokemonResults.map((pokemon) => axios.get(pokemon.url));//iterating over the array of pokemons,and using their url, to create an array of promises
        //that will download those 20 pokemons

        //passing that promise array to axios.all
        const pokemonData = await axios.all(PookieResultPromise);

        //now iterate on the data of each pokemon and extract id,name,image,types
        const pokemonResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shinny,
                types: pokemon.types
            }
        })
        console.log(pokemonResult);
        setpokemonList(pokemonResult);
        setLoading(false);
    }

    useEffect(() => {
        Pokemons();
    }, [pokedex_url]);



    return (
        <div className='pokemon-list-wrapper'>

            {loading ? (
                <div className="loading">Loading Pokémons...</div>
            ) : (
                <div className="pokemon-wrapper">
                    {pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} />
                    ))}
                </div>
            )}

            <div className='controls'>
                <button disabled={prev_url == null} onClick={() => setpokedex_url(prev_url)}>⬅ Previous</button>
                <button disabled={next_url == null} onClick={() => setpokedex_url(next_url)}>Next ➡</button>
            </div>
        </div>
    )
}

export default PokemonList