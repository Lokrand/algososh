/* eslint-disable cypress/no-unnecessary-waiting */
import { SHORT_DELAY_IN_MS, stylesChanging, stylesDefault } from "./app.cy";

describe("Testing <<Stack>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000/stack");
  });
  it("check initial state of elements", function() {
    cy.get("input").should("be.empty");
    cy.get("#stack-add-el-button").should("be.disabled");
    cy.get("#stack-delete-one-el-button").should("be.disabled");
    cy.get("#stack-clear-all-el-button").should("be.disabled");
  });

  it("should current add element in stack", function() {
    // add first element
    cy.get("input").type("dog");
    cy.get("#stack-add-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("input").should("be.empty");
    cy.get("#spinner").should("exist");
    cy.get("#stack-circles")
      .children()
      .should("have.length", 1)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", stylesChanging);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#stack-circles")
      .children()
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", stylesDefault);
      });

    cy.get("#spinner").should("not.exist");
    cy.get("#stack-add-el-button").should("be.disabled");
    cy.get("#stack-delete-one-el-button").should("not.be.disabled");
    cy.get("#stack-clear-all-el-button").should("not.be.disabled");

    // add second element
    cy.get("input").type("cat");
    cy.get("#stack-add-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("input").should("be.empty");
    cy.get("#spinner").should("exist");
    cy.get("#stack-circles")
      .children()
      .should("have.length", 2)
      .each((el, i) => {
        if (i === 0)
          expect(el).contain("dog") &&
            expect(el.children()).to.have.css("border", stylesDefault);
        if (i === 1)
          expect(el).contain("cat") &&
            expect(el.children()[1]).to.have.css("border", stylesChanging);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#stack-circles")
      .children()
      .each((el, i) => {
        if (i === 0)
          expect(el).contain("dog") &&
            expect(el.children()).to.have.css("border", stylesDefault);
        if (i === 1)
          expect(el).contain("cat") &&
            expect(el.children()[1]).to.have.css("border", stylesDefault);
      });

    cy.get("#spinner").should("not.exist");
    cy.get("#stack-add-el-button").should("be.disabled");
  });
  it("current remove el from stack", function() {
    cy.get("input").type("dog");
    cy.get("#stack-add-el-button").click();
    cy.get("input").type("cat");
    cy.get("#stack-add-el-button").click();
    cy.get("input").type("owl");
    cy.get("#stack-add-el-button").click();
    cy.get("#stack-circles")
      .children()
      .should("have.length", 3)
      .each((el, i) => {
        if (i === 0) expect(el).contain("dog");
        if (i === 1) expect(el).contain("cat");
        if (i === 2) expect(el).contain("owl");
      });
    cy.get("#stack-delete-one-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("#stack-circles")
      .children()
      .should("have.length", 2)
      .each((el, i) => {
        if (i === 0) expect(el).contain("dog");
        if (i === 1) expect(el).contain("cat");
      });
  });
  it("current clear stack", function() {
    cy.get("input").type("dog");
    cy.get("#stack-add-el-button").click();
    cy.get("input").type("cat");
    cy.get("#stack-add-el-button").click();
    cy.get("input").type("owl");
    cy.get("#stack-add-el-button").click();
    cy.get("#stack-circles")
      .children()
      .should("have.length", 3);
    cy.get("#stack-clear-all-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("#stack-circles")
      .children()
      .should("have.length", 0);
  });
});
