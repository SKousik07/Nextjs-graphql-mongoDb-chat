import { gql } from "@apollo/client";

const typeDefs  = gql `
    type Query {
        user(id: ID): User
        users: usersResponse
        otherUsers(id: ID): usersResponse
        getGroup(combinedId: String!): Group
    }

    type Mutation {
        signup(email: String!, password: String!, username: String!): authResponse
        login(email:String!, password: String!): authResponse
        addMessage(combinedId: String!, content: String!, userId: ID!, type: String ): Group
    }

    type Subscription {
        groupUpdated(combinedId: String!): Group
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

    type Group {
        id: ID!
        combinedId: String!,
        messages: [Message]
    }

    type Message {
        id: ID!
        content: String!
        from: User
        type: String!
        timestamp: String!
    }
`

export default typeDefs