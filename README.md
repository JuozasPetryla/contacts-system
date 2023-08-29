# Teltonika contacts system

This is a contact management system for the companies administrator. Build with Vite + Vue. Pocketbase is used for the database and styled with Tailwind + Vue-material.

## Functionalities:

-Login (JWT are used for authentication).
-Filtering of contacts by company, office, division, department and group.
-Searching capabilities.
-Pagination.
-Changing number of contacs displayed.
-Deletion, editing and creation of contacts.
-Deletion, editing and creation of companies, offices, divisions, departments and groups.
-Creation of new admin accounts with specified editing rights.
-Editing admin account rights.

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

To access the database admin UI go to:
http://127.0.0.1:8090/_/
