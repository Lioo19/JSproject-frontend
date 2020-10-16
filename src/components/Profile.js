import React, { Component } from "react";


import { auth } from "./Auth.js";


class Profile extends Component {
  constructor() {
      super();
      this.state = {
          username: "",
          balance: "",
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
              console.log(data);
              this.setState({ objects: data });
          });
  };

// Should sell product
  submitHandler = (event) => {
      event.preventDefault();
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337/profile"
          : "https://me-api.linneaolofsson.me/profile";

      let payload={
          'email': this.state.email,
          'password': this.state.password
      }

      fetch(baseURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
            console.log('success, ', data);
            //creates a redirect to login site
            this.setState({ redirect: '/login'});
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
  };

  changeHandler = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value})
  };

  render() {
      const { objects } = this.state;

      return (
          <main>
            <div className={"profile"}>
                <h3>PROFIL</h3>
                <div>
                  {auth.token ?
                      <div>
                        <p>{auth.username}</p>
                        <p>{auth.balance}</p>
                    </div>
                      :
                      <p>Ej inloggad</p>
                  }
                </div>
            </div>
            <div className={"profileprods"}>
                {this.state.objects.length !== 0 ?
                    objects.map(object =>
                        <li key={object.nr}>
                            <a href={`marketplace/product/${object.nr}`}>
                                <figure className={"objectCard"}>
                                    <img
                                        src={require(`../img/${object.img}`)}
                                        className={"thumb"}
                                        alt={`${object.name}`}/>
                                    <p>{object.name}</p>
                                    <p>{object.latin}</p>
                                    <button>Sälj</button>
                                </figure>
                            </a>
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
