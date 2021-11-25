const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

const jobs = require('./src/models/jobs');
const sessions = require('./src/models//sessions');
const users = require('./src/models//users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

function getSidAndUsername(request) {
  const sid = request.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  return {sid, username};
}

// Sessions
app.get('/api/session', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'null') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, jobs.makeJobList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getJobs());
});

app.delete('/api/session', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

// Jobs
app.get('/api/jobs', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getJobs());
});

app.post('/api/jobs', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { company, date, title, link, note } = req.body;
  if(!company || !date || !title ) {
    res.status(400).json({ error: 'required-inputs' });
    return;
  }
  const jobList = users.getUserData(username);
  const id = jobList.addJob({ company, date, title, link, note });
  res.json(jobList.getJob(id));
});

app.patch('/api/jobs/:id', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { company, date, title, status, link, note } = req.body;
  const jobList = users.getUserData(username);
  if(!jobList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
    return;
  }
  jobList.updateJob(id, { company, date, title, status, link, note });
  res.json(jobList.getJob(id));
});

app.delete('/api/jobs/:id', (req, res) => {
  const { sid, username } = getSidAndUsername(req);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const jobList = users.getUserData(username);
  const exists = jobList.contains(id);
  if(exists) {
    jobList.deleteJob(id);
  }
  res.json({ message: exists ? `job ${id} deleted` : `job ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
