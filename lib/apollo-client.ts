import { ApolloClient, HttpLink, InMemoryCache, from, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";

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


// WebSocket link for subscriptions
const wsLink = new WebSocketLink({
  uri: `wss://${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: sessionStorage.getItem('auth-token'),
    },
  },
});


// Split link to direct requests to appropriate link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);


const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_DOMAIN + "/api/graphql",
  cache: new InMemoryCache(),
  link: from([errorLink,splitLink]),
});

export default client;