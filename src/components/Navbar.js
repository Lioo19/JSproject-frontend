import React, { Component } from 'react'
import { Link } from "react-router-dom"

// import { auth } from "./Auth.js";



//Växling mellan inloggning funkar inte just nu, kolla på detta senare
class Navbar extends Component {
  render() {
    return (
        <>
        <div className="App">
          <nav className="navBar">
            <li>
              <Link to="/">Hem</Link>
            </li>
            <li>
              <Link to="/marketplace">Marknad</Link>
            </li>
            <li>
              <Link to="/login">Logga in</Link>
            </li>
            <li>
              <Link to="/profile/:id">Profil</Link>
            </li>
          </nav>
         </div>
        </>
    )
  }
}

export { Navbar };
