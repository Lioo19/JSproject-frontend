import React, { Component } from "react";
import frontimg from "../frontimg.jpg";

import { auth } from "./Auth.js";

class Home extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.hometext = ``;
  }

  componentDidMount() {
      console.log(auth.token);
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337"
          : "https://me-api.linneaolofsson.me";

      fetch(baseURL)
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data.data.msg});
              // console.log(this.state.data);
          });
  };

  render() {
      return (
        <div className="fpageDiv">
            <div className="left">
            <h1>{this.state.data.h2}</h1>
            <h4>{this.state.data.h4}</h4>
            <p>{this.state.data.p1}</p>
            <p>{this.state.data.p2}</p>
            <i>{this.state.data.i1}</i>
            </div>
            <div className="right">
                <Image />
            </div>
        </div>
      );
  }
}


function Image() {
    return <img src={frontimg} className="frontimg" alt="Sidans skapare i öknen" />;
}

export { Home };
