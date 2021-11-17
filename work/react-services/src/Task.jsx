
function Task({ id, task, done, removeTask, handleDone }) {
    function handleRemoveTask() {
        removeTask(id, task);
    };

    function handleOnChange() {
        handleDone(id, !done);
    }

    return (
        <li>
            <label>
                {done ? 
                <input type="checkbox" onChange={handleOnChange} checked />
                :
                <input type="checkbox" onChange={handleOnChange} />
                }
            </label>
            <span className={done ? "done" : ""} >{task}</span>
            <div>
                <button className="removeBtn" onClick={handleRemoveTask}>X</button>
            </div>
        </li>
    );
}

export default Task;
