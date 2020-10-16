import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

import { Home } from "./components/Home.js";
import { Navbar } from "./components/Navbar.js";
import { Login } from "./components/Login.js";
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

export default function App() {

  return (
    <Router>
        <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
