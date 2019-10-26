import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './store/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </BrowserRouter>
  </AuthProvider>
)
