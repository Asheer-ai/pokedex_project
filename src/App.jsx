import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonList from './components/PokemonList/PokemonList'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  
  return (
    <>
    <div className='Outer-Wrapper'>
    <h1 id="text-heading"><Link to='/'>Pokédex</Link></h1>
    <CustomRoutes/>
    </div>
    </>
  )
}

export default App
