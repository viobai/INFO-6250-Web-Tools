import { useContext } from 'react';
import JobListContext from './JobListContext';

function Job({ job }) {
    const { handleRemoveJob, handleUpdateJobStatus } = useContext(JobListContext);
    return (
        <li key={job.id}>
            <span>{job.company}</span>
            <span>{job.date}</span>
            <span>
                { job.link ? <a href={job.link} target="_blank" rel="noreferrer">{job.title}</a> : job.title }
            </span>
            <span>
                <select name="status" id="status-select" className={job.status} value={job.status} 
                    onChange={ (e) => handleUpdateJobStatus(job.id, job.company, job.title, e.target.value) }>
                    <option value="Applied">Applied</option>
                    <option value="In-Interview">In Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Declined">Declined</option>
                </select>
            </span>
            <div>
                <button id="removeBtn" onClick={() => handleRemoveJob(job.id, job.title, job.company)}>X</button>
            </div>
            <p className="notes">{job.note}</p>
        </li>
    );
}

export default Job;
