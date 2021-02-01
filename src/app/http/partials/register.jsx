// @ts-nocheck
import React from 'react';
import Main from '../../sub-page/Main';
import SubPages from '../../sub-page/SubPages';
import Layout from '../layout';

import {default as RegisterSubPage} from '../../sub-page/register/Register';

const Register = () => {
    return (
        <Layout>
            <Main className="main">
                <SubPages>
                    <RegisterSubPage/>
                </SubPages>
            </Main>
        </Layout>
    );
};

export default Register;