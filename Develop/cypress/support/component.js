import { mount } from 'cypress/react'

// Make mount available globally for component tests
Cypress.Commands.add('mount', mount)
