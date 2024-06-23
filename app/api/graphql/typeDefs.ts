import { gql } from "@apollo/client";

const typeDefs  = gql `
    type Query {
        user: String
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

    type User {
        id: ID!
        username: String
        email: String!
    }
`

export default typeDefs