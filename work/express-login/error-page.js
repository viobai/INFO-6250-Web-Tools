const errorPage = {
    render: function(errorCode, errorMessage, isLoggedIn) {
        return `
            <!doctype html>
            <html>
            <head>
                <link type="text/css" href="styles.css" rel="stylesheet">
                <title>Word Storage</title>
            </head>
            <body>
                <div class="">
                    <h1>${errorCode}</h3>
                    <p>${errorMessage}</p>
                    <p>Go back to <a href="/">${isLoggedIn ? "home" : "login"} page</a>.</p>
                </div>
            </body>
            </html>
        `;
    }
  };
  
module.exports = errorPage;
