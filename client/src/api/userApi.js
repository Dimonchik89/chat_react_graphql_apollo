import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Mutation($userRegisterInput: UserRegisterInput!) {
    createUser(userRegisterInput: $userRegisterInput) {
      token
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($userLoginInput: UserLoginInput) {
  loginUser(userLoginInput: $userLoginInput) {
    token
  }
}
`

export const AUTH_USER = gql`
  query Query {
    auth {
      token
    }
  }
`