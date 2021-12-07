import { useReducer, useContext } from 'react';
import { reducer, initialState } from '../reducers/input-reducer';
import { getInputError } from '../utils/errors';
import JobList from './JobList';
import JobListContext from '../contexts/JobListContext';

function MainContent({ username, jobs, error }) {
    const { handleLogout, handleNewJob } = useContext(JobListContext);
    const [ state, dispatch ] = useReducer(reducer, initialState);

    function onSubmitLogout(e) {
        e.preventDefault();
        handleLogout();
    }

    function onSubmitJob(e) {
        e.preventDefault();
        const trimmedNewCompany = state.newCompany.trim();
        const trimmedNewTitle = state.newTitle.trim();
        const trimmedNewDate = state.newDate.trim();
        const trimmedNewLink = state.newLink.trim();
        const trimmedNewNote = state.newNote.trim();

        const inputError = getInputError(trimmedNewCompany, trimmedNewTitle, trimmedNewDate, trimmedNewLink);
        if (inputError) {
            dispatch({ type: 'setInputError', inputError});
        } else {
            handleNewJob(trimmedNewCompany, trimmedNewTitle, trimmedNewDate, trimmedNewLink, trimmedNewNote);
            dispatch({ type: 'clearInputFields' });
        }
    }

    return (
        <div className="mainPage">
            <div className="headerPanel">
                {error && <span className="errorMsg">{error}</span>}
                <span><strong>{username}</strong> ,</span>
                <button id="logoutBtn" onClick={onSubmitLogout}> Logout</button>   
            </div>
            <br/>
            
            <div className="mainPanel">
                <form className="newJobPanel verticalLineRight" onSubmit={onSubmitJob}>
                    <label>Company <span className="red">*</span><br/>
                        <input value={state.newCompany} onChange={(e) => dispatch({ type: 'setNewCompany', input: e.target.value})}/>
                    </label><br/>
                    <label>Job Title <span className="red">*</span><br/>
                        <input value={state.newTitle} onChange={(e) => dispatch({ type: 'setNewTitle', input: e.target.value})}/>
                    </label><br/>
                    <label>Date Applied <span className="red">*</span><br/>
                        <input value={state.newDate} onChange={(e) => dispatch({ type: 'setNewDate', input: e.target.value})} placeholder="mm/dd/yyyy"/>
                    </label><br/>
                    <label>Link<br/>
                        <input value={state.newLink} onChange={(e) => dispatch({ type: 'setNewLink', input: e.target.value})}/>
                    </label><br/>
                    <label>Notes To Self<br/>
                        <textarea rows = "5" cols="23" value={state.newNote} onChange={(e) => dispatch({ type: 'setNewNote', input: e.target.value})} />
                    </label><br/>
                    <input type="submit" id="submitBtn" value="Add"/>
                    {state.inputError && <p className="errorMsg">{state.inputError}</p>}
                </form>
                
                <JobList jobs={jobs} />
            </div>
            
        </div>
    );
}

export default MainContent;