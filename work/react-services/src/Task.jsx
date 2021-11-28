
function Task({ id, task, done, handleRemoveTask, handleDone }) {
    function onRemoveTask() {
        handleRemoveTask(id, task);
    };

    function onTaskDoneUpdate() {
        handleDone(id, task, !done);
    }

    return (
        <li>
            <label>
                {done ? 
                <input type="checkbox" onChange={onTaskDoneUpdate} checked />
                :
                <input type="checkbox" onChange={onTaskDoneUpdate} />
                }
            </label>
            <span className={done ? "done" : ""} >{task}</span>
            <div>
                <button className="removeBtn" onClick={onRemoveTask}>X</button>
            </div>
        </li>
    );
}

export default Task;
