/* eslint-disable cypress/no-unnecessary-waiting */

import { DELAY_IN_MS, stylesDefault, stylesModified } from "./app.cy";

describe("Testing <<List>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000/list");
    cy.waitForReact();
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
    cy.get("#li")
      .children()
      .should("have.length", 4);
  });

  it("should add element in head", function() {
    cy.get("#list-input-string").type("cat1");
    cy.get("#tail-add").should("not.be.disabled");
    cy.get("#head-add")
      .should("not.be.disabled")
      .click();
    cy.get("#spinner").should("exist");

    cy.get("#li")
      .children()
      .each((el, i) => {
        if (i === 0) {
          cy.react('Circle').children().should('have.text', 'cat1');
          expect(el.children()).to.contain("cat1");
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("#li")
      .children()
      .should("have.length", 5)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("cat1") &&

            expect(el.children()[0]).to.have.attr("head")
        }
      });
    // cy.wait(DELAY_IN_MS);
    // cy.get("#li")
    //   .should("have.length", 5)
    //   .each((el) => {
    //     expect(el.children()[1]).to.have.css("border", stylesDefault);
    //   });
  });
});
