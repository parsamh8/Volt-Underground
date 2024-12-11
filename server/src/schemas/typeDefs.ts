const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    purchaseHistory: [Purchase]!
  }

  type Purchase {
    eventId: Int!
    quantity: Int!
  }
  
  type Event {
    id: Int!
    posterUrl: String
    title: String
    description: String
    price: String
    address: String!
    venue: String
    date: String
    time: String
    ticketLink: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input PurchaseInput {
    eventId: Int!
    quantity: Int!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    events: [Event!]!
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createEvent(
      posterUrl: String,
      title: String,
      description: String,
      price: Float,
      address: String,
      venue: String,
      date: String,
      time: String,
      ticketLink: String
    ): Event
    updateUser(
      newEmail: String
    ): User
    updatePurchaseHistory(purchasedItems: [PurchaseInput!]!): User 
  }
`;

export default typeDefs;
