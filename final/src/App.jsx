import { useEffect, useReducer } from 'react';
import { fetchSession, fetchLogin, fetchLogout, fetchJobs, fetchDeleteJob, fetchAddJob, fetchUpdateJob } from './utils/services';
import { reducer, initialState } from './reducers/app-reducer';
import { getErrorMessage } from './utils/errors';
import JobListContext from './contexts/JobListContext';
import Login from './Login';
import MainPage from './MainPage';
import './App.css';

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  function handleLogin(username) {
    fetchLogin(username)
    .then( jobs => {
      dispatch({ type: 'login', username, jobs});
    })
    .catch( err => {
      console.log(err.error);
      if (err.error === 'auth-insufficient') {
        dispatch({ type: 'showError', error: `Username cannot be 'null'.` });
      } else {
        dispatch({ type: 'showError', error: getErrorMessage({type: 'login'})});
      }
    });
  }

  function handleLogout() {
    fetchLogout()
    .then( () => {
      dispatch({ type: 'logout'});
    })
    .catch( err => {
      console.log(err.error);
      dispatch({ type: 'showError', error: getErrorMessage({type: 'logout'})});
    });
  }

  function handleNewJob(company, title, date, link, note) {
    fetchAddJob({ company, title, date, link, note })
    .then( result => {
      dispatch({ type: 'addJob', newJob: result});
    })
    .catch( err => {
      console.log(err.error);
      dispatch({ type: 'showError', error: getErrorMessage({ type: 'addJob', title, company })});
    });
  }

  function handleRemoveJob(id, title, company) {
      fetchDeleteJob(id)
      .then(() => {
        dispatch({ type: 'removeJob', id});
      })
      .catch(err => {
        console.log(err.error);
        dispatch({ type: 'showError', error: getErrorMessage({ type: 'removeJob', title, company })});
      });
  };

  function handleUpdateJobStatus(id, company, title, status) {
    const jobToUpdate = state.jobs[id];
    jobToUpdate.status = status;
    fetchUpdateJob(id, jobToUpdate)
    .then(() => {
      dispatch({ type: 'updateJobStatus', id, status });
    })
    .catch( err => {
      console.log(err.error);
      dispatch({ type: 'showError', error:  getErrorMessage({ type: 'updateJob', title, company })});
    });    
  };

  useEffect( () => {
    fetchSession()
    .then( session => {
      fetchJobs()
      .then( jobs => {
        dispatch({ type: 'login', username: session.username, jobs })
      })
      .catch( err => {
        console.log(err.error);
        dispatch({ type: 'showError', error: getErrorMessage({ type: 'retrieveJobs'})});
      });
    })
    .catch( err => {
      console.log(err.error);
      if (err.error !== 'auth-missing') {
        dispatch({ type: 'showError', error: getErrorMessage({ type: 'retrieveSession'})});
      }
    });
  }, []);

  return (
    <div className="App">
      {state.username && !state.isLoaded && <span>Retrieving...</span>}
      <JobListContext.Provider value={{
        handleLogin,
        handleLogout,
        handleNewJob,
        handleRemoveJob,
        handleUpdateJobStatus
      }}>
        {state.username && state.isLoaded && 
          <MainPage username={state.username} jobs={state.jobs} error={state.error} />
        }
        {!state.username && <Login error={state.error}/>} 
      </JobListContext.Provider>
    </div>
  );
}

export default App;
