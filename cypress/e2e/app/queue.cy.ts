/* eslint-disable cypress/no-unnecessary-waiting */
import { SHORT_DELAY_IN_MS, stylesChanging, stylesDefault } from "./app.cy";

describe("Testing <<Queue>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000/queue");
  });
  it("check initial state of elements", function() {
    cy.get("input").should("be.empty");
    cy.get("#queue-add-el-button").should("be.disabled");
    cy.get("#queue-delete-one-el-button").should("be.disabled");
    cy.get("#queue-clear-all-el-button").should("be.disabled");
  });
  it("should current add two elements in queue", function() {
    // add first element
    cy.get("input").type("dog");
    cy.get("#queue-add-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("input").should("be.empty");
    cy.get("#string-spinner").should("exist");
    cy.get("#queue-circles")
      .children()
      .each((el, i) => {
        if (i === 0) {
          expect(el.children()[1]).to.have.css("border", stylesChanging);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#queue-circles")
      .children()
      .each((el, i) => {
        if (i === 0) {
          expect(el).contain("dog");
          expect(el.children()[1]).to.have.css("border", stylesDefault);
        }
      });

    cy.get("#string-spinner").should("not.exist");
    cy.get("#queue-add-el-button").should("be.disabled");
    cy.get("#queue-delete-one-el-button").should("not.be.disabled");
    cy.get("#queue-clear-all-el-button").should("not.be.disabled");

    // add second element
    cy.get("input").type("cat");
    cy.get("#queue-add-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("input").should("be.empty");
    cy.get("#string-spinner").should("exist");
    cy.get("#queue-circles")
      .children()
      .each((el, i) => {
        if (i === 0)
          expect(el).contain("dog") &&
            expect(el.children()[1]).to.have.css("border", stylesDefault);
        if (i === 1)
          expect(el.children()[1]).to.have.css("border", stylesChanging);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#queue-circles")
      .children()
      .each((el, i) => {
        if (i === 0)
          expect(el).contain("dog") &&
            expect(el.children()[1]).to.have.css("border", stylesDefault);
        if (i === 1)
          expect(el).contain("cat") &&
            expect(el.children()[1]).to.have.css("border", stylesChanging);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#queue-circles")
      .children()
      .each((el, i) => {
        if (i === 0)
          expect(el).contain("dog") &&
            expect(el.children()[1]).to.have.css("border", stylesDefault);
        if (i === 1)
          expect(el).contain("cat") &&
            expect(el.children()[1]).to.have.css("border", stylesDefault);
      });

    cy.get("#string-spinner").should("not.exist");
    cy.get("#queue-add-el-button").should("be.disabled");
    cy.get("#queue-delete-one-el-button").should("not.be.disabled");
    cy.get("#queue-clear-all-el-button").should("not.be.disabled");
  });

  it("current remove el from queue", function() {
    cy.get("input").type("dog");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("cat");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl");
    cy.get("#queue-add-el-button").click();

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("#queue-circles")
      .children()
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) expect(el).contain("dog");
        if (i === 1) expect(el).contain("cat");
        if (i === 2) expect(el).contain("owl");
      });
    cy.get("#queue-delete-one-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("#queue-circles")
      .children()
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) expect(el).contain("");
        if (i === 1) expect(el).contain("cat");
        if (i === 2) expect(el).contain("owl");
      });
  });

  it("current clear queue", function() {
    cy.get("input").type("dog1");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("cat2");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl3");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl4");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl5");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl6");
    cy.get("#queue-add-el-button").click();
    cy.get("input").type("owl7");
    cy.get("#queue-add-el-button").click();
    cy.get("#queue-circles")
      .children()
      .should("have.length", 7);
    cy.get("#queue-add-el-button").should("be.disabled");
    cy.get("#queue-clear-all-el-button")
      .should("not.be.disabled")
      .click();
    cy.get("#queue-circles")
      .children()
      .should("have.length", 7)
      .each((el) => {
        expect(el).contain("");
      });
    cy.get("#queue-add-el-button").should("be.disabled");
    cy.get("#queue-delete-one-el-button").should("be.disabled");
    cy.get("#queue-clear-all-el-button").should("be.disabled");
  });
});
