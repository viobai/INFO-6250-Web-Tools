"use strict";
(function iife() {
    const loginFormEl = document.querySelector('#loginForm');
    const loginInputEl = document.querySelector('#username');
    const invalidLoginMessageEl = document.querySelector('#invalidLoginMessage');

    addAbilityToShowInvalidLoginMessage();
 
    function addAbilityToShowInvalidLoginMessage() {
        loginFormEl.addEventListener('submit', (e) => {
            const username = loginInputEl.value.trim();
            console.log(username);
            if (!/^[a-z0-9]+$/i.test(username) || username === 'dog' || !username) {
                e.preventDefault();
                invalidLoginMessageEl.style.display = 'block';
            } else {
                invalidLoginMessageEl.style.display = 'none';
            }
        });
    };
})();
