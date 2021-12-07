import { useState, useEffect } from 'react';
import Job from './Job';

function JobList({ jobs }) {
    const [filter, setFilter] = useState('All');
    const [jobApplications, setJobApplications]  = useState([]);

    useEffect( () => {
        const newJobApplication = [];
        for (let currJobKey in jobs) {
            const currJob = jobs[currJobKey];
            if (filter === 'All' || currJob.status === filter) {
                newJobApplication.push(<Job key={currJob.id} job={currJob} />);
            }
        }
        setJobApplications(newJobApplication);
      }, [filter, jobs]
    );

    return (
        <div className="jobList">
            <h1>Job Applications</h1>

            <div className="bottomLine tabs">
                <button className={ filter === "All" ? "All" : "inactive" } 
                    onClick={ (e) => setFilter(e.target.value) } value="All">All</button>
                <button className={ filter === "Applied" ? "Applied" : "inactive" } 
                    onClick={ (e) => setFilter(e.target.value) } value="Applied">Applied</button>
                <button className={ filter === "In-Interview" ? "In-Interview" : "inactive" } 
                    onClick={ (e) => setFilter(e.target.value) } value="In-Interview">In Interview</button>
                <button className={ filter === "Offer" ? "Offer" : "inactive" } 
                    onClick={ (e) => setFilter(e.target.value) } value="Offer">Offer</button>
                <button className={ filter === "Declined" ? "Declined" : "inactive" } 
                    onClick={ (e) => setFilter(e.target.value) } value="Declined">Declined</button>
            </div>

            <div>
                <span>Company</span>
                <span>Date Applied</span>
                <span>Job Title</span>
                <span>Status</span>
            </div>
            {Object.keys(jobApplications).length === 0 ? <p className="centerText">No job applications.</p>:<p></p>} 
            <ul>{jobApplications}</ul>
        </div>
    );
}

export default JobList;
