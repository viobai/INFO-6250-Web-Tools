"use strict";
let sessions = {};

function getUsernameBySessionId({ sid }) {
  return sessions[sid];
}

function addSession({ sid, username }) {
  sessions[sid] = username;
}

function removeSession({ sid }) {
  delete sessions[sid];
}

const session = {
  sessions,
  getUsernameBySessionId,
  addSession,
  removeSession
};

module.exports = session;
