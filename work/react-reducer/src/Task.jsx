import { useContext } from 'react';
import TodoContext from './TodoContext';

function Task({ id, task, done }) {
    const { handleRemoveTask, handleDone } = useContext(TodoContext);

    return (
        <li key={id}>
            <label>
                <input type="checkbox" onChange={() => handleDone(id, task, !done)} checked={done} />
            </label>
            <span className={done ? "done" : ""} >{task}</span>
            <div>
                <button className="removeBtn" onClick={() => handleRemoveTask(id, task)}>X</button>
            </div>
        </li>
    );
}

export default Task;