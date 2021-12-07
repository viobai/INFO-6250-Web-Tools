# Salad App

Salad app is a simple application created with Node.js and React.
To run the application, go in the `salad` directory and use these commands : `npm install` and then  `npm start`.

## About

Login : To be able to buy a salad, you should log-in to the app.
A valid username is required for you to login. The app does not accept blank usernames, special characters in the username.
The user `dog` is banned from using the application.
You can see who you are logged in as, on every page of the application.
After logging in, you can either buy from the salads you have already created or you can customize a new salad.

Customizing a salad : When you want to customize a new salad, a list of menu items will be displayed and you can add any number of items from the menu.
You should select at-least one item to proceed. Each item is $1.25 .
After you save the salad, total price of the salad will be displayed in the home page.

You can navigate to the previous page from every page.

## Components

* Login Page : Will ask you to enter your username. Displays an error if the username is not valid.

* Home Page :
    * If you have any saved salads :
      * It will display the `saved salads`
      * You can `remove` salads from this list, if you don't need it anymore.
      * Price of each salad will be displayed.
      * You have an option to `buy` the salad.
    * If you do not have any saved salads, an appropriate message will be displayed.
    * If you do not want to buy from the `saved salads`, you have an option to `make a new salad`.
    * There is an option to `log-out` from this page.

* Customize Page : You will see a list of items, that you can add to your salad. Select what you want and hit the `save` button.
If you press the save button without selecting anything, you will get an error message.
You can go back to the previous page from this page.

* Buy Page : Displays the order total & you can go back to the home page from this page.
## Image Credit

https://www.canva.com/media/MAD3uhqkUEI Guy with Paper on Computer
https://www.canva.com/media/MAD3ujn-lz0 Woman on Computer