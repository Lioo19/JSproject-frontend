import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Home } from "./components/Home.js";
import { Login } from "./components/Login.js";
import { auth } from "./components/Auth.js";
import { Register } from "./components/Register.js";
import { Profile } from "./components/Profile.js";
import { Marketplace } from "./components/Marketplace.js";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.

// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

//possible to build a "if logged in, show personal page instead'?"
export default function App() {
  if (auth.token) {
      return (
          <Router>
            <div className="App">
              <ul className="navBar">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/marketplace">Market</Link>
                </li>
                <li>
                  <Link to="/profile">{auth.username}</Link>
                </li>
              </ul>

              <Switch>
                <Route path="/marketplace">
                  <Marketplace />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        );
  }

  return (
    <Router>
      <div  className="App">
        <ul className="navBar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/marketplace">Market</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/marketplace">
            <Marketplace />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
