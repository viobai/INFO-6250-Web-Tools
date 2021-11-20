import React from 'react';
import compare from './compare';

const secretWord = "RECAT";

export default function Result({ prevGuess }) {
    const trimmedGuess = prevGuess.trim();
    if (trimmedGuess.length !== 5) {
        return (
            <div>
                <p><strong>'{prevGuess}'</strong> is not a valid word! Please enter a word with 5 characters.</p>
            </div>
        )
    } else if (trimmedGuess.toUpperCase() === secretWord) {
        return (
            <div className="win">
                <p><strong >'{prevGuess}'</strong> is the secret word!</p>
            </div>
        );
    }

    const matchingLettersCount = compare(prevGuess);
    return (
        <div>
            <p><strong>'{prevGuess}'</strong> has <strong>{matchingLettersCount}</strong> letters in common.</p>
        </div>
    );
}
