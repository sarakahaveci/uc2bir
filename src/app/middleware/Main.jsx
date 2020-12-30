// @ts-nocheck
import React from 'react';

/**
 * @param {JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>} props
 */
const Main = (props) => {
    return (
        <main {...props}>
            {props.children}
        </main>
    );
};

export default Main;