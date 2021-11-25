const uuid = require('uuid').v4;

function makeJobList() {
  const jobList = {};
  const jobs = {
    ["testId"]: {
      id: "testId",
      company: "Amazon",
      date: "09/01/2021",
      title: "Software Engineer I",
      status: 'Applied',
      link: "https://www.amazon.jobs/en/job_categories/software-development",
      note: "Referred by alumni.",
    }
  };

  jobList.contains = function contains(id) {
    return !!jobs[id];
  };

  jobList.getJobs = function getJobs() {
    return jobs;
  };

  jobList.addJob = function addJob(newJob) {
    const id = uuid();
    jobs[id] = {
      id,
      company: newJob.company,
      date: newJob.date,
      title: newJob.title,
      status: 'Applied', // applied, in interview, declined, offer
      link: newJob.link,
      note: newJob.note
    };
    return id;
  };

  jobList.getJob = function getJob(id) {
    return jobs[id];
  };

  jobList.updateJob = function updateJob(id, job) {
    jobs[id].company = job.company || jobs[id].company;
    jobs[id].date = job.date || jobs[id].date;
    jobs[id].title = job.title || jobs[id].title;
    jobs[id].status = job.status || job.status;
    jobs[id].link = job.link || jobs[id].link;
    jobs[id].note = job.note || jobs[id].note;
  };


  jobList.deleteJob = function deleteJob(id) {
    delete jobs[id];
  };

  return jobList;
};

module.exports = {
  makeJobList,
};
