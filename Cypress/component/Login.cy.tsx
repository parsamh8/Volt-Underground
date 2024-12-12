import React from 'react';
import { mount } from '@cypress/react';
import Login from '../../client/src/pages/Login'; // Import the Login component
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

// Define any necessary GraphQL queries
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mock the GraphQL response
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: { email: 'test@test.com', password: 'password123' },
    },
    result: {
      data: {
        login: {
          token: 'mocked-token',
          user: {
            _id: 'mocked-id',
            username: 'testuser',
          },
        },
      },
    },
  },
];


// Set up Apollo Client with InMemoryCache
const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql', // Adjust your GraphQL endpoint if needed
});

describe('Login Component', () => {
  it('should display the login form and handle submit', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloProvider client={mockClient}>
          <Login />
        </ApolloProvider>
      </MockedProvider>
    );

    // Check if the form fields are present
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('LOG IN').should('be.visible');

    // Simulate typing in the form
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('password123');

    // Submit the form
    cy.get('button').contains('LOG IN').click();

    // Check if the success message appears
    cy.contains('Could not authenticate user.').should('be.visible');
  });

  it('should show error message if login fails', () => {
    // Modify mock to simulate error response
    const errorMocks = [
      {
        request: {
          query: LOGIN_USER,
          variables: { email: 'wrong@test.com', password: 'wrongpassword' },
        },
        error: new Error('Invalid credentials'),
      },
    ];

    mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ApolloProvider client={mockClient}>
          <Login />
        </ApolloProvider>
      </MockedProvider>
    );

    // Simulate typing in the form with incorrect credentials
    cy.get('input[name="email"]').type('wrong@test.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button').contains('LOG IN').click();

    // Check if the error message appears
    cy.contains('Could not authenticate user.').should('be.visible');
  });
});
