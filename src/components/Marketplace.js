import React, { Component } from "react";
import { Line } from "react-chartjs-2";


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
          withPrices: [],
          data: [{ dataset: [23, 24, 27, 21, 19] }]
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
              // console.log(cake)

              this.setState({
                  withPrices: [...this.state.withPrices, cake] })
          });
          // console.log(this.state);


          // console.log(this.state.withPrices);

      });

      // console.log(this.chartReference);
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

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
        let colors = ["rgba(187, 2, 30, 1)", "rgba(2, 94, 187, 1)", "rgba(220, 227, 28, 1)"];
        let borderColors = ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"]
        data.datasets.forEach((set, i) => {
            set.backgroundColor = this.setGradientColor(canvas, colors[i]);
            set.borderColor = this.setGradientColor(canvas, borderColors[i]);
            set.borderWidth = 2;
        })
    }

    return data;
  }


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
                        <Line
                            data={this.getChartData}
                            options= {{
                            title: {
                                display: true,
                                text: "Hej",
                                fontSize: 18,
                                //maintainAspectRatio: false,
                                responsive: true
                            },
                            }}
                            />
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
