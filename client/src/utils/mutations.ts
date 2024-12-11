import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
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

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($newEmail: String) {
    updateUser(newEmail: $newEmail) {
      email
    }
  }
`;


export const UPDATE_PURCHASE_HISTORY = gql`
  mutation UpdatePurchaseHistory($purchasedItems: [PurchaseInput!]!) {
    updatePurchaseHistory(purchasedItems: $purchasedItems) {
      _id
      username
      purchaseHistory {
        eventId
        quantity
      }
    }
  }
`