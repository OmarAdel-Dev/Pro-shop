import React from "react"
import {Route, Redirect} from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({location, component: Component, path, ...rest }) => {

  const state = useSelector(state => state.userLogin);
  const {userInfo} = state;
  const pathToBeRedirected = path.toString().slice(1);
  
  return (
    <Route {...rest} render={
      props => {
        if (userInfo) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              search: `?redirect=${pathToBeRedirected}`,
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute