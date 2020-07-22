import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../../services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        console.log('---> rest <---', rest);
        // const currentUser = authenticationService.currentUserValue;
        // let currentUser = authenticationService.getJWTToken();
        let currentUser = authenticationService.decryptData();
        console.log('---PrivateRoute ---',currentUser)
        // cases
        // If page is refreshed , how to handle this
        // 
        if (!currentUser) {
            console.log('---PrivateRoute -User not available--',currentUser)
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
        // authorised so return component
        return <Component {...props} />
    }} />
)

//RTMP