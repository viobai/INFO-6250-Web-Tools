import { useState } from 'react';
import { fetchLogin } from './services';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (!username.trim()) {
            return;
        }
        fetchLogin(username)
        .then( todos => {
            setError('');
            onLogin({ username, todos });
        })
        .catch( e => {
            if (e.error === "auth-insufficient") {
                setError('Username cannot be dog.');
            }
        });
    }

    return (
        <form className="login" onSubmit={onSubmit}>
            <h2>To Do List</h2>
            <label>Username</label>
            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="submit" id="loginBtn" value="Login"/>
            {error && <p className="errorMsg">{error}</p>}
        </form>
    );
}

export default Login;
