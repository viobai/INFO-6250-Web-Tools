import { useState, useEffect } from 'react';
import { fetchSession, fetchTodos, fetchDeleteTodo, fetchAddTodo, fetchUpdateTodo } from './services';
import './App.css';

import Login from './Login';
import Content from './Content';

function App() {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  function onLogin({ username, todos }) {
    setUsername(username);
    setTodos(todos);
  }

  function onLogout() {
    setUsername('');
    setTodos([]);
  }

  function handleDone(id, doneStatus) {
    const todoForUpdate = todos[id];
    todoForUpdate.done = doneStatus;
    fetchUpdateTodo(id, todoForUpdate)
    .then(() => {
      setIsLoading(true);
      setError('');
    })
    .catch((err) => {
      setError('Unexpected error while checking the task as done. Please try again.');
    });    
  };

  function handleNewTask(newTask) {
    fetchAddTodo(newTask)
    .then(() => {
      setError('');
    })
    .catch( err => {
      setError(`Unexpected error while adding the new task '${newTask}'. Please try again.`);
    });
    setIsLoading(true);
  }

  function removeTask(id, task) {
      fetchDeleteTodo(id)
      .then(() => {
        setIsLoading(true);
        setError('');
      })
      .catch((err) => {
        setError(`Unexpected error while removing the task '${task}'. Please try again.`);
      });
  };

  useEffect( () => {
    fetchSession()
    .then( session => {
      fetchTodos()
      .then( results => {
        setUsername(session.username);
        setTodos(results);
      })
      .catch( () => {
        setError(`Unexpected error while retrieving your to do list. Please try again.`);
      });
    })
    .catch( e => {
      console.log(e.error);
    })
    .finally( () => {
      setIsLoading(false);
    });
  }, [isLoading]
  );

  return (
    <div className="App">
      {isLoading && !username && <span>Retrieving...</span>}
      {!isLoading && username && 
        <Content username={username} todos={todos} onLogout={onLogout} error={error}
        removeTask={removeTask} handleDone={handleDone} handleNewTask={handleNewTask}/>}
      {!isLoading && !username && <Login onLogin={onLogin}/>}
    </div>
  );
}

export default App;
