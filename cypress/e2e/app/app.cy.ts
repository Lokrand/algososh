beforeEach(() => {
  cy.viewport(1440, 920);
  cy.visit("http://localhost:3001");
});

describe("service is available", function() {
  it("should be available on localhost:3000", function() {
    cy.get("h1").should("exist");
  });
});

describe("current routing", function() {});

describe("routing on string page", function() {
  it("should open string page", function() {
    cy.get("#linkToString").click();
    cy.get("h3")
      .contains("Строка")
      .should("exist");
    cy.get("button").should("be.disabled");
    cy.get("input").should("be.empty");
    cy.get("input").type("qwerty");
    cy.get("#stringButton").should("not.be.disabled").click();
    cy.get("#string-spinner").should("exist");
    
  });
});
