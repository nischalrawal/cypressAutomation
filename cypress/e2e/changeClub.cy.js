describe("uatSuperAdmin", () => {
  it("Test1", () => {
    const URL = "https://uatsuperadmin.hoslog.jp/";
    const username = "superadmin";
    const password = "Test@123";
    const userXpath = '//input[@id="Username"]';
    const passXpath = '//input[@id="Password"]';
    const buttonXpath = '//form[@role="form"]//a//button';
    const iXpath = "//tbody/tr[5]/td[3]/div[1]/i[1]";
    const insideXpath = "//tbody/tr[2]/td[3]/div[1]/i[1]";
    const groupaddXpath = "//tbody/tr[1]/td[7]/div[1]/i[1]";
    const button = 'div[onclick="ManageHomePageRequest()"]';

    cy.visit(URL); // Visit URl

    cy.xpath(userXpath) // Input username
      .click()
      .type(username);

    cy.xpath(passXpath) // Input Password
      .click()
      .type(password);

    cy.xpath(buttonXpath) //Click Login Button
      .click();

cy.get("a[href='/BasicClubManagement/BasicClubManagementList']").click(); // click basic store management

cy.get("#default-search").click().type("Bad club");










  });
});
