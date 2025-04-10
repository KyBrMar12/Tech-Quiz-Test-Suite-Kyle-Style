describe('Tech Quiz E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the homepage', () => {
    cy.url().should('include', '/');
  });

  it('displays the Start Quiz button', () => {
    cy.contains('Start Quiz').should('exist');
  });

  it('starts the quiz and shows the first question', () => {
    cy.contains('Start Quiz').click();
    cy.get('h2').should('exist');
  });

  it('allows selecting an answer for the first question', () => {
    cy.contains('Start Quiz').click();
    cy.get('button').contains(/^\d+$/).first().click();
  });

  it('displays a different question after selecting an answer', () => {
    cy.contains('Start Quiz').click();
    cy.get('h2').then(($firstQ) => {
      const q1 = $firstQ.text();
      cy.get('button').contains(/^\d+$/).first().click();
      cy.get('h2').should(($nextQ) => {
        expect($nextQ.text()).not.to.eq(q1);
      });
    });
  });

  it('completes the entire quiz after answering 10 questions', () => {
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Quiz Completed').should('exist');
  });

  it('displays the user score after the quiz is completed', () => {
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Your score').should('exist');
  });

  it('displays the "Take New Quiz" button after completing quiz', () => {
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Take New Quiz').should('exist');
  });

  it('starts a new quiz when "Take New Quiz" is clicked', () => {
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Take New Quiz').click();
    cy.get('h2').should('exist'); // New question loaded
  });

  it('loads different questions for a new quiz', () => {
    cy.contains('Start Quiz').click();
    let firstQuizQ = '';

    // Save the first question
    cy.get('h2').first().then(($q1) => {
      firstQuizQ = $q1.text();
    });

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Take New Quiz').click();

    cy.get('h2').should(($newQ) => {
      expect($newQ.text()).not.to.eq(firstQuizQ);
    });
  });
});
