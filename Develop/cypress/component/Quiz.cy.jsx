import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('renders the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('exist');
  });
});
