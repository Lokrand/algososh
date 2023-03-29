export const stylesDefault = "4px solid rgb(0, 50, 255)";
export const stylesChanging = "4px solid rgb(210, 82, 225)";
export const stylesModified = "4px solid rgb(127, 224, 81)";
export const DELAY_IN_MS = 1000;
export const SHORT_DELAY_IN_MS = 500;

describe("service is available", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000");
  });

  it("should be available on localhost:3000", function() {
    cy.get("h1").should("exist");
  });
});
