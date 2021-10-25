"use strict";
const game = require('./game');
let games = {};

function addNewGuessFromUser({ username, guess, secretWord }) {
    const guessMatch = game.getMatch(secretWord, guess);
    const lowerCaseUsername = username.toLowerCase();
    if (/^\d+$/.test(guessMatch)) { // increment count only if guessMatch is a integer >= 0
        games[lowerCaseUsername]['validGuessCount']++;
    }
    if (guessMatch == 10) { // placeholder integer to indicate exact match (game winning)
        games[lowerCaseUsername]['won'] = true;
        games[lowerCaseUsername]['prevGuesses'].push({ guess, guessMatch: 'Correct!' });
    } else {
        games[lowerCaseUsername]['prevGuesses'].push({ guess: guess, guessMatch });
    }
}

function startNewGameByUser({ username }) {
    const secretWord = game.pickWord();
    games[username.toLowerCase()] = { prevGuesses: [], secretWord: secretWord, won: false, validGuessCount: 0 };
    console.info(`The secret word for user '${username}' is '${secretWord}'.`)
}

function getSavedGameByUser({ username }) {
    const lowerCaseUsername = username.toLowerCase();
    if (!games[lowerCaseUsername]) {
        startNewGameByUser({ username: username });
    }
    return games[lowerCaseUsername];
}

const storedGames = {
    games,
    addNewGuessFromUser,
    startNewGameByUser,
    getSavedGameByUser,
};

module.exports = storedGames;
