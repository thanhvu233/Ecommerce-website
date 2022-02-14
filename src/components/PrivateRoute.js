import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
    // check localStorage and find property access_token
    // If found: render <Route> tag
    // If not found: redirect to Login page

    const isLogin = Boolean(localStorage.getItem('access_token'));

    return <>{isLogin ? <Route {...props} /> : <Redirect to='/login' />}</>;
}

export default PrivateRoute;
