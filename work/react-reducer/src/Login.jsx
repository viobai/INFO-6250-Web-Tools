import { useState, useContext } from 'react';
import TodoContext from './TodoContext';

function Login({ error}) {
    const { handleLogin } = useContext(TodoContext);
    const [username, setUsername] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (!username.trim()) {
            return;
        }
        handleLogin(username);
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
