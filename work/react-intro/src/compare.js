const word = 'RECAT';

export default function compare( guess ) {
  let charFrequencyInWord = {};
  for (let char of word) {
    charFrequencyInWord[char] = (charFrequencyInWord[char] + 1) || 1;
  }
  
  let commonCharactersCount = 0;
  const upperCaseGuess = guess.toUpperCase();
  for (let char of upperCaseGuess) {
    if (charFrequencyInWord[char] > 0) {
      commonCharactersCount++;
      charFrequencyInWord[char]--;
    }
  }
  
  return commonCharactersCount;
}
