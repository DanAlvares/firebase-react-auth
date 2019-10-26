import React from 'react';
import firebase from '../firebase';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => firebase.auth().signOut()}>Log out</button>
        </div>
    );
}

export default Home;
