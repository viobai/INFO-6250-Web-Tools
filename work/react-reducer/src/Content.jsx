import { useState, useContext } from 'react';
import TodoContext from './TodoContext';
import TodoList from './TodoList';

function Content({ username, todos, error }) {
    const { handleLogout, handleNewTask } = useContext(TodoContext);
    const [newTask, setNewTask] = useState('');

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
                <button id="logoutBtn" onClick={handleLogout}> Logout</button>   
            </div>
            <br/>

            {error && <p className="errorMsg">{error}</p>}

            <form className="newTaskPanel" onSubmit={onSubmitTask}>
                <label>New Task</label>
                <input name="task" value={newTask} onChange={(e) => setNewTask(e.target.value)} required/>
                <input type="submit" id="submitBtn" value="Add"/>
            </form>

            <TodoList todos={todos}/>
        </div>
    );
}

export default Content;
