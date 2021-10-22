"use strict";
const wordList = require('../words');
const gamePage = {
    gamePage: function(username, prevGuesses, validGuessCount, won) {
      return `
        <!doctype html>
        <html>
          <head>
            <link type="text/css" href="styles.css" rel="stylesheet">
            <title>Word Guessing Game</title>
          </head>
          <body>
            <div id="word-guessing-game">
              <div>
                <div id="headerPanel" class="right">
                  <p>Logged in as <span>${username}</span>, <a href="/logout">log out</a></p>
                </div>

                <div id="titlePanel" class="panel border">
                  <h2 class="centerText">Word Guessing Game</h2>  
                </div>

                <div id="inputPanel" class="panel center centerText">
                  <div id="valid-words-subpanel">
                    <h3>Possible Words</h3>
                    ${gamePage.displayPossibleWords(wordList, prevGuesses)}
                  </div>       
                  ${won ? 
                    `<div id="winning-subpanel">
                      <span class="colorText centerText">You have won!</span>
                    </div>
                    ` : 
                    `<div>
                      ${gamePage.getGuess()}
                    </div>
                  `}
                  <form class="center" action="/new-game" method="post">
                    <input type="submit" value="New Game" class="button mediumText">
                  </form> 
                </div>

                <div id="prevGuessesPanel" class="panel center">
                  <p class="centerText boldText largeText">Valid Guess Count: ${validGuessCount}</p>
                  <ol>
                    <div>
                      <span class="boldText centerText">Guessed</span>
                      <span class="boldText centerText">Correct Letters Count</span>
                    <div><br/>
                    ${gamePage.displayPrevGuesses(prevGuesses)}
                  </ol>
                </div>
              </div>
            </div>
          </body>
        </html>
    `;
    },
    displayPossibleWords: function(wordList, prevGuesses) {
      return wordList.map((word) => {
        let guessed = prevGuesses.filter(guessed => guessed.guess === word).length > 0;
        return `
          <span class="${ guessed ? "guessed" : ""}">${word}</span>
        `;
      }).join('');
    },
    getGuess: function() {
      return `
        <form action="/guess" method="post">
          <div class="formContent centerText">
            <label for="guessInput" class="largeText">New Guess</label>
            <input name="newGuess" id="guessInput" class="largeText" type="text" pattern=".*\\S+.*" title="Please fill input with at least one letter." required>
            <input type="submit" id="guessButton" class="button mediumText" value="Enter">
          </div>
        </form>
      `;
    },
    displayPrevGuesses: function(prevGuesses) {
        if (!prevGuesses.length) {
          return ``;
        } 
        return prevGuesses.map((guess) => {
            return `
              <li>
                <span class="centerText">${guess.guess}</span> 
                <span class="${/^\d+$/.test(guess.guessMatch) ? "" : "colorText"} centerText">${guess.guessMatch}</span>
              </li>
            `;
        }).join('');
    }
  };

  module.exports = gamePage;
