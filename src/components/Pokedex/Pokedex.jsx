import React from 'react'
import Search from '../Search/Search'
import "./Pokedex.css"

function Pokedex() {
  return (
    <div className='Pokedex-Wrapper'>
        <h1 id='text-heading'>Pokedex</h1>
        <Search/>
    </div>
  )
}

export default Pokedex