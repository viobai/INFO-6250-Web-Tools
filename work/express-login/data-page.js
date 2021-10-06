const dataPage = {
  dataPage: function(word, username) {
    return `
      <!doctype html>
      <html>
        <head>
          <link type="text/css" href="styles.css" rel="stylesheet">
          <title>Word Storage</title>
        </head>
        <body>
          <div id="word-storage-app">
            <div class="display-panel">
              <div class="header-panel">
                <p>Logged in as <span id="username">${username}</span>, <a href="/logout">log out</a></p>
              </div>
              <div class="main-panel">
                <h3>Stored Word</h3>
                <p class="wordDisplay">${word}</p>
              </div>
              <div class="input-panel">
                ${dataPage.getOutgoing(word)}
              </div>
            </div>
          </div>
        </body>
      </html>
  `;
  },
  getOutgoing: function() {
    return `
      <form action="/storeword" method="post">
        <div class="formContent">
          <label for="newWord">New Word</label>
          <input name="newWord" id="newWord" type="text" required>
          <input type="submit" value="Update">
        </dim>
      </form>
    `;
  }
};
module.exports = dataPage;
