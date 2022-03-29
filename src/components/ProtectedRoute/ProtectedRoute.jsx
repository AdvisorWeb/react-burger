import React, {useMemo} from 'react';
import {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

export const ProtectedRoute = ({children, ...rest}) => {
    const {authorization} = useSelector(state => state.authState)
    const profilePath = rest.path === '/profile'


    return (
        <Route
            {...rest}
            render={({location}) =>
                authorization
                    ? profilePath
                        ? children
                        : <Redirect
                            to={{
                                pathname: rest.toPath ? rest.toPath : '/',
                                state: {from: location}
                            }}
                        />
                    : profilePath
                        ? <Redirect
                            to={{
                                pathname: rest.toPath ? rest.toPath : '/',
                                state: {from: location}
                            }}
                        />
                        : children
            }
        />
    );
}
