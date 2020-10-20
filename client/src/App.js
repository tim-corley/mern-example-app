import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import EditBug from "./components/EditBug";
import AddBug from "./components/AddBug";
import CreateUser from "./components/CreateUser";
import BugsList from "./components/BugsList";
import "./styles.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1">
            <NavBar />
          </div>
          <div className="col-span-11">
            <Route path="/" exact component={Home} />
            <Route path="/bugs" component={BugsList} />
            <Route path="/edit/:id" component={EditBug} />
            <Route path="/add" component={AddBug} />
            <Route path="/user" component={CreateUser} />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
