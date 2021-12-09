# Job Application Tracker

Job Application Tracker is a simple SPA web application created with Node.js and React.

To run the application: 
```
git clone git@github.com:seainfo6250/student--viobai.git
cd student--viobai/final
npm install
```

To run in prod, ```npm run build``` and ```npm start``` then go to http://localhost:4000/.
 
To run in dev, ```npm start``` and ```npm run dev``` (in a second console) then go to http://localhost:3000/.

## About

#### Logging In
> To view the job applications, user must first log into the app.
* A valid username can be consisted of any alphanumerics and/or special characters. 
* A username cannot be blank or equal to the word "**null**" (case matters).

#### Viewing the Job Application List
> After logging in, the page will display a list of the job applications saved under the current username.
* Each job application has the following fields
  * **Company**: name of the company
  * **Date Applied**: date when the job was applied
  * **Job Title**: name of the job position, it may or may not be a hyperlink depending on the user input
  * **Status**: status of the job application (`applied`, `in interview`, `offer`, `decline`)
  * **Note Section**: this section displays only if it is not empty
* A new username will have one sample application for easier demonstration purpose.
* User can view job applications under a specific **Status** by using the tabs above the list.

#### Adding a Job Application
> User can add a new job application by filling the form on the left of the list. Input fields are listed below.
* **Company**
  * cannot be empty 
* **Job Title**
  * cannot be empty 
* **Date Applied**
  * cannot be empty 
  * must be in the `mm/dd/yyyy` format
  * the year must be equal or greater than 2000
* **Link**
  * must be a valid full url (including http or https)
* **Notes To Self**
  * no requirement 

#### Deleting a Job Application
> A job application can be deleted by clicking the red arrow button on the right.

## Image Credit
Both images below are used on the login page.
* https://www.canva.com/media/MAD3uhqkUEI Guy with Paper on Computer
* https://www.canva.com/media/MAD3ujn-lz0 Woman on Computer
