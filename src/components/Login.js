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

// submithandler fixed so that username and balance is saved in auth
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
                auth.username = data.data.username;
                auth.balance = data.data.balance;
                this.setState({ msg: 'Login successful', redirect: '/profile'});
            } else if (data.errors) {
                auth.token = "";
                auth.username = "";
                auth.balance = "";
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
              <h2>Login</h2>
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
