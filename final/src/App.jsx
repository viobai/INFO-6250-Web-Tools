import { useEffect, useReducer } from 'react';
import { fetchSession, fetchLogin, fetchLogout, fetchJobs, fetchDeleteJob, fetchAddJob, fetchUpdateJob } from './services';
import { reducer, initialState } from './reducer';
import JobListContext from './JobListContext';
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
        dispatch({ type: 'showError', error: `Username cannot be 'null'.`});
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
      dispatch({ type: 'showError', error: `Unexpected error while logging out. Please try again.`});
    });
  }

  function handleNewJob(company, title, date, link, note) {
    fetchAddJob({ company, title, date, link, note })
    .then( result => {
      dispatch({ type: 'addJob', newJob: result});
    })
    .catch( err => {
      console.log(err.error);
      dispatch({ type: 'showError', error: `Unexpected error while adding the new job '${title}' 
                 at '${company}'. Please try again.`});
    });
  }

  function handleRemoveJob(id, title, company) {
      fetchDeleteJob(id)
      .then(() => {
        dispatch({ type: 'removeJob', id});
      })
      .catch(err => {
        console.log(err.error);
        dispatch({ type: 'showError', error: `Unexpected error while removing the job '${title}' 
                   at '${company}'. Please try again.`});
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
      dispatch({ type: 'showError', error: `Unexpected error while updating the job '${title}' 
                 at '${company}' as done. Please try again.`});
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
        dispatch({ type: 'showError', error:`Unexpected error while retrieving user's saved jobs. 
                   Please try login again.`});
      });
    })
    .catch( err => {
      console.log(err.error);
      if (err.error !== 'auth-missing') {
        dispatch({ type: 'showError', error:`Unexpected error while retrieving your login status. 
                   Please refresh the page.`});
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
