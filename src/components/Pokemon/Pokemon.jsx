import React from 'react'
import "./Pokemon.css"
import { Link } from 'react-router-dom'

function Pokemon({name,image,id}) {
  return (
    <>
    <div className='Pokemon'>
      <Link to={`/pokemon/${id}`}>
        <div className='pookie-name'>{name}</div>
        <div><img className='pokemon-image' src={image} /></div>
      </Link>
    </div>
    
    </>
  )
}

export default Pokemon