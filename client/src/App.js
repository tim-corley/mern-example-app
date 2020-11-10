import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextController } from "./context/authContext";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";
import Landing from "./components/layouts/Landing";
import NewNav from "./components/NewNav";
import Footer from "./components/Footer";
import BugDetails from "./components/BugDetails";
import AddBug from "./components/AddBug";
import BugsList from "./components/BugsList";
import UserLanding from "./components/layouts/UserLanding";
import "./styles.css";

const App = () => {
  const [errorInfo, setErrorInfo] = useState([]);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, extensions }) => {
        if (!extensions.errors) {
          setErrorInfo(message);
        } else {
          setErrorInfo(Object.values(extensions.errors));
        }
      });
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // history.push("/network-error"); // redirect to network-error route
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      authLink,
      new createHttpLink({ uri: "http://localhost:3000/graphql" }),
    ]),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <ContextController>
          <NewNav transparent />
          <Route path="/" exact component={Landing} />
          <Route path="/bugs" component={BugsList} />
          <Route path="/details/:id" component={BugDetails} />
          <Route path="/add" render={() => <AddBug errorInfo={errorInfo} />} />
          <Route
            path="/user"
            render={() => <UserLanding errorInfo={errorInfo} />}
          />
          <Footer />
        </ContextController>
      </Router>
    </ApolloProvider>
  );
};

export default App;
