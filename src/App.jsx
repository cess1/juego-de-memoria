import { useState, useEffect } from 'react'
import './App.css'
import Tablero from './components/Tablero'

const emojisList = [...'🐶🐱🐭🐹🐴🦄🐝🐛']


function App() {
  /* guardar las imagenes desordenadas para que aprescan en sition aleatorios*/
  const [shufleMemoria, setShuffleMemoria] = useState([]);

  const [selectedCarta, setSelectedCarta] = useState(null);

  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const shufleEmojiList = shuffleArray([...emojisList, ...emojisList]);
    setShuffleMemoria(shufleEmojiList.map( (emoji, i) => ({index: i, emoji, flipped: false})));
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
  }

  return (
    <div className="App">
    <Tablero memoria = {shufleMemoria} animation={animation} handleMemoriaClick={handleMemoriaClick} />
    </div>
  )
}

export default App
