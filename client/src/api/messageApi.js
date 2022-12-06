import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
  mutation Mutation($messageInput: MessageInput) {
    createMessage(messageInput: $messageInput) {
      id
      userId
      userName
      text
      createdAt
    }
  }
`;

export const SUBSCRIBE_MESSAGE = gql`
  subscription Subscription {
    messageCreated {
      id
      userId
      userName
      text
      createdAt
    }
  }
`;

export const GET_MESSAGES = gql`
  query Query {
    messages {
      id
      userId
      userName
      text
      createdAt
    }
  }
`;

// export const REGISTER_USER = gql`
//   mutation Mutation($userRegisterInput: UserRegisterInput!) {
//     createUser(userRegisterInput: $userRegisterInput) {
//       token
//     }
//   }
// `

// export const LOGIN_USER = gql`
//   mutation LoginUser($userLoginInput: UserLoginInput) {
//   loginUser(userLoginInput: $userLoginInput) {
//     token
//   }
// }
// `

// export const AUTH_USER = gql`
//   query Query {
//     auth {
//       token
//     }
//   }
// `