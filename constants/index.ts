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

export const GET_OTHER_USERS = gql `
query OtherUsers($id: ID!){
  otherUsers(id: $id) {
    users { 
      id
      username
      email
    }
    error
  }
}`

export const GET_GROUP = gql `
query getGroup($combinedId: String!){
  getGroup(combinedId: $combinedId) {
    combinedId
    messages {
      id
      content 
      type
      timestamp
      from {
        id
        username
      }
    }
  }
}`

export const ADD_MESSAGE = gql `
mutation addMessage($content: String!, $combinedId: String!, $userId: ID!, $type: String) {
  addMessage(content: $content, combinedId: $combinedId, userId: $userId, type: $type) {
    combinedId
    messages {
      id
      content 
      type
      timestamp
    }
  }
}`

export const GROUP_UPDATED = gql`
  subscription groupUpdated($combinedId: String!) {
    groupUpdated(combinedId: $combinedId) {
      combinedId
      messages {
        id
        content 
        type
        timestamp
        from {
          id
          username
        }
      }
    }
  }
`;
