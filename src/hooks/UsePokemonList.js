import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url,type){
     // const [pokemonList, setpokemonList] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const [pokedex_url, setpokedex_url] = useState('https://pokeapi.co/api/v2/pokemon')
    // const [next_url, setnext_url] = useState('');
    // const [prev_url, setprev_url] = useState('');

    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isloading:true,
        pokedex_url:url,
        next_url:'',
        prev_url:''
    });

    async function Pokemons() {
        // setLoading(true);
        setPokemonListState({...pokemonListState,isloading:true});

        const response = await axios.get(pokemonListState.pokedex_url); //this downloads list of 20 pokemons
        const PokemonResults = response.data.results;//we will get an array of Pokemons from result

        console.log("response is",response.data.pokemon);
        console.log(pokemonListState)
        setPokemonListState((state)=>({
            ...state,
            next_url:response.data.next,
            prev_url:response.data.previous
        }));
        if(type){
            setPokemonListState((state)=>({
                ...state,
                pokemonList: response.data.pokemon.slice(0,5)
            }))
        }else{
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
        
        setPokemonListState((state)=>({
            ...state,
            pokemonList:pokemonResult,
            isloading:false
        }));
        }

        
        
    }

    useEffect(() => {
        Pokemons();
    }, [pokemonListState.pokedex_url]);

    return [pokemonListState,setPokemonListState]

}

export default usePokemonList;