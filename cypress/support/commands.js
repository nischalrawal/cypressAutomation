import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// require('@cypress/xpath');

Cypress.Commands.add("readXlsx", (inputFile, sheetName) => {
    return cy.task('readXlsx', {
      file: `cypress/fixtures/${inputFile}.xlsx`,
      sheet: sheetName
    }).then((rows) => {
      return rows;
    });
  });


  Cypress.Commands.add("login", ()=>{
    
    const username = "superadmin"
    const password = "Test@123"

    cy.get("#Username").click().type(username);

    cy.get("#Password").click().type(password);

    cy.get("form[role='form'] a button").click({force : true});
  })


  Cypress.Commands.add("edit", ()=>{
    cy.get("a[href='/ClubManagement/ClubList']").click();
   

    cy.get("#add-new-id").click();
    
  })




