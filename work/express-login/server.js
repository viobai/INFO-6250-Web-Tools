const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const session = require('./session');
const storedWords = require('./stored-words');
const dataPage = require('./data-page');
const loginPage = require('./login-page');
const errorPage = require('./error-page');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const { error } = req.body;
  if (!sid || error) {
    res.send(loginPage.login({error: error}));
  } else {
    const username = session.getUsernameBySessionId({ sid: sid });
    const word = storedWords.getWord({ username: username });
    res.send(dataPage.dataPage( word ? word : "", username ));
  };
});

app.post('/storeword', express.urlencoded({ extended: false }), (req, res) => {
  const { newWord } = req.body;
  const username = session.getUsernameBySessionId({ sid: req.cookies.sid });
  storedWords.updateWord({ username: username, word: newWord });
  res.redirect('/');
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  const username = req.body.username.trim();
  if (username === 'dog' || !username || !/^[A-Za-z0-9]+$/.test(username)) {
    res.send(errorPage.render(401, 'Username cannot be empty, "dog", or consisting of non-alphanumeric elements.', false));
    return;
  }

  const sid = uuidv4(username);
  res.cookie('sid', sid);
  session.addSession({ sid: sid, username: username});
  res.redirect('/');
})

app.get('/logout', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  res.clearCookie('sid');
  session.removeSession({ sid: sid });
  res.redirect('/');
});

app.get('/*', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  res.send(errorPage.render(404, 'This page does not exist.', sid));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
