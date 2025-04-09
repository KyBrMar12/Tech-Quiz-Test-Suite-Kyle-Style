describe('Tech Quiz E2E', () => {
  it('allows a user to complete the quiz and view score', () => {
    cy.visit('/');

    // Start the quiz
    cy.contains('Start Quiz').click();

    // Answer 10 questions
    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click(); // clicks answer button labeled 1, 2, etc.
    }

    // Confirm score is shown
    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score').should('exist');

    // Restart quiz
    cy.contains('Take New Quiz').click();

    // Check that a new question is displayed
    cy.get('h2').should('not.contain', 'Quiz Completed'); // ensure it's not on the score screen anymore
    cy.get('h2').should('not.contain', 'Start Quiz');     // ensure it's not on the intro screen
    cy.get('h2').should('exist');                         // confirms a question is now being shown
  });
});
