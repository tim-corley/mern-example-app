import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextController } from "./context/authContext";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import Landing from "./components/layouts/Landing";
import NavBar from "./components/NavBar";
import NewNav from "./components/NewNav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import EditBug from "./components/EditBug";
import AddBug from "./components/AddBug";
import CreateUser from "./components/CreateUser";
import BugsList from "./components/BugsList";
import UserLanding from "./components/UserLanding";
import LoginUser from "./components/LoginUser";
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
      props.history.push("/network-error"); // redirect to network-error route
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      errorLink,
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
          <Route path="/edit/:id" component={EditBug} />
          <Route path="/add" component={AddBug} />
          <Route path="/user" component={UserLanding} />
          <Route
            path="/login"
            render={() => <LoginUser errorInfo={errorInfo} />}
          />
          <Route
            path="/register"
            render={() => <CreateUser errorInfo={errorInfo} />}
          />

          <Footer />
        </ContextController>
      </Router>
    </ApolloProvider>
  );
};

export default App;
