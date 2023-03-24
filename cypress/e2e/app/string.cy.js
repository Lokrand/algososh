/* eslint-disable cypress/no-unnecessary-waiting */
const singleStr = "a";
const OddStr = "Piter";
const evenStr = "qwerty";
const stylesDefault = "4px solid rgb(0, 50, 255)";
const stylesChanging = "4px solid rgb(210, 82, 225)";
const stylesModified = "4px solid rgb(127, 224, 81)";

describe("Testing <<String>> page", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3001/recursion");
  });
  it("check initial state of elements", function() {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });
  it("checking logic when entering an even number of symbols", function() {
    cy.get("input").type(evenStr);
    cy.get("#stringButton")
      .should("not.be.disabled")
      .click();
    cy.get("#string-spinner").should("exist");

    cy.get("#circles")
      .children()
      .each((el, i) => {
        expect(el.children()[1]).to.have.css("border", stylesDefault);
        expect(el).contain(evenStr[i]);
      });
    cy.wait(500);
    cy.get("#circles").children().each((el, i) => {
        if (i === 0) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
        if (i === 1) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 2) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 3) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 4) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 5) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
    });

    cy.wait(500);

    cy.get("#circles").children().each((el, i) => {
        if (i === 0) expect(el).contain(evenStr[evenStr.length-1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 1) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
        if (i === 2) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 3) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesDefault);
        if (i === 4) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
        if (i === 5) expect(el).contain(evenStr[0]) && expect(el.children()[1]).to.have.css('border', stylesModified);
    });

    cy.wait(500);
    
    cy.get("#circles").children().each((el, i) => {
        if (i === 0) expect(el).contain(evenStr[evenStr.length-1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 1) expect(el).contain(evenStr[evenStr.length-2]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 2) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
        if (i === 3) expect(el).contain(evenStr[i]) && expect(el.children()[1]).to.have.css('border', stylesChanging);
        if (i === 4) expect(el).contain(evenStr[1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 5) expect(el).contain(evenStr[0]) && expect(el.children()[1]).to.have.css('border', stylesModified);
    });

    cy.wait(500);
    
    cy.get("#circles").children().each((el, i) => {
        if (i === 0) expect(el).contain(evenStr[evenStr.length-1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 1) expect(el).contain(evenStr[evenStr.length-2]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 2) expect(el).contain(evenStr[evenStr.length-3]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 3) expect(el).contain(evenStr[2]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 4) expect(el).contain(evenStr[1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 5) expect(el).contain(evenStr[0]) && expect(el.children()[1]).to.have.css('border', stylesModified);
    });

    cy.wait(500);

    cy.get("#circles").children().each((el, i) => {
        if (i === 0) expect(el).contain(evenStr[evenStr.length-1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 1) expect(el).contain(evenStr[evenStr.length-2]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 2) expect(el).contain(evenStr[evenStr.length-3]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 3) expect(el).contain(evenStr[2]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 4) expect(el).contain(evenStr[1]) && expect(el.children()[1]).to.have.css('border', stylesModified);
        if (i === 5) expect(el).contain(evenStr[0]) && expect(el.children()[1]).to.have.css('border', stylesModified);
    });

    cy.wait(500);

  });
});
