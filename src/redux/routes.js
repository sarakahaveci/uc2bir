import React from 'react';
import { Router } from "@reach/router";
import Home from '../stateful/pages/home';
import Login from '../stateful/login';

const Routers = () => {
    return (
        <Router>
          <Home path="/" />
          <Login path="/login" />
        </Router>
    )
};

export default Routers;
