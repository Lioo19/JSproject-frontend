import React, { Component } from "react";

import frontimg from "../img/greenery.jpg";


class Home extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.hometext = ``;
  }

  componentDidMount() {
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
          <>
          <Image />

        <div className="fpageDiv">
            <div className="firstinfo">
                <h1>{this.state.data.h1}</h1>
                <i>Din plats att tradea sticklingar på nätet</i>
            </div>
            <div className="boxes">
                <div className="frontBox">
                    <h4>{this.state.data.headline1}</h4>
                    <p>{this.state.data.box1}</p>
                </div>
                <div className="frontBox">
                    <h4>{this.state.data.headline2}</h4>
                    <p>{this.state.data.box2}</p>
                </div>
                <div className="frontBox">
                    <h4>{this.state.data.headline3}</h4>
                    <p>{this.state.data.box3}</p>
                </div>
            </div>
            <div className="largeFrontBox">
                <h4>{this.state.data.headline4}</h4>
                <h5>{this.state.data.box4}</h5>
            </div>
        </div>
        </>
      );
  }
}

function Image() {
    return <img src={frontimg} className="frontimg" alt="Header av en växt" />;
}


export { Home };
