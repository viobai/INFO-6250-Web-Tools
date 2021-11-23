import { useState, useEffect, useReducer } from 'react';
import { fetchSession, fetchLogin, fetchLogout, fetchTodos, fetchDeleteTodo, fetchAddTodo, fetchUpdateTodo } from './services';
import { reducer, initialState } from './reducer';
import TodoContext from './TodoContext';
import Login from './Login';
import Content from './Content';
import './App.css';

function App() {
  const [ render, setRender ] = useState(false);
  const [ state, dispatch ] = useReducer(reducer, initialState);

  function handleLogin(username) {
    fetchLogin(username)
    .then( todos => {
      dispatch({ type: 'login', username, todos});
    })
    .catch( e => {
        if (e.error === "auth-insufficient") {
          dispatch({ type: 'showError', error: 'Username cannot be dog.'});
        }
    });
  }

  function handleLogout() {
    fetchLogout()
    .then( () => {
      dispatch({ type: 'logout'});
      setRender(true);
    })
    .catch( err => {
      dispatch({ type: 'showError', error: "Unexpected error while logging out. Please try again."});
    });
  }

  function handleDone(id, task, doneStatus) {
    const todoForUpdate = state.todos[id];
    todoForUpdate.done = doneStatus;
    fetchUpdateTodo(id, todoForUpdate)
    .then(() => {
      dispatch({ type: 'toggleTaskDone', id, doneStatus });
      setRender(true);
    })
    .catch((err) => {
      dispatch({ type: 'showError', error: `Unexpected error while checking the task '${task}' as done. Please try again.`});
    }); 
  };

  function handleNewTask(newTask) {
    fetchAddTodo(newTask)
    .then(() => {
      setRender(true);
    })
    .catch( err => {
      dispatch({ type: 'showError', error: `Unexpected error while adding the new task '${newTask}'. Please try again.`});
    });
  }

  function handleRemoveTask(id, task) {
      fetchDeleteTodo(id)
      .then(() => {
        setRender(true);
      })
      .catch((err) => {
        dispatch({ type: 'showError', error: `Unexpected error while removing the task '${task}'. Please try again.`});
      });
  };

  useEffect( () => {
    fetchSession()
    .then( session => {
      fetchTodos()
      .then( results => {
        dispatch({ type: 'login', username: session.username, todos: results, })
      })
      .catch( () => {
        dispatch({ type: 'showError', error: `Unexpected error while retrieving your to do list. Please try login again.`});
      });
    })
    .catch( e => {
      console.log(e.error);
    })
    .finally( () => {
      setRender(false);
    });
  }, [render]
  );

  return (
    <div className="App">
      {state.username && !state.isLoaded && <span>Retrieving...</span>}
      <TodoContext.Provider value={{
        handleLogin,
        handleLogout,
        handleNewTask,
        handleRemoveTask,
        handleDone
      }}>
        {state.isLoaded && state.username && 
        <Content username={state.username} todos={state.todos} error={state.error} />
        }
        {!state.username && <Login error={state.error}/>} 
      </TodoContext.Provider>
    </div>
  );
}

export default App;
