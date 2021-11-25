import { useState, useContext } from 'react';
import JobList from './JobList';
import JobListContext from './JobListContext';

function MainPage({ username, jobs, error }) {
    const { handleLogout, handleNewJob } = useContext(JobListContext);
    const [newCompany, setNewCompany] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newNote, setNewNote] = useState('');
    const [inputError, setInputError] = useState('');

    function onSubmitLogout(e) {
        e.preventDefault();
        handleLogout();
    }

    function validateInputLink(link) {
        const urlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
        return urlRegEx.test(link.toLowerCase());
    }

    function onSubmitJob(e) {
        e.preventDefault();
        const trimmedNewCompany = newCompany.trim();
        const trimmedNewTitle = newTitle.trim();
        const trimmedNewDate = newDate.trim();
        const trimmedNewLink = newLink.trim();
        const trimmedNewNote = newNote.trim();
        if (!trimmedNewCompany || !trimmedNewDate || !trimmedNewTitle) {
            setInputError('Required fields cannot be empty.');
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/2\d{3}$/.test(trimmedNewDate)) {
            setInputError('Please verify the "Date Applied" input to be valid and in the mm/dd/yyyy format.');
            return;
        }
        if (trimmedNewLink && !validateInputLink(trimmedNewLink)) {
            setInputError('Please enter a valid URL including http/https.');
            return;
        }
        
        handleNewJob(trimmedNewCompany, trimmedNewTitle, trimmedNewDate, trimmedNewLink, trimmedNewNote);
        setNewCompany('');
        setNewTitle('');
        setNewDate('');
        setNewLink('');
        setNewNote('');
        setInputError('');
        console.log(jobs);
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
                        <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)}/>
                    </label><br/>
                    <label>Job Title <span className="red">*</span><br/>
                        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    </label><br/>
                    <label>Date Applied <span className="red">*</span><br/>
                        <input value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="mm/dd/yyyy"/>
                    </label><br/>
                    <label>Link<br/>
                        <input value={newLink} onChange={(e) => setNewLink(e.target.value)}/>
                    </label><br/>
                    <label>Notes To Self<br/>
                        <textarea rows = "5" cols="23" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                    </label><br/>
                    <input type="submit" id="submitBtn" value="Add"/>
                    {inputError && <p className="errorMsg">{inputError}</p>}
                </form>
                
                <JobList jobs={jobs} />
            </div>
            
        </div>
    );
}

export default MainPage;