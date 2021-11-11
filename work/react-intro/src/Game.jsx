function Game({ currGuess, setCurrGuess, setPrevGuess }) {

    const handleInput = (event) => {
        setCurrGuess(event.target.value);
    }

    function checkGuess(e) {
        e.preventDefault();
        setPrevGuess(currGuess);
        setCurrGuess('');
    }

    return (
        <div className="play">
            <form className="form">
                <label id="input-label">Your guess: </label>
                <input type="text" id="guess-input" value={currGuess} onChange={handleInput} required/>
                <button onClick={checkGuess}>Submit</button>
            </form>
        </div>
    )
};
export default Game;
