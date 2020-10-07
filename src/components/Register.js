import React, { Component } from "react";
import {
  Redirect,
  Link,
} from "react-router-dom";

class Register extends Component {
  constructor() {
      super();
      this.state = {
          email: "",
          password: "",
          redirect: null
      };
  }

  submitHandler = (event) => {
      event.preventDefault();
      const baseURL = process.env.NODE_ENV === "development"
          ? "http://localhost:1337/register"
          : "https://me-api.linneaolofsson.me/register";

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
            console.log('success, ', data);
            //creates a redirect to login site
            this.setState({ redirect: '/login'});
        })
        .catch((error) => {
            console.error('Error: ', error);
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
            <h3>Registrera dig</h3>

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
                <label>Enter Password (minimum 8 characters)</label>
                <br/>
                <input
                    type='password'
                    name='password'
                    required
                    onChange={this.changeHandler}
                    minLength='8'
                    autoComplete='current-password'
                />
                <br/>
                <input
                    type='submit'
                />
            </form>
                <div className={"content"}>
                    <Link to="login">Logga in</Link>
                </div>
          </main>
      );
  }
}



export { Register };
