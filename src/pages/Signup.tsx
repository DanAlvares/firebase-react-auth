import React from 'react';
import { withRouter } from 'react-router';
import app from '../firebase';

const Signup = ({ history }: any) => {
    const handleSignUp =  (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        
        app.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((res) => {
                console.log('signup', res)
                history.push("/"); 
          }).catch((error) => alert(error))
    }
    
    return (
        <form onSubmit={handleSignUp}>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Signup</button>
        </form>
    );
}

export default withRouter(Signup);
