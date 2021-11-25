import Task from './Task';

function TodoList({ todos }) {
    
    const tasks = [];
    // console.log(todos);
    for (let currTaskKey in todos) {
        const currTask = todos[currTaskKey];
        tasks.push(<Task
            key={currTask.id}
            id={currTask.id}
            task={currTask.task}
            done={currTask.done}/>
        );
    }

    return (
        <div className="todoList">
            <h2>To Do List</h2>
            <span>Done</span>
            <span>Task</span>
            {Object.keys(todos).length === 0 ? <p className="centerText">No upcoming tasks.</p>:<p></p>} 
            <ul>{tasks}</ul>
        </div>
    );
}

export default TodoList;