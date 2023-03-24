describe("service is available", function() {
  beforeEach(() => {
    cy.viewport(1440, 920);
    cy.visit("http://localhost:3001");
  });

  it("should be available on localhost:3000", function() {
    cy.get("h1").should("exist");
  });

  it("should open string page and go back", function() {
    cy.get("#linkToString").click();
    cy.get("h3")
      .contains("Строка")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });

  it("should open fibonacci page and go back", function() {
    cy.get("#linkToFibonacci").click();
    cy.get("h3")
      .contains("Последовательность Фибоначчи")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });

  it("should open sorting page and go back", function() {
    cy.get("#linkToSorting").click();
    cy.get("h3")
      .contains("Сортировка массива")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });

  it("should open stack page and go back", function() {
    cy.get("#linkToStack").click();
    cy.get("h3")
      .contains("Стек")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });

  it("should open queue page and go back", function() {
    cy.get("#linkToQueue").click();
    cy.get("h3")
      .contains("Очередь")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });

  it("should open list page and go back", function() {
    cy.get("#linkToList").click();
    cy.get("h3")
      .contains("Связный список")
      .should("exist");
    cy.get("#linkToMainPage").click();
    cy.get("h1").should("exist");
  });
});
