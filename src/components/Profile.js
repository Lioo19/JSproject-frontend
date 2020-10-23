import React, { Component } from "react";
import {
    Redirect,
} from "react-router-dom";

import io from "socket.io-client";

import { auth } from "./Auth.js";

import AccountCircle from '@material-ui/icons/AccountCircle';

const socketURL = process.env.NODE_ENV === "development"
    ? "http://localhost:8400/"
    : "https://project-socket.linneaolofsson.me";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/profile/"
    : "https://project-api.linneaolofsson.me/profile/";


class Profile extends Component {
  constructor() {
      super();
      this.state = {
          username: auth.username,
          balance: parseFloat(auth.balance).toFixed(2),
          amount: "",
          number: "",
          msg: "",
          objects: [],
          withPrices: [],
          redirect: null
      };

      this.socket = io(socketURL);
  }

  componentDidMount() {
      fetch(baseURL + auth.username)
          .then(response => response.json())
          .then(data => {
              this.setState({ objects: data });
          });

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
      });
  };

// Should sell product
  sellHandler = (event) => {
      event.preventDefault();
      const sellURL = process.env.NODE_ENV === "development"
          ? `http://localhost:1337/profile/${this.state.username}/sell`
          : `https://project-api.linneaolofsson.me/profile/${this.state.username}/sell`;

      //amount should be set with the socket-value
      let payload={
          'nr': event.target[0].value,
          'who': this.state.username,
          'amount': event.target[1].value
      }

      fetch(sellURL, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': `${auth.token}`
          },
          body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
            let total = parseInt(payload.amount) + parseInt(this.state.balance);
            auth.balance = total;
            this.setState({ balance: total, msg: "Objekt sålt!" });
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
  };

  // Should add to account balance
  addHandler = (event) => {
      event.preventDefault();
      this.setState({ username: auth.username });

      const baseURL = process.env.NODE_ENV === "development"
          ? `http://localhost:1337/profile/${this.state.username}/addCurrency`
          : `https://project-api.linneaolofsson.me/profile/${this.state.username}/addCurrency`;

      let payload={
          'amount': this.state.amount,
          'username': this.state.username
      }

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
            let total = parseInt(this.state.amount) + parseInt(this.state.balance);
            auth.balance = total;
            this.setState({ balance: total });
          })
        .catch((error) => {
            console.error('Error: ', error);
        });
  };
//works for every form-part if nescessary
  changeAddHandler = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value});
  };

  render() {
      const { objects } = this.state;
      const { withPrices } = this.state;

      if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }

      return (
          <main>
            <div className={"content"}>
                <div className={"profile"}>

                  {auth.token ?
                      <>
                        <h3>{this.state.username}</h3>
                        <AccountCircle />
                        <p>Saldo: {this.state.balance}</p>
                        <br/>
                        <form onSubmit={this.addHandler} className="profileadd">
                        <label>Vill du öka ditt saldo?</label>
                            <br/>
                            <input
                                className="saldoinp"
                                type="number"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.changeAddHandler}
                            />
                            <input
                                className="saldobutton"
                                type="submit"
                                value="Lägg till"
                            />
                        </form>
                    </>
                      :
                      <>
                      <AccountCircle />
                      <p>Ej inloggad</p>
                      </>
                  }
                </div>
                {this.state.objects.length !== 0 ?
                    <>
                    <h4 className="msg">Objekt i din ägo</h4>
                    </>
                    :
                    <br/>
                }
                {this.state.msg.length !== 0 ?
                    <p>{this.state.msg}</p>
                :
                    <p></p>
                }
            </div>
                <div className={"profileprods"}>
                    {withPrices.length !== 0 ?
                        withPrices.map(object =>
                            <li key={object.nr}>
                                <figure className={"objectCard"}>
                                    <img
                                        src={require(`../img/${object.img}`)}
                                        className={"thumb"}
                                        alt={`${object.name}`}/>
                                    <p>{object.name}</p>
                                    {object.boughtfor ?
                                        <p>Köpt för <i>{object.boughtfor}</i> kr</p>
                                        :
                                        <i className="msg"> Inköpspris saknas</i>
                                    }
                                    <p>Pris: <i>{parseFloat(object.startingPoint).toFixed(2)}</i></p>
                                        <form onSubmit={this.sellHandler} className="buyForm">
                                        <input
                                            type="hidden"
                                            name="nr"
                                            value={object.nr}
                                            />
                                        <input
                                            type="hidden"
                                            name="value"
                                            value={object.startingPoint}
                                            />
                                            <input
                                                type="submit"
                                                value="sälj"
                                            />
                                        </form>
                                </figure>
                            </li>
                        )
                        :
                        objects.length !== 0 ?
                            <p>Produkter laddas</p>
                            :
                            <p> Inga produkter att visa </p>
                        }

                </div>
          </main>
      );
  }
}



export { Profile };
