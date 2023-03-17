import React from 'react'
import '../css/Tablero.css'
import Cartas from './Cartas'

function Tablero({ animation, handleMemoriaClick, memoria}) {
  return (
    <main className='tablero'>
      {memoria.map( (memoria, i)=> {
        return <Cartas key={`${i}_${memoria.emoji}`} animation={animation} handleMemoriaClick={handleMemoriaClick} memoria={memoria}/>
      })}
    </main>
  )
}

export default Tablero