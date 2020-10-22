import React, { Component } from 'react'
import { Link } from "react-router-dom"

// import { auth } from "./Auth.js";



//Växling mellan inloggning funkar inte just nu, kolla på detta senare
//importera auth för att kunna lägga relativ route för användare? Nödvändigt?
class Footer extends Component {
  render() {
    return (
        <>
        <div className="footer">
            <div className="footercol">
                <li className="footerli1">
                  <Link to="/login">Hur gör jag en trade?</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/register">Skapa ett konto</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/marketplace">Göra en trade</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/marketplace">Kategorier</Link>
                </li>
            </div>
            <div className="footercol">
                <li className="footerli1">
                  <Link to="/login">Kontakt</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Frågor & svar</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Regler</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Kontakta oss</Link>
                </li>
            </div>
            <div className="footercol">
                <li className="footerli1">
                  <Link to="/login">Om oss</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Om Växra</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Press</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Jobba hos oss</Link>
                </li>
                <br/>
                <li className="footerli2">
                  <Link to="/profile/">Nyheter</Link>
                </li>

            </div>
         </div>
        </>
    )
  }
}

export { Footer };
