import React, { Component } from "react";

import { auth } from "./Auth.js";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/marketplace/"
    : "https://me-api.linneaolofsson.me/marketplace/";

class Product extends Component {
  // The <Route> that rendered this component has a
  // path of `/Marketplace/:ReportId`. The `:ReportId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  constructor() {
      super();
      this.state = {
        nr: "",
        name: "",
        latin: "",
        img: "",
        user: "",
      };
  }

  componentDidMount() {
      fetch(baseURL + "product/" + this.props.match.params.nr)
          .then(response => response.json())
          .then(data => {
              this.setState({
                  nr: data.data.nr,
                  name: data.data.name,
                  latin: data.data.latin,
                  img: data.data.img,
                  user: data.data.user
              });
          });
  };

/* Hur fasiken få rjag fram bilden på ett rimligt sätt?*/
  render() {
      const object = this.state;

      return (
          <>
          {
              console.log(auth.token)
          }
          <div className={"productContent"} >
              <h1>{object.name}</h1>
              <figure className={"objectCardLarge"}>
              <div className="imgdiv">
                  {object.img ?
                      <img
                          src={require(`../img/${object.img}`)}
                          className={"thumbLarge"}
                          alt={`${object.name}`}/>
                      :
                      <p>no-img</p>
                  }
              </div>
                  <p>Namn: {object.name}</p>
                  <p>Latinskt namn: {object.latin}</p>
                  <p>Objektsnummer: {object.nr}</p>
              </figure>
              {
                  auth.token ?
                  <p>{`Inloggad`}</p>
                  :
                  <p>{`Inte inloggad`}</p>
              }
          </div>
          </>
      )
  }
}


export { Product };
