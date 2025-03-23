import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/UsePokemonList';

function PokemonList() {
    const [pokemonListState,setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon',false)
    return (
        <div className='pokemon-list-wrapper'>

            {pokemonListState.isloading ? (
                <div className="loading">Loading Pokémons...</div>
            ) : (
                <div className="pokemon-wrapper">
                    {pokemonListState.pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>
                    ))}
                </div>
            )}

            <div className='controls'>
                <button disabled={pokemonListState.prev_url == null} onClick={() => setPokemonListState({...pokemonListState,pokedex_url:pokemonListState.prev_url})}>⬅ Previous</button>
                <button disabled={pokemonListState.next_url == null} onClick={() => setPokemonListState({...pokemonListState,pokedex_url:pokemonListState.next_url})}>Next ➡</button>
            </div>
        </div>
    )
}

export default PokemonList