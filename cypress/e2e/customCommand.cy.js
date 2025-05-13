// describe('customCommands', () => {
//   it('Auth', () => {

//     cy.visit("https://uatsuperadmin.hoslog.jp/");

//     cy.login();
//     cy.edit();

//   })
// })
describe("customCommands", () => {
  let rowsLength;

  before(() => {
    cy.task('readXlsx', {
      file: "cypress/fixtures/test.xlsx",
      sheet: "Sheet1"
    }).then((rows) => {
      rowsLength = rows.length;
      cy.writeFile("cypress/fixtures/test.json", { rows });
    });
  });

  it("Read and use Excel data", () => {
    cy.readXlsx("Test", "Sheet1").then((data) => {
      data.forEach((row) => {
        console.log("Excel Row:", row);
        // Example: use row.name, row.email, etc.
        cy.visit("https://uat-admin.hoslog.jp/");

        cy.login();
        cy.edit();

        cy.get('#ClubName1').type(row.storeName);
        cy.get('#ClubName2').type(row.nameFurigana);
        cy.get('#ClubName').type(row.English);
        cy.get('#Description').type(row.Explanation);
        
        cy.get('[name = "CoverPhoto_Certificate"]').selectFile("cypress/fixtures/attack.jpeg", {force : true});
        cy.get('[name = "Logo_Certificate"]').selectFile("cypress/fixtures/guts.jpeg", {force : true});

        cy.get('#file_name_logo').attachFile("attack.jpeg");
        cy.get('#file_name_cover').attachFile("guts.jpeg");

        cy.get("#ceoFullName").type(row.represenName);
        cy.get('#CeoFurigana').type(row.repFurigana);

        cy.xpath("//div[@class='number-input w-full']//input[@id='MobileNumber']").type("09012345672");
        cy.get("[name='Email']").eq(1).type("nis@gmail.com");

        cy.get('#nextBtn').click();
        
        
      });
    });
  });
});
