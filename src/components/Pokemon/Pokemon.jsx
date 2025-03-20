import React from 'react'
import "./Pokemon.css"

function Pokemon({name,image}) {
  return (
    <>
    <div className='Pokemon'>
    <div className='pookie-name'>{name}</div>
    <div><img className='pokemon-image' src={image} /></div>
    </div>
    
    </>
  )
}

export default Pokemon