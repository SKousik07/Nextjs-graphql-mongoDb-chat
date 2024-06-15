import authResolver from "./authResolver"

const myResolvers = [ 
    authResolver
]

const queries = {}
const mutations = {}

for (const resolver of myResolvers) {
    if("Query" in resolver) {
        Object.assign(queries, resolver.Query)
    }
    if("Mutation" in resolver) {
        Object.assign(mutations, resolver.Mutation)
    }
}

const resolvers = {
    Query: queries,
    //Mutation: mutations
}

export default resolvers



