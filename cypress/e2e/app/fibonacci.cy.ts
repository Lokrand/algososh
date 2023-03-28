/* eslint-disable cypress/no-unnecessary-waiting */
import { SHORT_DELAY_IN_MS } from "./app.cy";

const testNum = "8";

describe("Testing <<Fibonacci>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("check initial state of elements", function() {
    cy.get("input").should("be.empty");
    cy.get("#fibonacci-button").should("be.disabled");
  });
  it("should current fibonacci list", function() {
    cy.get("input").type(testNum);
    cy.get("#fibonacci-button")
      .should("not.be.disabled")
      .click();
    cy.get("#string-spinner").should("exist");

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
        if (i === 4) expect(el).contain(5);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
        if (i === 4) expect(el).contain(5);
        if (i === 5) expect(el).contain(8);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
        if (i === 4) expect(el).contain(5);
        if (i === 5) expect(el).contain(8);
        if (i === 6) expect(el).contain(13);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
        if (i === 4) expect(el).contain(5);
        if (i === 5) expect(el).contain(8);
        if (i === 6) expect(el).contain(13);
        if (i === 7) expect(el).contain(21);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("#fibonacci-circles")
      .children()
      .each((el, i) => {
        if (i === 0) expect(el).contain(1);
        if (i === 1) expect(el).contain(1);
        if (i === 2) expect(el).contain(2);
        if (i === 3) expect(el).contain(3);
        if (i === 4) expect(el).contain(5);
        if (i === 5) expect(el).contain(8);
        if (i === 6) expect(el).contain(13);
        if (i === 7) expect(el).contain(21);
        if (i === 8) expect(el).contain(34);
      });

    cy.get("#fibonacci-circles")
      .children()
      .should("have.length", 9);
    cy.get("#string-spinner").should("not.exist");
    cy.get("#fibonacci-button").should("not.be.disabled");
  });
});
