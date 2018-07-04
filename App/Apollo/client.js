import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const NETWORK_INTERFACE_URL = 'https://segment-ecommerce-demo-store.myshopify.com/api/graphql';
const networkInterface = { uri: NETWORK_INTERFACE_URL };
const AUTH_TOKEN = '0e96c45271024c9420af2e0a4edb03fe';
const httpLink = createHttpLink(networkInterface);

const authLink = setContext((_, { headers }) => {
  return {
    ...headers,
    "X-Shopify-Storefront-Access-Token": authToken,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
