import { selector as adminSelector } from "../support/selector/adminSelector";
import { selector as ownerSelector } from "../support/selector/ownerSelector";
import { selector as customerSelector } from "../support/selector/customerSelector";




describe('dynamic Envrionment Variable', () => {
  it('Dynamic Varibales', () => {

    // const panel =Cypress.env("uat").adminUrl; // Set panel from CLI
    const panel =Cypress.env('panel'); // Set panel from CLI
    const env = Cypress.env('environment'); // Set panel from CLI
    const userIndex = Cypress.env('userIndex') || 0;
    // const userIndex = Cypress.env('userIndex');

    console.log(panel);
    console.log(env);
    console.log(userIndex);



    const mapSelector = {
      Admin : adminSelector,
      Owner : ownerSelector,
      Customer : customerSelector
    };

    

    const config = Cypress.env(panel)[env];
    const baseURL = config.BaseURL;
    const users = config.Users;


    const selectedUsers = users[userIndex];

    cy.visit(baseURL);

    // cy.wait(5000);
    cy.get(element.usernameInput).type(selectedUsers.Username);
    cy.get(element.passwordInput).type(selectedUsers.Password);
    cy.get(element.loginButton).click();


    
  })
})


