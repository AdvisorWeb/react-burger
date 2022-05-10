import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "../../services/store";


export const ProtectedRoute: ({children, ...rest}: { children: any; [p: string]: any }) => false | any = ({children, ...rest}) => {

    const {authorization, authorizationCheck} = useSelector(state => state.authState)

    const toPath = (rest: any) => {
        if (rest.location.state) {
            return rest.location.state.from.pathname
        } else {
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
