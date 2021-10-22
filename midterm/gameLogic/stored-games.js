"use strict";
const game = require('./game');
let games = {};

function addNewGuessFromUser({ username, guess, secretWord }) {
    const guessMatch = game.getMatch(secretWord, guess);
    if (/^\d+$/.test(guessMatch)) { // increment count only if guessMatch is a integer >= 0
        games[username.toLowerCase()]['validGuessCount']++;
    }
    if (guessMatch == 10) { // placeholder integer to indicate exact match (game winning)
        games[username.toLowerCase()]['won'] = true;
        games[username.toLowerCase()]['prevGuesses'].push({ guess, guessMatch: 'Correct!' });
    } else {
        games[username.toLowerCase()]['prevGuesses'].push({ guess: guess, guessMatch });
    }
}

function startNewGameByUser({ username }) {
    const secretWord = game.pickWord();
    games[username.toLowerCase()] = { prevGuesses: [], secretWord: secretWord, won: false, validGuessCount: 0 };
    console.info(`The secret word for user '${username}' is '${secretWord}'.`)
}

function getSavedGameByUser({ username }) {
    if (!games[username.toLowerCase()]) {
        startNewGameByUser({ username: username });
    }
    return games[username.toLowerCase()];
}

const storedGames = {
    games,
    addNewGuessFromUser,
    startNewGameByUser,
    getSavedGameByUser,
};

module.exports = storedGames;
