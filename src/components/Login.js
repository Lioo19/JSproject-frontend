import React, { Component } from "react";
import {
    Redirect,
    Link,
} from "react-router-dom";

import { auth } from "./Auth.js";

class Login extends Component {
  constructor() {
      super();
      this.state = {
          email: "",
          password: "",
          redirect: null,
          msg: ""
        };
  }

  submitHandler = (event) => {
      event.preventDefault();
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337/login"
          : "https://me-api.linneaolofsson.me/login";

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
            if (data.data) {
                auth.token = data.data.token;
                this.setState({ msg: 'Login successful'});
            } else if (data.errors) {
                auth.token = "";
                this.setState({ msg: data.errors.detail });
            }
        })
        .catch((error) => {
            this.setState({ msg: error.details });
        });
  };

  changeHandler = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value})
  };

  render() {
      if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }
      return (
          <main>
              <h2>Logga In</h2>
              <p className={"infomsg"}>{this.state.msg}</p>
              <form onSubmit={this.submitHandler}>
                  <label>Enter email </label>
                  <br/>
                  <input
                      type='text'
                      name='email'
                      required
                      onChange={this.changeHandler}
                      autoComplete='username'
                  />
                  <br/>
                  <label>Enter Password </label>
                  <br/>
                  <input
                      type='password'
                      name='password'
                      required
                      onChange={this.changeHandler}
                      autoComplete='current-password'
                  />
                  <br/>
                  <input
                      type='submit'
                  />
              </form>
              <div className={"content"}>
                <Link to="register">Registrering</Link>
              </div>
          </main>
      );
  }
}



export { Login };
