// @ts-nocheck
import React from 'react';
import Main from '../../middleware/Main';
import Root from '../../middleware/Root';
import Master from '../master';

import {default as DefaultLogin} from "../../middleware/Login";

const Login = () => {
    return (
        <Master>
            <Main className="main">
                <Root>
                    <DefaultLogin/>
                </Root>
            </Main>
        </Master>
    );
};

export default Login;