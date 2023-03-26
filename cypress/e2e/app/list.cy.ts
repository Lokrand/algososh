/* eslint-disable cypress/no-unnecessary-waiting */

describe("Testing <<List>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000/list");
  });
  it("check initial state of elements", function() {
    cy.get("#list-input-string").should("be.empty");
    cy.get("#list-input-number").should("be.empty");
    cy.get("#head-add").should("be.disabled");
    cy.get("#tail-add").should("be.disabled");
    cy.get("#head-remove").should("not.be.disabled");
    cy.get("#tail-remove").should("not.be.disabled");
    cy.get("#add-by-index").should("be.disabled");
    cy.get("#remove-by-index").should("be.disabled");
    
  });

})