// @ts-nocheck
import React from 'react';

import Layout from '../layout';
import SubPages from '../../sub-page/SubPages';

import Main from '../../../components/Main';

import {default as InfoSubPage} from '../../sub-page/info/Info';

const Info = () => {
    return (
        <Layout>
            <Main className="main">
                <SubPages>
                    <InfoSubPage className="basic-info"/>
                </SubPages>
            </Main>
        </Layout>
    );
};

export default Info;