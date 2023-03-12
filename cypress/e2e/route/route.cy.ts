beforeEach(() => {
  cy.viewport(1440, 920);
});

describe("service is available", function() {
  it("should be available on localhost:3000", function() {
    cy.visit("http://localhost:3000");
    cy.get('[href="/recursion"]').click();
  });
});
