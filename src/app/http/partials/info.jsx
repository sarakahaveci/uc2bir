// @ts-nocheck
import React from 'react';

import Main from '../../../components/Main';
import Master from '../master';
import Root from '../../middleware/Root';

import {default as InfoMiddleware} from '../../middleware/Info';

const Info = () => {
    return (
        <Master>
            <Main className="main">
                <Root>
                    <InfoMiddleware className="basic-info"/>
                </Root>
            </Main>
        </Master>
    );
};

export default Info;