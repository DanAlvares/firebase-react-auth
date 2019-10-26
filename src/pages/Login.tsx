import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase";
import { AuthContext } from "../store/auth";

const Login = ({ history }:any) => {
  const handleLogin =  (event: any) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      
      app.auth().signInWithEmailAndPassword(email.value, password.value)
          .then((res) => {
              console.log('login', res)
              history.push("/"); 
        }).catch((error) => alert(error))
    }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);