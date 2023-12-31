# Teltonika contacts system

This is a contact management system for the companies administrator. Build with Vite + Vue. Pocketbase is used for the database and styled with Tailwind + Vue-material.
Link to site --> https://contacts-system.netlify.app/

## Functionalities:<br />

-Login (JWT are used for authentication).<br />
-Filtering of contacts by company, office, division, department and group.<br />
-Searching capabilities.<br />
-Pagination.<br />
-Changing number of contacs displayed.<br />
-Deletion, editing and creation of contacts.<br />
-Deletion, editing and creation of companies, offices, divisions, departments and groups.<br />
-Creation of new admin accounts with specified editing rights.<br />
-Editing admin account rights.<br />
-Uploading profile images.<br />

## Getting started

To install necessary packages, run this command:
`npm install `

To start your project:
`npm run dev`

To run the pocketbase server:

Navigate to pocketbase server folder
`cd pb_contacts_system-main`

Inside the folder run:
`./pocketbase serve`

Login for the super admin:

email: admin@gmail.com<br />
password: adminadmin<br />
