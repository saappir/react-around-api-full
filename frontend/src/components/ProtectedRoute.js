import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { children, loggedIn } = props
  return (
    <Route>
      {
        (() => loggedIn ? children : <Redirect to='/signin' />)
      }
    </Route>
  );
}

export default ProtectedRoute;
