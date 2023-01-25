/// <reference types='cypress'/>

describe('habit page', () => {
  beforeEach(() => {
    cy.visit('/habits');
  });

  it('should diplay modal when add button is clicked', () => {
    cy.contains('button', 'Add').click();
    cy.contains('Add a new habit').should('be.visible');
  });

  it('should display a new habit when a habit is added', () => {
    cy.get('#habit-add-btn').click();

    cy.get('input[placeholder="Habit"]').type('Drink a cup of water');

    cy.contains('Save Changes').click();

    cy.contains('Drink a cup of water')
      .should('be.visible')
      .and('have.class', 'HabitCard__habit-container');
  });

  it('should toggle icon when habit cad is clicked', () => {
    cy.get('#habit-add-btn').click();

    cy.get('input[placeholder="Habit"]').type('Drink a cup of water');

    cy.contains('Save Changes').click();
    cy.get('[src="/static/media/close.fa7e5ead.svg"]').should('be.visible');

    cy.get('.HabitCard').click();
    cy.get('[src="/static/media/check.9e8832df.svg"]').should('be.visible');
  });
});
