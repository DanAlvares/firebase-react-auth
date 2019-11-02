import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

export const AuthContext = React.createContext(null as any);

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null) as any;

   
    useEffect(() =>{
        firebase.auth().onAuthStateChanged(authUser => {
           console.log(authUser)
            authUser
              ? setCurrentUser(authUser.providerData[0])
              : setCurrentUser(null);
          },
       );
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}