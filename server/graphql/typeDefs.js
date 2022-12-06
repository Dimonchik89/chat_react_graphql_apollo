const { gql } = require("apollo-server");

module.exports = gql`
  type Message {
    id: ID!
    userId: Int!
    userName: String!
    text: String!
    createdAt: String!
  }

  type Token {
    token: String!
  }

  input MessageInput {
    text: String!
    userName: String!
    userId: Int!
  }

  input UserRegisterInput {
    email: String!
    name: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    messages: [Message],
    auth: Token!
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message,
    createUser(userRegisterInput: UserRegisterInput!): Token!,
    loginUser(userLoginInput: UserLoginInput): Token!
  }

  type Subscription {
    messageCreated: Message
  }
`;
