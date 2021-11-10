"use strict";
const compare = require('./compare');
const wordList = require('../words');

function getMatch(gameSecretWord, guess) {
    if(exactMatch(gameSecretWord, guess)) {
        return 10; 
    }
    const match = compare(gameSecretWord, guess);
    return match;
}

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}

function pickWord() {
    const pickedWord = wordList[Math.floor(Math.random() * wordList.length)];
    return pickedWord;
}

const game = {
    getMatch,
    pickWord,
};

module.exports = game;
