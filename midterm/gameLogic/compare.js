"use strict";
module.exports = compare;

function compare( word, guess ) {
  if (!/^[a-z]+$/i.test(guess)) {
    return 'Guess should include only letters.';
  }

  const charFrequencyInWord = {};
  const lowerCaseWord = word.toLowerCase();
  for (let char of lowerCaseWord) {
    charFrequencyInWord[char] = (charFrequencyInWord[char] + 1) || 1;
  }

  let commonCharactersCount = 0;
  const lowerCaseGuess = guess.toLowerCase();
  for (let char of lowerCaseGuess) {
    if (charFrequencyInWord[char] > 0) {
      commonCharactersCount++;
      charFrequencyInWord[char]--;
    }
  }

  return commonCharactersCount;
}
