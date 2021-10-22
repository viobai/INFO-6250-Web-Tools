"use strict";
const loginPage = {
    login: function({ statusCode }) {
        return `
            <!doctype html>
            <html>
            <head>
                <link type="text/css" href="styles.css" rel="stylesheet">
                <title>Word Guessing Game Login</title>
            </head>
            <body>
                <div class="loginPage center border">
                    <form action="/login" method="post" id="loginForm">
                        <h2 class="center centerText">Word Guessing Game</h2>
                        <div class="center">
                            <label for="username" class="largeText">Username</label><br>
                            <input name="username" id="username" type="text" class="largeText">
                        </div>
                        <span id="invalidLoginMessage" class="colorText">
                            Username cannot be empty, "dog", or including any non-alphanumeric elements.
                        </span>
                        <span id="requireLoginMessage" class="colorText ${ statusCode === 401 ? "show" : "" }">
                            Please log in to start or continue the game.
                        </span>
                        <input class="button" value="Log In" type="submit">
                    </form>
                </div>
            </body>
            <script src="login-warning-message.js"></script>
            </html>
        `;
    }
};
  
module.exports = loginPage;
