import { useState } from 'react';
import TodoList from './TodoList';
import { fetchLogout } from './services';

function Content({ username, todos, onLogout, removeTask, handleDone, handleNewTask, error }) {
    const [newTask, setNewTask] = useState('');
    const [currError, setCurrError] = useState(error);

    function onSubmitLogout(e) {
        e.preventDefault();
        if (!username) {
            return;
        }
        fetchLogout()
        .then( () => {
            onLogout();
        })
        .catch( err => {
            console.log(err);
            setCurrError("Unexpected error while logging out. Please try again.");
        });
    }

    function onSubmitTask(e) {
        e.preventDefault();
        const trimmedNewTask = newTask.trim();
        if (!trimmedNewTask) {
            return;
        }
        handleNewTask(trimmedNewTask);
        setNewTask('');
    }

    return (
        <div className="content">
            <div className="headerPanel">
                <span><strong>{username}</strong> ,</span>
                <button id="logoutBtn" onClick={onSubmitLogout}> Logout</button>   
            </div>
            <br/>

            {currError && <p className="errorMsg">{currError}</p>}

            <form className="newTaskPanel" onSubmit={onSubmitTask}>
                <label>New Task</label>
                <input name="task" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                <input type="submit" id="submitBtn" value="Add"/>
            </form>

            <TodoList todos={todos} handleDone={handleDone} removeTask={removeTask}/>
        </div>
    );
}

export default Content;
