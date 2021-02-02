import React from 'react';

import {default as NativeMain} from '../app/sub-page/Main';

/**
 * @param {JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>} props
 */
const Main = (props) => {
    return (
        <NativeMain {...props}>
            {props.children}
        </NativeMain>
    );
};

export default Main;