import { gql } from "@apollo/client";

const typeDefs  = gql `
    type Query {
        login: String
    }
`

export default typeDefs