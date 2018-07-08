import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as Fragments from './fragments';

const NETWORK_INTERFACE_URL = 'https://segment-ecommerce-demo-store.myshopify.com/api/graphql';
const AUTH_TOKEN = 'd5e4776a79398e8b1160b1dad613e17a';

const networkInterface = { uri: NETWORK_INTERFACE_URL };
const httpLink = createHttpLink(networkInterface);

const authLink = setContext(() => {
  return {
    headers: {
      'X-Shopify-Storefront-Access-Token': `${AUTH_TOKEN}`,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Fetches all products and variants.  This is from the Shopify
// example React app:  https://github.com/Shopify/storefront-api-examples/blob/master/react-apollo/src/App.js

export const fetchProducts = () => {
  return client.query({
    query: gql`
    query query {
      shop {
      name
      description
      products(first:20) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            options {
              id
              name
              values
            }
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }`
  });
};

export default client;
