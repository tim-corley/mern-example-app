import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import EditBug from "./components/EditBug";
import AddBug from "./components/AddBug";
import CreateUser from "./components/CreateUser";
import BugsList from "./components/BugsList";
import "./styles.css";

const App = () => {
  return (
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
  );
};

export default App;
