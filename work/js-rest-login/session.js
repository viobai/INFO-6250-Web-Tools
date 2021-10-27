"use strict";
let sessions = {};

function validateUsername({ username }) {
  const lowercaseUsername = username.toLowerCase();
  if (!lowercaseUsername) {
    return { error: 'empty-username' };
  } else if ( !/^[A-Za-z0-9]+$/.test(lowercaseUsername) ) {
    return { error: 'invalid-username' };
  } else if (lowercaseUsername === "dog") {
    return { error: 'dog-username' };
  }
  return '';
}

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
  removeSession,
  validateUsername,
};

module.exports = session;
