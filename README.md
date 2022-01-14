# UI Tests using Cypress.io

This project contains UI tests written in Cypress.io that covers login functionality of [Shop Apotheke](https://www.shop-apotheke.com/nl/login.htm)

## Prerequisites

Node version 14 , npm version 7.5+ , Cypress 9+

## Setting up

 - Open the project folder in IDE.  
 - Install rest of the dependencies using: 
   `npm install`

## Environmental Variables

 User credentials are parameterized and are stored as Environmental Variables
 Requires following env variables in cypress.env.json in below path.
 Path : Shop-apotheke\cypress.env.json 

  `"USER_EMAIL"` : valid registered email for succesful login
  `"USER_PASSWORD"` : valid registered password for succesful login
  `"CUSTEMER_NUM"` : Kundennummer of the registered user. This will be generated after a succesful signup

 Initialize it with valid customer details as below:

    {    
       "USER_EMAIL" : "    ",
       "USER_PASSWORD": "   ",
       "CUSTEMER_NUM" : "   "
    }

## Protocols for Test Design

 - Follows the default folder structure provided by [Cypress.io.](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Folder-structure)
 - Actual test spec files reside in integration folder.
   Path : \cypress\integration\
 - Page Object pattern is implemented to create more descriptive and readable methods.
   These methods are added to the specific "page" which is under test. This makes code maintenance easy as they are all available in one single place.
   Path : \support\pages
 - Test data : Reads test data file using cy.fixture() and then aliasing it into a variable "`usersData`" in beforeEach().
   This makes test data file to be available for all spec files.
   Test data fixture resides in \cypress\fixtures\user.json
 - For security reasons, sensitive test data like user credentials that will be used across multiple spec files for testing subsequent business use cases are stored in   `cypress.env.json`.
   This eventually goes into Git hub encrypted secrets when tests are run using Github actions
 - Test logs : For more descriptive and custom logs, configured the `task` plugin event in `\plugins\index.js` 
   This can be used to print custom messages in console.
 - Instead of using arrow functions, traditional named functions are used. This is done to to be able to use `this.` which is not working with arrow functions

## Run Tests

1. Using Cypress GUI: 
   Under the project directory run the following npm command: 
    
  
    npm run cypress:open

2. Using CLI - Headless mode:
   Under the project directory run the following npm command:
 

   npm run cy:headless

3. Using CLI - Chrome browser:
   Under the project directory run the following npm command:
  

   npm run cy:chrome
