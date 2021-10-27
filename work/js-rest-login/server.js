const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const session = require('./session');

app.use(express.static('./public'));
app.use(cookieParser());

// home page
app.get('/home', (req, res) => {
    const sid = req.cookies.sid;
    const username = session.getUsernameBySessionId({ sid: sid });
    if (!sid || !username) {
        res.status(401).json({ error: 'require-login' });
        return;
    }
    res.status(200).json({ username: username });
});

// log in user by save session
app.post('/home', express.json(), (req, res) => {
    const username = req.body.username.trim();
    const error = session.validateUsername({ username: username });
    if ( error ) {
        res.status(400).json(error);
        return;
    }
    const sid = uuidv4(username);
    res.cookie('sid', sid);
    session.addSession({ sid: sid, username: username});
    res.status(200).json({});
})

// log out user by remove session
app.delete('/home', express.urlencoded({ extended: false }), (req, res) => {
    const sid = req.cookies.sid;
    res.clearCookie('sid');
    session.removeSession({ sid: sid });
    res.status(200).json({});
});

app.use(express.static('./public'));
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
  