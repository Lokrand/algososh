/* eslint-disable cypress/no-unnecessary-waiting */
import { DELAY_IN_MS, stylesChanging, stylesDefault, stylesModified } from "./app.cy";

// Здесь для тестирования я использовал библиотеку cypress-react-selector, т.к. по другому не получалось.
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
  
  // it("should add element in head", function() {
    //   cy.get("#list-input-string").type("cat");
    //   cy.get("#tail-add").should("not.be.disabled");
    //   cy.get("#head-add").should("not.be.disabled").click();
    //   cy.get("#spinner").should("exist");
    
    //   cy.react("Circle")
    //   .should("have.length", 5)
    //   .last()
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "56px")
    
    //   cy.wait(DELAY_IN_MS);
    
    //   cy.react("Circle")
    //   .children()
    //   .first()
    //   .should("have.text", "head")
    //   .next()
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "80px")
    //   .should("have.css", "border", stylesModified)
    //   .next()
    //   .should("have.text", "0")
    
    //   cy.wait(DELAY_IN_MS);
    
    //   cy.react("Circle")
    //   .children()
    //   .first()
    //   .should("have.text", "head")
    //   .next()
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "80px")
    //   .should("have.css", "border", stylesDefault)
    //   .next()
    //   .should("have.text", "0")
    
    //   cy.get("#list-input-string").should("be.empty");
    //   cy.get("#tail-add").should("be.disabled");
    //   cy.get("#head-add").should("be.disabled");
    //   cy.get("#spinner").should("not.exist");
    // });
    
    // it("should add element in tail", function() {
      //   cy.get("#list-input-string").type("cat");
      //   cy.get("#head-add").should("not.be.disabled");
    //   cy.get("#tail-add").should("not.be.disabled").click();
    //   cy.get("#spinner").should("exist");
    
    //   cy.react("Circle")
    //   .should("have.length", 5)
    //   .last()
    //   .should("not.have.text", "tail")
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "56px")
    
    //   cy.wait(DELAY_IN_MS);
    
    //   cy.react("Circle")
    //   .children()
    //   .last()
    //   .should("have.text", "head")
    //   // .nextUntil()
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "80px")
    //   .should("have.css", "border", stylesModified)
    //   .next()
    //   .should("have.text", "0")
    
    //   cy.wait(DELAY_IN_MS);
    
    //   cy.react("Circle")
    //   .children()
    //   .first()
    //   .should("have.text", "head")
    //   .next()
    //   .should("have.text", "cat")
    //   .should("have.css", "width", "80px")
    //   .should("have.css", "border", stylesDefault)
    //   .next()
    //   .should("have.text", "0")
    
    //   cy.get("#list-input-string").should("be.empty");
    //   cy.get("#tail-add").should("be.disabled");
    //   cy.get("#head-add").should("be.disabled");
    //   cy.get("#spinner").should("not.exist");
    // });
    // });
    // it("should add element by index", function() {});
    it("should remove element in head", function() {
      cy.get("#li").children().should("have.length", 4)
      cy.get("#head-remove").click();
      cy.get("#li").children().each((el, i) => {
        
      })
      // cy.react("Circle").children().first().should("have.text", "");
      cy.wait(DELAY_IN_MS);
      cy.get("#li").children().should("have.length", 3)
    
      
    });
    // it("should remove element in tail", function() {});
    // it("should remove element by index", function() {});
  });
  