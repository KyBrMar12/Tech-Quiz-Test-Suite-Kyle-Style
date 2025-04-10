import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('renders the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('exist');
  });

  it('starts the quiz and displays a question', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.get('h2').should('exist'); // Question header
  });

  it('allows selecting an answer', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.get('button').contains(/^\d+$/).first().click(); // Clicks answer 1
  });

  it('displays the next question when an answer is selected', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    cy.get('h2').then(($q1) => {
      const question1 = $q1.text();
      cy.get('button').contains(/^\d+$/).first().click();

      cy.get('h2').should(($q2) => {
        expect($q2.text()).not.to.eq(question1); // Next question should be different
      });
    });
  });

  it('finishes the quiz after answering all questions', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score').should('exist');
  });

  it('resets the quiz when the "Take New Quiz" button is clicked', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains(/^\d+$/).first().click();
    }

    cy.contains('Take New Quiz').click();
    cy.get('h2').should('exist'); // Should show a new question again
  });
});
