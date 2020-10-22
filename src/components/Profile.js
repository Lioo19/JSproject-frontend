import React, { Component } from "react";
import {
    Redirect,
} from "react-router-dom";


import { auth } from "./Auth.js";

import AccountCircle from '@material-ui/icons/AccountCircle';


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
          redirect: null
      };
  }

  componentDidMount() {
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337/profile/"
          : "https://me-api.linneaolofsson.me/profile/";

      fetch(baseURL + auth.username)
          .then(response => response.json())
          .then(data => {
              this.setState({ objects: data });
          });
  };

// Should sell product
  sellHandler = (event) => {
      event.preventDefault();
      const baseURL = process.env.NODE_ENV === "development"
          ? `http://localhost:1337/profile/${this.state.username}/sell`
          : `https://me-api.linneaolofsson.me/profile/${this.state.username}/sell`;



      //amount should be set with the socket-value
      let payload={
          'nr': event.target[0].value,
          'who': this.state.username,
          'amount': 10
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
          : `https://me-api.linneaolofsson.me/profile/${this.state.username}/addCurrency`;

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

      if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }

      return (
          <main>
            <div className={"content"}>
                <h1>PROFIL</h1>
                <div className={"profile"}>
                <AccountCircle />

                  {auth.token ?
                      <>
                        <p>{this.state.username}</p>
                        <p>Saldo: {this.state.balance}</p>
                        <br/>
                        <p>Vill du öka ditt saldo?</p>
                        <form onSubmit={this.addHandler}>
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
                      <p>Ej inloggad</p>
                  }
                </div>
                {this.state.objects.length !== 0 ?
                    <p className="blah">Objekt i din ägo</p>
                    :
                    <br/>
                }
            </div>
            <div className={"profileprods"}>
                {this.state.objects.length !== 0 ?
                    objects.map(object =>
                        <li key={object.nr}>
                            <figure className={"objectCard"}>
                                <img
                                    src={require(`../img/${object.img}`)}
                                    className={"thumb"}
                                    alt={`${object.name}`}/>
                                <p>{object.name}</p>
                                <p>{object.latin}</p>
                                    <form onSubmit={this.sellHandler}>
                                    <input
                                        type="hidden"
                                        name="nr"
                                        value={object.nr}
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
                    <p> Inga produkter ännu </p>
                    }
            </div>
          </main>
      );
  }
}



export { Profile };
