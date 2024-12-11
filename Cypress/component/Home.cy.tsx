// cypress/component/Home.cy.tsx
// import React from 'react';
import { mount } from 'cypress/react'; // If using @cypress/react for component testing
import Home from '../../client/src/pages/Home'; // Adjust the import path as needed
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com',
  cache: new InMemoryCache(),
});


describe('Home Component', () => {
  it('should contain the word "Underground"', () => {
    // Mount the component

    mount(
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>);
    // Assert that the component contains the word "Welcome"
    cy.contains('Underground').should('be.visible');
  });
});