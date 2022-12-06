import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, createHttpLink, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { BrowserRouter } from "react-router-dom"
import { CookiesProvider, useCookies } from 'react-cookie';
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';





// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql"
// })

// const wsLink = () => {
//   return new GraphQLWsLink(createClient({
//     url: 'ws://localhost:4000/graphql'
//   }))
// }

// const client = new ApolloClient({
//   link: typeof window === 'undefined' ? httpLink : wsLink(),
//   cache: new InMemoryCache()
// })

/////////////////////////

const link = new WebSocketLink(
  new SubscriptionClient("ws://localhost:4000/graphql")
);

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});




//////////////////////////////////////

// const link = new WebSocketLink(
//   new SubscriptionClient("ws://localhost:4000/graphql")
// );

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const [cookies, setCookie] = useCookies(['token']);
//   return {
//     headers: {
//       ...headers,
//       // authorization: cookies?.token ? `Bearer ${cookies?.token}` : "",
//       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJuYW1lIjoiVmFzeWEiLCJpZCI6MTMsImlhdCI6MTY3MDIyODAwMywiZXhwIjoxNjcwMzE0NDAzfQ.oO6XO2jOPN9YZJC0FY_nrjxA0derPMqTH4S-w__eNLQ`
//     }
//   }
// });

// const client = new ApolloClient({
//   link,
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJuYW1lIjoiVmFzeWEiLCJpZCI6MTMsImlhdCI6MTY3MDIyODAwMywiZXhwIjoxNjcwMzE0NDAzfQ.oO6XO2jOPN9YZJC0FY_nrjxA0derPMqTH4S-w__eNLQ`
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CookiesProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CookiesProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
