import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} render={ props => {
        //renders dashboard if user is logged in
        if (isLoggedIn) {
          return <Component {...rest} {...props} />
        //Loading state while user is checked
        } else if(isLoggedIn === null){
          return "Loading..."
        //Redirects if user is not logged in
        }else if(isLoggedIn === false){
          return <Redirect to='/' />
        }
      }
    } />
  )
}

export { ProtectedRoute }