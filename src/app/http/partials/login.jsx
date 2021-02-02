// @ts-nocheck
import React from 'react';
import Main from '../../sub-page/Main';
import SubPages from '../../sub-page/SubPages';
import Layout from '../layout';

import {default as LoginSubPage} from "../../sub-page/login/Login";

const Login = () => {
    return (
        <Layout>
            <Main className="main">
                <SubPages>
                    <LoginSubPage/>
                </SubPages>
            </Main>
        </Layout>
    );
};

export default Login;