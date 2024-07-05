import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: '/api/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('auth-token'); 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  uri: process.env.DOMAIN + "/api/graphql",
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
});

export default client;