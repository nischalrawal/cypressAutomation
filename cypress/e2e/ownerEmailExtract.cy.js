// import { otpFromAdmin } from "../support/utils/otpFromAdmin";

describe("template spec", () => {
  it("passes", () => {
    cy.intercept("Post", "api/v1/register-club").as("postRegisterClub");
    cy.visit("https://uat-owner.hoslog.jp/register");
    cy.get("._agreeButton_dxr8h_8").click(); //using class

    //store information
    cy.get("#field-\\:r0\\:").type("Store Globe "); //using id
    //cy.get('hashtag#field-\\:r0\\:').should('have.text', 'カラフルマーケット')
    cy.get("#field-\\:r1\\:").type("フリースタイルショップ");
    cy.get("#field-\\:r5\\:").type("445-4235");
    cy.get("#field-\\:r6\\:").select("lO4yY4rbhkXsoRbi9CYqxA==");
    cy.get("#field-\\:r7\\:").type("自治体");
    cy.get("#field-\\:r8\\:").type("カブキチョウ イッチョウメ");
    cy.get("#field-\\:rc\\:").type("9812536458{enter}");

    //contactor info
    cy.get("#field-\\:rl\\:").type("タカシ");
    cy.get("#field-\\:rm\\:").type("フリースタイルショップ");
    cy.get("#field-\\:rp\\:").type("09012952555");
    cy.get("#field-\\:rq\\:").type("usu@yopmail.com{enter}");

    //upload file
    // cy.get('.css-1uiq9rs > [role="presentation"]').attachFile('admit.jpg', { subjectType: 'drag-n-drop' })
    cy.get("input[type=file]").attachFile("attack.jpeg");
    //cy.get("[type='file']").eq(0).selectFile('cypress/fixtures/admit.jpg',{force: true})
    //cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/admit.jpg',{force:true})

    // cy.get('._buttonContainer_15ibt_239 > .chakra-button').click()
    cy.get("._buttonContainer_15ibt_239 > .chakra-button").click();
    //cy.get('._buttonContainer_15ibt_239 > .chakra-button')
    cy.get(".chakra-checkbox__control").click();
    cy.get("._buttonContainer_ak48g_155 > .chakra-button", {
      force: true,
    }).click();

    cy.wait("@postRegisterClub");

    // cy.intercept("Get", "**api/ClubManagement*").as("getClubManagement");

    cy.origin("https://uat-admin.hoslog.jp", () => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // prevent test from failing
      });

      cy.visit("/");
      cy.get("#Username").type("superadmin");
      cy.get("#Password").type("Test@123");
      cy.get("form[role='form'] a button").click();

      // cy.wait("@getClubManagement");  // Wait for the request to complete

      cy.get("a[href='/ClubManagement/ClubList']").click();

      cy.wait(3000);

      cy.get("#tab2Link", { force: true }).click();

      cy.get("tbody tr")
        .first()
        .find("td")
        .eq(6)
        .find("div")
        .eq(0)
        .click()
        .then(() => {
          cy.get("#approve_id", { force: true }).click();
        });

      cy.wait(3000);

      cy.get("a[href='/EmailLog']").click();

      cy.wait(3000);
      cy.get("tbody tr").first().find("td").eq(2);

      cy.get("a[href='/EmailLog']").click();

      cy.wait(3000);
      cy.get("tbody tr")
        .first()
        .find("td")
        .eq(2)
        .invoke("text")
        .then((text) => {
          // Unescape the HTML-encoded content
          const parser = new DOMParser();
          const decoded = parser.parseFromString(text, "text/html")
            .documentElement.textContent;

          // Now apply regex to decoded content
          const storeID = decoded.match(/店舗ID[:：]?\s*([A-Za-z0-9]+)/)?.[1];
          const password = decoded.match(/パスワード[:：]?\s*([^\s<]+)/)?.[1];

          cy.log("Extracted Store ID:", storeID || "Not found");
          cy.log("Extracted Password:", password || "Not found");
        });
    });
  });
});
