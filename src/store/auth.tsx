import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

export const AuthContext = React.createContext(null as any);

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null) as any;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}