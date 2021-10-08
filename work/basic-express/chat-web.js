const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <link type="text/css" href="styles.css" rel="stylesheet">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              <div class="subpanel">
                <h3>Users</h3>
                ${chatWeb.getUserList(chat)}
              </div>
              <div class="subpanel">
                <h3>Chat Messages</h3>
                ${chatWeb.getMessageList(chat)}
              </div>
              <div class="subpanel">
                ${chatWeb.getOutgoing(chat)}
              </div>
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      Object.values(chat.messages).map( message => `
      <li>
        <div class="message">
          <span class="sender">${message.sender} </span><br>
          <span class="text">${message.text}</span>
        </div>
      </li>
    `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    return `
      <form action="/chat" method="post">
        <div class="hidden-input-group">
          <label for="username">Username</label><br>
          <input name="username" id="username" type="hidden text" value="Bao">
        </div>
        <div class="input-group">
          <label for="text">New Message</label><br>
          <input name="text" id="text" type="text" placeholder="message" required>
        </div>
        <input type="submit" value="Send">
      </form>
    `;
  }
};
module.exports = chatWeb;
