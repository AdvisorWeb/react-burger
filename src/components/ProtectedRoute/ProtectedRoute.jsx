import React from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export const ProtectedRoute = ({children, ...rest}) => {
    const location = useLocation();
    const {authorization, authorizationCheck} = useSelector(state => state.authState)
    const profilePath = rest.path === '/profile'

   const toPath = (rest) => {
      if( rest.location.state){
         return rest.location.state.from.pathname
      }
      else {
          return rest.toPath ? rest.toPath : '/'
      }
   }

    return (
        authorizationCheck &&
        <Route
            {...rest}
            render={({location}) =>
                 !authorization
                    ? children
                    : <Redirect
                        to={{
                            pathname: toPath(rest),
                            state: {from: location}
                        }}
                    />
            }
        />
    );
}
