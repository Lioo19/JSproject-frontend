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
          'password': this.state.password,
          'username': this.state.username
      }

      console.log(payload);
      fetch(baseURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error: ', error);
        })
        .then(data => {
            console.log('success, ', data);
            //creates a redirect to login site
            this.setState({ redirect: '/login'});
        })
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
            <h1>Registrera dig</h1>
            <div className={"loginContent"}>
                <form className={"login"} onSubmit={this.submitHandler}>
                    <label>Användarnamn</label>
                    <br/>
                    <input
                        type='text'
                        name='username'
                        required
                        onChange={this.changeHandler}
                    />
                    <br/>
                    <label>Email </label>
                    <br/>
                    <input
                        type='text'
                        name='email'
                        required
                        onChange={this.changeHandler}
                    />
                    <br/>
                    <label>Lösenord <br/><i>(minst 8 karaktärer)</i></label>
                    <br/>
                    <input
                        type='password'
                        name='password'
                        required
                        onChange={this.changeHandler}
                        minLength='8'
                    />
                    <br/>
                    <input
                        type='submit'
                        value='registrera dig'
                    />
                </form>
                <Link to="login">Logga in</Link>
                </div>
          </main>
      );
  }
}



export { Register };
