// cypress/component/Home.cy.tsx
// import React from 'react';
import { mount } from 'cypress/react'; // If using @cypress/react for component testing
import Home from '../../client/src/pages/Home'; // Adjust the import path as needed

describe('Home Component', () => {
  it('should contain the word "Underground"', () => {
    // Mount the component
    mount(<Home />);

    // Assert that the component contains the word "Welcome"
    cy.contains('Underground').should('be.visible');
  });
});