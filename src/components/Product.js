import React, { Component } from "react";
// import ReactMarkdown from 'react-markdown';

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
        user: ""
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
          <div className={"content"} >
              <h2>{object.name}</h2>
              <figure className={"objectCardLarge"}>
              {object.img ?
                  <img
                      src={require(`../img/${object.img}`)}
                      className={"thumb"}
                      alt={`${object.name}`}/>
                  :
                  <p>no-img</p>
              }
                  <p>{object.name}</p>
                  <p>{object.latin}</p>
                  <p>{object.img}</p>
                  <p>{object.nr}</p>
              </figure>
              Varför fungerar den inte när man är inloggad här, men i marketplace?
              {
                  console.log("this is auth" + auth.token)
              }{
                  auth.token ?
                  <p>{`Inloggad`}</p>
                  :
                  <p>{`Inte inloggad`}</p>
              }
          </div>
      )
  }
}


export { Product };
