"use strict";

module.exports = compare;

function compare( guess ) {
  let charFrequencyInWord = { 'R': 1, 'E': 1, 'A': 1, 'C': 1, 'T': 1};
  let commonCharactersCount = 0;
  const upperCaseGuess = guess.toUpperCase();
  for (let char of upperCaseGuess) {
    if (upperCaseGuess[char] > 0) {
      commonCharactersCount++;
      charFrequencyInWord[char]--;
    }
  }

  return commonCharactersCount;
}
