import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_EVENTS = gql`
  query Query {
  events {
    id
    posterUrl
    title
    description
    price
    address
    venue
    date
    time
    ticketLink
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_USER_PURCHASE_HISTORY = gql`
  query getUserPurchaseHistory {
    me {
      purchaseHistory {
        eventId
        quantity
      }
    }
  }
`;