const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const session = require('./userSession/session');
const storedGames = require('./gameLogic/stored-games');
const gamePage = require('./public/game-page');
const loginPage = require('./public/login-page');

app.use(express.static('./public'));
app.use(cookieParser());

// home page
app.get('/', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const username = session.getUsernameBySessionId({ sid: sid });
  if (!sid || !username || username.trim() === 'dog' || !/^[a-z0-9]+$/i.test(username)) {
    res.send(loginPage.login({  statusCode: "" }));
  } else {
    const { prevGuesses, validGuessCount, won } = storedGames.getSavedGameByUser({username: username });
    res.send(gamePage.gamePage( username, prevGuesses, validGuessCount, won ));
  };
});

// check new guess input from user
app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const username = session.getUsernameBySessionId({ sid: sid });
  const newGuess = req.body.newGuess.trim();
  if (!sid || !username || !newGuess ) {
    res.status(401).send(loginPage.login({ statusCode: 401 }));
  } else {
    const newGuess = req.body.newGuess.trim();
    const secretWord = storedGames.getSavedGameByUser({username: username}).secretWord;
    storedGames.addNewGuessFromUser({ username: username, guess: newGuess, secretWord: secretWord });
    res.redirect('/');
  }
});

// start new game
app.post('/new-game', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const username = session.getUsernameBySessionId({ sid: sid });
  if (!sid || !username) {
    res.status(401).send(loginPage.login({ statusCode: 401 }));
  } else {
    storedGames.startNewGameByUser({ username: username });
    res.redirect('/');
  }
});

// log in user by save session
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  const username = req.body.username.trim();
  if (username === 'dog' || !username || !/^[A-Za-z0-9]+$/.test(username)) {
    res.status(400).redirect('/');
    return;
  }
  const sid = uuidv4(username);
  res.cookie('sid', sid);
  session.addSession({ sid: sid, username: username});
  res.redirect('/');
})

// log out user by remove session
app.get('/logout', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  res.clearCookie('sid');
  session.removeSession({ sid: sid });
  res.redirect('/');
});

// redirect invalid address to home page
app.get('/*', express.urlencoded({ extended: false }), (req, res) => {
  res.redirect('/');
});

app.use(express.static('./public'));
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
