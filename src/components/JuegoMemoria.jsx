import { useState, useEffect } from 'react'
import Tablero from './Tablero'
import Confetti from 'react-confetti'
import '../css/JuegoMemoria.css'


const emojisList = [...'🐶🐱🐭🐹🐴🦄🐝🐛']

function JuegoMemoria() {
  const [shufleMemoria, setShuffleMemoria] = useState([]);
  const [selectedCarta, setSelectedCarta] = useState(null);
  const [animation, setAnimation] = useState(false);
  /*mensaje de juego completado */
  const [gameCompleted, setGameCompleted] = useState(false);

  /* lluia de estrellas */

  useEffect(() => {
    const shufleEmojiList = shuffleArray([...emojisList, ...emojisList]);
    setShuffleMemoria(shufleEmojiList.map( (emoji, i) => ({index: i, emoji, flipped: true})));
    setTimeout(() => {
      setShuffleMemoria(shufleMemoria => shufleMemoria.map(carta => ({ ...carta, flipped: false })));
    }, 1800);
  }, []);

  const shuffleArray = a => {
    for (let i = a.length -1; i > 0; i-- ){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a ;
  }


  

  const handleMemoriaClick = carta => {
    const flippedCarta = {...carta, flipped: true};
    let shuffledCartasCopy = [...shufleMemoria];
    shuffledCartasCopy.splice(carta.index, 1, flippedCarta);
    setShuffleMemoria(shuffledCartasCopy);
    if(selectedCarta === null){
      setSelectedCarta(carta);
    }else if (selectedCarta.emoji === carta.emoji) {
      setSelectedCarta(null)
    }else {
      setAnimation(true);
      setTimeout(() => {
        shuffledCartasCopy.splice(carta.index, 1, carta);
        shuffledCartasCopy.splice(selectedCarta.index, 1, selectedCarta);
        setShuffleMemoria(shuffledCartasCopy);
        setSelectedCarta(null);
        setAnimation(false);
      }, 1000);
    }
    const flippedCartas = shuffledCartasCopy.filter(carta => carta.flipped);
  if (flippedCartas.length === shufleMemoria.length) {
    setGameCompleted(true);
  }
  }

  const resetGame = () => {
    const shufleEmojiList = shuffleArray([...emojisList, ...emojisList]);
    setShuffleMemoria(shufleEmojiList.map( (emoji, i) => ({index: i, emoji, flipped: true})));
    setTimeout(() => {
      setShuffleMemoria(shufleMemoria => shufleMemoria.map(carta => ({ ...carta, flipped: false })));
    }, 1800);
    setGameCompleted(false);
  }

  return (
    <div className="JuegoMemoria">
      <Tablero memoria={shufleMemoria} animation={animation} handleMemoriaClick={handleMemoriaClick} />
      {gameCompleted && (
        <div className="message-container">
          <h2>Juego completado!</h2>
          <button className='btnReinicio' onClick={resetGame}>Reiniciar juego</button>
          <div className="confetti-container">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={600}
          gravity={0.3}
        />
      </div>
          </div>
        
      )}
    </div>
  );
}

export default JuegoMemoria