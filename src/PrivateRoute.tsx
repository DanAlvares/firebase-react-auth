import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './store/auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={(routeProps: any) => currentUser
            ? <RouteComponent {...routeProps} />
            : <Redirect to={'/login'} /> 
        } />
    )
}

export default PrivateRoute;