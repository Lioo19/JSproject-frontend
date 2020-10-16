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
import { Product } from "./Product.js";

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
      <Switch>
        <Route exact path={path}>
          <h2>Marketplace</h2>
          <Market />
        </Route>
        <Route path={`${path}/product/:nr`} component={Product}>
        </Route>
      </Switch>
    </div>
  );
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
              this.setState({ objects: data });
          });
  };

  render() {
      const { objects } = this.state;


      /*HÄR SKA DET IN GREJER OM MAN ÄR INLOGGAD
          filtrering på  user=none är redan gjord i backend
          om man trycker på knapp när man är inloggad skall en request skickas
          där user=username och balance dras av*/
      return (
          <div className={"content"} >
            {objects.map(object =>
                <li key={object.nr}>
                    <a href={`marketplace/product/${object.nr}`}>
                        <figure className={"objectCard"}>
                            <img
                                src={require(`../img/${object.img}`)}
                                className={"thumb"}
                                alt={`${object.name}`}/>
                            <p>{object.name}</p>
                            <p>{object.latin}</p>
                            {auth.token ?
                                <button>Hejsan</button>
                            :
                            <p>V för kostnad</p>
                        }
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
