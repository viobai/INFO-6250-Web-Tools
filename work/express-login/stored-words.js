let words = {};

function updateWord({ username, word }) {
    words[username.toLowerCase()] = word;
}

function getWord({ username }) {
    return words[username.toLowerCase()];
}

const storedWords = {
    words,
    updateWord,
    getWord
};

module.exports = storedWords;
