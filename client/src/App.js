import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextController } from "./context/authContext";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import NavBar from "./components/NavBar";
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
  const errorLink = onError(({ response, networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      const errorInfo = response.errors[0].extensions.errors;
      setErrorInfo(Object.values(errorInfo));
    }
    if (networkError) setErrorInfo(networkError);
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
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-1">
              <NavBar />
            </div>
            <div className="col-span-11">
              <Route path="/" exact component={Home} />
              <Route path="/bugs" component={BugsList} />
              <Route path="/edit/:id" component={EditBug} />
              <Route path="/add" component={AddBug} />
              <Route path="/user" component={UserLanding} />
              <Route path="/login" component={LoginUser} />
              <Route
                path="/register"
                render={() => <CreateUser errorInfo={errorInfo} />}
              />
            </div>
          </div>
        </ContextController>
      </Router>
    </ApolloProvider>
  );
};

export default App;
