import React, { Component } from "react";

import frontimg from "../img/greenery.jpg";

import AccountCircle from '@material-ui/icons/AccountCircle';
import CreditCard from '@material-ui/icons/CreditCard';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import Gavel from '@material-ui/icons/Gavel';


class Home extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.hometext = ``;
  }

  componentDidMount() {
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337"
          : "https://project-api.linneaolofsson.me";

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
            </div>
            <div className="boxes">
                <div className="frontBox">
                    <h4>{this.state.data.headline1}</h4>
                    <AccountCircle />
                    <p>{this.state.data.box1}</p>
                </div>
                <div className="frontBox">
                    <h4>{this.state.data.headline2}</h4>
                    <CreditCard />
                    <p>{this.state.data.box2}</p>
                </div>
                <div className="frontBox">
                    <h4>{this.state.data.headline3}</h4>
                    <LocalFlorist />
                    <p>{this.state.data.box3}</p>
                </div>
            </div>
            <div className="largeFrontBox">
                <h4>{this.state.data.headline4}</h4>
                <Gavel />
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
