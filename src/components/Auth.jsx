import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from "../helpers/auth-helper";
import routes from "../routes";

const Auth = () => {
    const auth = useAuth();

    return (
        auth.token ? <Redirect to={routes.channelsPagePath()}></Redirect>
            : <Redirect to={routes.loginFormPath()}></Redirect>
    )
}

export default Auth;