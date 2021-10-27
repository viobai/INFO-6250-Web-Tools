"use strict";
(function iife() {

    const errorToMessage = {
        'require-login': '',
        'empty-username': 'Username cannot be empty.',
        'dog-username': 'Username cannot be "dog".',
        'invalid-username': 'Username can only contain characters and digits.',
        'network-error': 'There has been a network error. Please try again.',
    };

    const loginPanelEl = document.querySelector('#login-panel');
    const loginButtonEl = document.querySelector('#loginButton');
    const loginInputEl = document.querySelector('#usernameInput');
    const logoutPanelEl = document.querySelector('#logout-panel');
    const logoutButtonEl = document.querySelector('#logoutButton');
    const loggedinUserEl = document.querySelector('#loggedInUser');
    const errorMessageEl = document.querySelector('#errorMessage');
    
    addAbilityToLogin();
    addAbilityToLogout();

    verifyUserLogin()
        .then( response => showLogoutPanel(response.username) )
        .catch( err => {
            showLoginPanel();
            renderErrorMessage(err);
        });

    function verifyUserLogin() {
        return fetch('/home', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .catch( () => Promise.reject({ error: 'network-error' }))
        .then( response => {
            if (response.ok) {  return response.json(); }
            return response.json().then( err => Promise.reject(err) )
        });
    }

    function loginUser( username ) {
        return fetch('/home', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username: username }),
       })
       .catch( () => Promise.reject({ error: 'network-error' }))
       .then( response => {
           if (response.ok) { return response.json(); }
           return response.json().then( err => Promise.reject(err));
        });
    }

    function logoutUser() {
        return fetch(`/home`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .catch( () => Promise.reject({ error: 'network-error' }))
        .then( response => {
            if (response.ok) { return response.json(); }
            return response.json().then( err => Promise.reject(err));
        });
    }

    function showLoginPanel() {
        hideErrorMessage();
        logoutPanelEl.classList.add('hidden');
        loginPanelEl.classList.remove('hidden');
    }

    function showLogoutPanel( username ) {
        hideErrorMessage();
        loginPanelEl.classList.add('hidden');
        logoutPanelEl.classList.remove('hidden');
        loggedinUserEl.innerHTML = username;
    }

    function addAbilityToLogin() {
        loginButtonEl.addEventListener('click', () => { 
            const username = loginInputEl.value;
            loginInputEl.value = '';
            loginUser(username)
            .then(() => showLogoutPanel( username ))
            .catch(err => renderErrorMessage(err));
        });
    }

    function addAbilityToLogout() {
        logoutButtonEl.addEventListener('click', (e) => {
            logoutUser()
            .then(() => showLoginPanel())
            .catch(err => renderErrorMessage(err));
        });
    }

    function renderErrorMessage( err ) {
        errorMessageEl.classList.remove('hidden');
        errorMessageEl.innerHTML = errorToMessage[err.error] || '';
    }

    function hideErrorMessage() {
        errorMessageEl.classList.add('hidden');
    }
})();
