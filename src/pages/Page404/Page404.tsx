import React from 'react';
import {Redirect} from "react-router-dom";

const Page404 = () => {
    return (
        <Redirect
            to={{
                pathname: '/',
            }}
        />
    );
}

export default Page404;