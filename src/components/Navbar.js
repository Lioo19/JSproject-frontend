import React, { Component } from 'react'
import { Link } from "react-router-dom"

// import { auth } from "./Auth.js";



//Växling mellan inloggning funkar inte just nu, kolla på detta senare
//importera auth för att kunna lägga relativ route för användare? Nödvändigt?
class Navbar extends Component {
  render() {
    return (
        <>
        <Link className="logo" to="/">Växra</Link>
        <div className="App">
          <nav className="navBar">
            <li className="navLi">
              <Link to="/">Hem</Link>
            </li>
            <li className="navLi">
              <Link to="/marketplace">Marknad</Link>
            </li>
            <li className="navLi">
              <Link to="/login">Logga in</Link>
            </li>
            <li className="navLi">
              <Link to="/profile/ß">Profil</Link>
            </li>
          </nav>
         </div>
        </>
    )
  }
}

export { Navbar };
