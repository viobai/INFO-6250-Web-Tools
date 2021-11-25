import { useState, useContext } from 'react';
import JobListContext from './JobListContext';
import loginImg from './images/loginImage.png';

function Login({ error }) {
    const [usernameInput, setUsernameInput] = useState('');
    const { handleLogin } = useContext(JobListContext);

    function onSubmit(e) {
        e.preventDefault();
        const trimmedUsernameInput = usernameInput.trim();
        if (!trimmedUsernameInput) {
            return;
        }
        handleLogin(trimmedUsernameInput);
    }

    return (
        <div className="loginPageContainer">
            <div className="loginPage">
                <div className="verticalLineRight">
                    <img className="loginImg" src={loginImg} alt=""/>
                </div>
                
                <div className="login" >
                    <h1>Job Application Tracker</h1>
                    <form onSubmit={onSubmit}>
                        <label>Username</label><br/>
                        <input id="usernameInput" name="username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                        <input type="submit" id="loginBtn" value="Login"/>
                        {error && <p className="errorMsg">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default Login;
