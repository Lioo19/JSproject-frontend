import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { auth } from "./Auth.js";

import io from "socket.io-client";


const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/marketplace/"
    : "https://me-api.linneaolofsson.me/marketplace/";

const socketURL = process.env.NODE_ENV === "development"
    ? "http://localhost:8300/"
    : "https://project-socket.linneaolofsson.me";

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
        data: {
            labels: [],
            datasets: [{
                label: "hej!",
                data: []
            }]
        }
      };

      this.socket = io(socketURL);

      this.chartReference = React.createRef();
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

      let self = this;
      this.socket.on('stocks', (message) => {
          message.map((object) => {
              if (object.nr === parseInt(this.state.nr)) {
                  self.state.data.datasets[0].data.push(object.startingPoint);
              }

              self.setState(self.state);
          });
          //labels necessary to write out correct graph
          self.state.data.labels.push(
              new Date().toLocaleTimeString()
          );
      });
  };

  //When leaving, disconnect the socket
  componentWillUnmount() {
      this.socket.disconnect();
  }

  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(133, 255, 144, 0");
    return gradient;
  }

  getChartData = (canvas) => {
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
      const object = this.state;

      return (

          <>
          {
              console.log(this.state.data.datasets[0].data)
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
