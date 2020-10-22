import React, { Component } from "react";


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
          objects: [],
          withPrices: []
      };

      this.socket = io(socketURL);

      this.chartReference = React.createRef();
  }

  //gets all objects with user=none
  componentDidMount() {
      fetch(baseURL)
          .then(response => response.json())
          .then(data => {
              this.setState({ objects: data });
          });

      //priserna kommer in på sidan, nu är det bara grafen kvar

      this.socket.on('stocks', (message) => {
          this.setState({ withPrices: [] })
          message.map((cake) => {

              this.state.objects.forEach((item) => {
                  if (cake.nr === item.nr) {
                      this.setState({
                          withPrices: [...this.state.withPrices, cake] })
                  }
              });
          });
          console.log(this.state.withPrices)
      });
  };

  //When leaving, disconnect the socket
  componentWillUnmount() {
      this.socket.disconnect();
  }

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
          'amount': event.target[1].value
      }


      if (this.state.balance < payload.amount) {
          this.setState({ msg: "För lågt saldo på ditt konto"});
      } else if (this.state.username.length !== 0 ) {
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

      if (true) {

      } else if (true) {

      }

  };


  render() {
      const { withPrices } = this.state;
      const { objects } = this.state;

      return (
          <>
          { this.state.msg ?
              <p className="msg">{this.state.msg}</p>
            :
            <p></p>
          }
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
                <li key={object.nr} className={"objectCard"}>
                    <div>
                        <Link to={`marketplace/product/${object.nr}`}>
                            <figure>
                            <img
                                src={require(`../img/${object.img}`)}
                                className={"thumb"}
                                alt={`${object.name}`}/>
                                <p>{object.name}</p>
                            </figure>
                        </Link>
                    </div>
                    {auth.token ?
                        <>
                        <p>Pris:
                        <i> {parseFloat(object.startingPoint).toFixed(2)}</i> kr</p>
                        <form onSubmit={this.buyHandler.bind(this)}>
                            <input
                                type="hidden"
                                name="nr"
                                value={object.nr}
                            />
                            <input
                                type="hidden"
                                name="cost"
                                value={parseFloat(object.startingPoint).toFixed(2)}
                                />
                            <input
                                    type="submit"
                                    value="köp"
                            />
                        </form>
                        </>
                    :
                    <>
                    <p>Pris:
                    <i>{parseFloat(object.startingPoint).toFixed(2)}</i> kr</p>
                    </>
                }

                </li>
            )}
          </div>
          </>
      )
  }
}


export { Marketplace };
