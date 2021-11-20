import Game from './Game';
import Result from './Result';
import { useState } from 'react';
import './App.css';

function App() {
  const [currGuess, setCurrGuess] = useState();
  const [prevGuess, setPrevGuess] = useState('');

  return (
    <div className="App">
      <h2>Five Letters Word Guess Game</h2>
      <Game currGuess={currGuess} setCurrGuess={setCurrGuess} setPrevGuess={setPrevGuess} />
      {prevGuess && <Result prevGuess={prevGuess} />}
    </div>
  );
}

export default App;
