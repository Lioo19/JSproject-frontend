import React, { Component } from "react";
// import ReactMarkdown from 'react-markdown';

import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import io from "socket.io-client";

import { auth } from "./Auth.js";
import { Product } from "./Product.js";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/marketplace/"
    : "https://me-api.linneaolofsson.me/marketplace/";

const socketURL = process.env.NODE_ENV === "development"
    ? "http://localhost:8300/"
    : "https://project-socket.linneaolofsson.me";

function Marketplace() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let {
      path,
      /* url */
  } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <h1>Marknad</h1>
          <Market />
        </Route>
        <Route path={`${path}/product/:nr`}>
            <Product />
        </Route>
      </Switch>
    </div>
  );
}

class Market extends Component {
  constructor() {
      super();
      this.state = {
          username: auth.username,
          balance: auth.balance,
          data: "",
          objects: [],
          withPrices: []
      };

      this.socket = io(socketURL)
  }

  //gets all objects with user=none
  //Every time the component mounts, should there be an update in price? more often?
  componentDidMount() {
      fetch(baseURL)
          .then(response => response.json())
          .then(data => {
              this.setState({ objects: data });
          });
      //
      // this.socket.on('test', () => {
      //     console.log("connected")
      // });

      //priserna kommer in på sidan, nu är det bara grafen kvar

      this.socket.on('stocks', (message) => {
          this.setState({ withPrices: [] })
          message.map((cake) => {

              this.setState({ withPrices: [...this.state.withPrices, cake] })
          });
          //writes out the entire object with price, name, everything.
          console.log(this.state.withPrices);
      });

      // this.socket.on('disconnect', () => {
      //     console.log("Disconnected");
      // });
  };

  // Handler for buying each individual Product
  // when socket's done, it should decide the price
  buyHandler = (event) => {
      event.preventDefault();
      const baseURL = process.env.NODE_ENV === "development"
          ? `http://localhost:1337/marketplace/buy/${event.target[0].value}`
          : `https://me-api.linneaolofsson.me/marketplace/buy/${event.target[0].value}`;

      //amount should be set with the socket-value
      let payload={
          'nr': event.target[0].value,
          'who': this.state.username,
          'amount': 10
      }

      if (this.state.username.length !== 0) {
          fetch(baseURL, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': `${auth.token}`
              },
              body: JSON.stringify(payload)
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              this.setState({ msg: "Objekt Köpt" });
          })
          .catch((error) => {
              console.error('Error: ', error);
              this.setState({ msg: "Något gick fel med ditt köp, försök igen"});
          });
      } else {
          this.setState({ msg: "Något gick fel med ditt köp, försök igen"});
      }

  };

  render() {
      const { withPrices } = this.state;


      /*HÄR SKA DET IN GREJER OM MAN ÄR INLOGGAD
          filtrering på  user=none är redan gjord i backend
          om man trycker på knapp när man är inloggad skall en request skickas
          där user=username och balance dras av*/
      return (
          <>
          {
              auth.token ?
              <div>
              </div>
              :
              <div className="center">
                <p>Vill du tradea en stickling? Vänligen
                <Link to="login"> logga in</Link>
                </p>
              </div>
          }
          <div className={"marketContent"} >
            {withPrices.map(object =>
                <li key={object.nr}>
                    <Link to={`marketplace/product/${object.nr}`}>
                        <figure className={"objectCard"}>
                            <img
                                src={require(`../img/${object.img}`)}
                                className={"thumb"}
                                alt={`${object.name}`}/>
                            <p>{object.name}</p>
                            {auth.token ?
                                <>
                                <p>Pris: </p>
                                <i>{object.startingPoint}</i>
                                <form onSubmit={this.buyHandler}>
                                <input
                                    type="hidden"
                                    name="nr"
                                    value={object.nr}
                                    />
                                    <input
                                        type="submit"
                                        value="köp"
                                    />
                                </form>
                                </>
                            :
                            <>
                            <p>Pris: </p>
                            <i>{object.startingPoint}</i>
                            </>
                        }
                        </figure>
                    </Link>
                </li>
            )}
          </div>
          </>
      )
  }
}


export { Marketplace };
