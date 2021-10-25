"use strict";
(function iife() {
    const loginFormEl = document.querySelector('#loginForm');
    const loginInputEl = document.querySelector('#username');
    const invalidLoginMessageEl = document.querySelector('#invalidLoginMessage');

    addAbilityToShowInvalidLoginMessage();
 
    function addAbilityToShowInvalidLoginMessage() {
        loginFormEl.addEventListener('submit', (e) => {
            const username = loginInputEl.value.trim();
            if (!username || !/^[a-z0-9]+$/i.test(username) || username === 'dog') {
                e.preventDefault();
                invalidLoginMessageEl.style.display = 'block';
            } else {
                invalidLoginMessageEl.style.display = 'none';
            }
        });
    };
})();
