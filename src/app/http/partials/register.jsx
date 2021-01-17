// @ts-nocheck
import React from 'react';
import Main from '../../middleware/Main';
import Root from '../../middleware/Root';
import Master from '../master';

import {default as DefaultRegister} from '../../middleware/Register';

const Register = () => {
    return (
        <Master>
            <Main className="main">
                <Root>
                    <DefaultRegister/>
                </Root>
            </Main>
        </Master>
    );
};

export default Register;