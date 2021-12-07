# Job Application Tracker

Job Application Tracker is a SPA web application created with Node.js and React.

To run the application: 
> 1. clone this repo
> 2. `npm install`
> 
> to run in dev:
>> 3. `npm start`
>> 4. `npm run dev` (in a second console)
>> 5. go to `http://localhost:3000/`
> 
> to run in prod:
>> 3. `npm start`
>> 4. go to `http://localhost:4000/`

## About

### Login
* To view the job applications, user must first log into the app.
* A valid username can be consisted of any alphanumerics and special characters. 
* A username cannot be blank or equal to the word `null` (case matters).

### Job Application List
> After logging in, the page will display a list of the job applications saved under the current username.
* Each job application has the following fields
  * Company: name of the company
  * Date Applied: date when the job was applied
  * Job Title: name of the job position, it may or may not include a link depending on the user input
  * Status: status of the job application (applied, in interview, offer, decline)
* User can view job applications under a specific **Status** by using the tabs above the list.

### To Add a Job Application
> User can add a new job application by filling the form on the left of the list. All fields with a red asterisk are required inputs.
* **Company**: cannot be empty
* **Job Title**: cannot be empty
* **Date Applied**: cannot be empty, the format must be in mm/dd/yyyy, the year must be equal or greater than 2000
* **Link**: can be empty, the format must be a valid full url (including http or https)
* **Notes** To Self: can be empty

## Image Credit

> https://www.canva.com/media/MAD3uhqkUEI Guy with Paper on Computer
> https://www.canva.com/media/MAD3ujn-lz0 Woman on Computer