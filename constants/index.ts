import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      message
      success
      token
      user {
        id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!,$password: String!,$username: String!) {
    signup(email: $email, password: $password, username: $username){
      message
      success
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_USERS = gql `
query Users{
  users {
    users { 
      id
      username
      email
    }
    error
  }
}`