import React, { Component } from "react";
// import ReactMarkdown from 'react-markdown';

import {
  Switch,
  Route,
 /* Link, */
  useRouteMatch
} from "react-router-dom";

// import { Edit } from "./Edit.js";
// import { Newpost } from "./Newpost.js";
import { auth } from "./Auth.js";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/marketplace/"
    : "https://me-api.linneaolofsson.me/marketplace/";


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
      <h2>Marketplace</h2>
      {/*<ul className="marketplace">
        <li>
          <Link to={`${url}/product/1`}>Product 1</Link>
        </li>
        <li>
          <Link to={`${url}/product/2`}>Product 2</Link>
        </li>
        <li>
          <Link to={`${url}/product/3`}>Product 3</Link>
        </li>
        <li>
          <Link to={`${url}/product/4`}>Product 4</Link>
        </li>
        <li>
          <Link to={`${url}/product/5`}>Product 5</Link>
        </li>
        <li>
          <Link to={`${url}/product/6`}>Product 6</Link>
        </li>
      </ul>
      */}
      <Switch>
        <Route exact path={path}>
          {/*<h4>För att läsa en rapport, välj vecka ovan</h4>*/}
          {/* om jag vill ta bort från report startpage*/}
          <Market />
        </Route>
        <Route path={`${path}/product/:nr`} component={Product}>
        </Route>
         {/*// <Route path={`${path}/edit/:ReportId`} component={Edit}>
        // </Route>*/}
      </Switch>
    </div>
  );
}

class Product extends Component {
  // The <Route> that rendered this component has a
  // path of `/Marketplace/:ReportId`. The `:ReportId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  constructor() {
      super();
      this.state = { data: "" };
  }

  componentDidMount() {
      fetch(baseURL + "product/" + this.props.match.params.nr)
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data.data.name});
          });
  };

  componentDidUpdate(prevProps) {
      if(prevProps.match.params.nr !== this.props.match.params.nr) {
          fetch(baseURL + "product/" + this.props.match.params.nr)
              .then(response => response.json())
              .then(data => {
                  this.setState({ data: data.data.name });
              });
      }
  }

  render() {
      let {
          path,
          /* url */
      } = useRouteMatch();
      if (auth.token) {
          return (
              <main>
                  <div className={"content"} >
                    <h3>{`Inloggad`}</h3>

                  </div>
              </main>
          )
      }
      return (
          <div className={"content"} >
            <h3>{`Inte inloggad`}</h3>
          </div>
      )
  }
}

class Market extends Component {
  // The <Route> that rendered this component has a
  // path of `/Marketplace/:ReportId`. The `:ReportId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  constructor() {
      super();
      this.state = {
          data: "",
          objects: []
      };
  }

  componentDidMount() {
      fetch(baseURL)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              this.setState({ objects: data, data: "hejsan" });
          });
  };

  // componentDidUpdate(prevProps) {
  //     if(prevProps.match.params.nr !== this.props.match.params.nr) {
  //         fetch(baseURL + "product/" + this.props.match.params.nr)
  //             .then(response => response.json())
  //             .then(data => {
  //                 this.setState({ data: data.data.name });
  //             });
  //     }
  // }

  render() {
      const { objects } = this.state;

      if (auth.token) {
          return (
              <div className={"content"} >
                {objects.map(object =>
                    <li key={object.nr}>
                        <a href={`marketplace/product/${object.nr}`}>
                            <figure className={"objectCard"}>
                                <img src={require(`../img/${object.img}`)} className={"thumb"}/>
                                <p>{object.name}</p>
                                <p>{object.latin}</p>
                                <button>Hejsan</button>
                            </figure>
                        </a>
                    </li>
                )}
                <p>Inloggad</p>
              </div>
          )
      }
      return (
          <div className={"content"} >
            {objects.map(object =>
                <li key={object.nr}>
                    <a href={`marketplace/product/${object.nr}`}>
                        <figure className={"objectCard"}>
                            <img src={require(`../img/${object.img}`)} className={"thumb"}/>
                            <p>{object.name}</p>
                            <p>{object.latin}</p>
                        </figure>
                    </a>
                </li>
            )}
            <p>Inte inloggad</p>
          </div>
      )
  }
}

export { Marketplace };
