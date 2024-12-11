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

export const ADD_EVENT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      creaetedAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
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
  mutation UpdatePurchaseHistory($purchasedEventIds: [Int]) {
  updatePurchaseHistory(purchasedEventIds: $purchasedEventIds) {
    _id
    username
    purchaseHistory {
      id
      event {
        id
        title
        description
        posterUrl
        price
        address
        date
        venue
        time
        ticketLink
      }
    }
  }
}
`