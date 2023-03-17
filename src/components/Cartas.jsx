import React from 'react'
import '../css/Cartas.css'
import blockfront from '../img/memo.png'

function Cartas({ animation, handleMemoriaClick, memoria}) {
  return (
    <div className='memoria' onClick={() => (!memoria.flipped && !animation) && handleMemoriaClick(memoria)}>
      <div className={`carta-block-inner ${memoria.flipped ? 'carta-block-flipped' : ''}`}>
        <div className='carta-block-front-contenedor'>   
            <img className='carta-block-front' src={blockfront} alt='block-front' /> 
          </div>
          <div className='carta-block-back'>
            {memoria.emoji}
          </div>
        </div>
    </div>
  )
}

export default Cartas
