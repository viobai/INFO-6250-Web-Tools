const loginPage = {
    login: function() {
        return `
            <!doctype html>
            <html>
            <head>
                <link type="text/css" href="styles.css" rel="stylesheet">
                <title>Word Storage Login</title>
            </head>
            <body>
            <div class="loginForm">
                <form action="/login" method="post">
                    <div class="">
                        <label for="username">Username</label><br>
                        <input name="username" id="username" type="text">
                    </div>
                    <input type="submit" value="Log In">
                </form>
            </div>
            </body>
            </html>
        `;
    }
  };
  
module.exports = loginPage;
  