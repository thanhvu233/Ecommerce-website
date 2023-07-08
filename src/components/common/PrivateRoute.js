import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import userApi from '../../API/userApi';

function PrivateRoute(props) {
  // check localStorage and find property access_token
  // If found: render <Route> tag
  // If not found: redirect to Login page

  const history = useHistory();

  const checkLogin = async () => {
    try {
      const { data } = await userApi.getCurrentUser();

      if (data) {
        return true;
      }

      return false;
    } catch (error) {
      localStorage.clear();
      localStorage.setItem('path', props.path);

      history.push('/login');

      return false;
    }
  };

  return <>{checkLogin() ? <Route {...props} /> : <Redirect to='/login' />}</>;
}

export default PrivateRoute;
