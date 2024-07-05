import { gql } from "@apollo/client";

const typeDefs  = gql `
    type Query {
        user(id: ID): User
        users: usersResponse
    }

    type Mutation {
        signup(email: String!, password: String!, username: String!): authResponse
        login(email:String!, password: String!): authResponse
    }

    type authResponse {
        message: String!
        success: Boolean!
        user: User
        token: String
    }

    type usersResponse {
        error: String
        users: [User]
    }

    type User {
        id: ID!
        username: String
        email: String!
        error: String
    }
`

export default typeDefs