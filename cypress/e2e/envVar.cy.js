describe('Environment Variables', () => {
  it('Accessing through cyppress.env.js', () => {


      // const baseURL = Cypress.env('baseURL');
      // const credentials = Cypress.env('credentials');


      // cy.visit(baseURL);
    
      // cy.get("#Username").type(credentials.username);
      // cy.get("#Password").type(credentials.password);

      // cy.get("form[role='form'] a button").click();


      // For Different Environemnts

      const devEnvrionment = Cypress.env('adminDev');
      const stagingEnvironment = Cypress.env('adminStaging');

      cy.visit(stagingEnvironment.BaseURL);

      cy.get("#Username").type(devEnvrionment.Username);
      cy.get("#Password").type(devEnvrionment.Password);
      

      
      cy.get("form[role='form'] a button").click();



  })
})