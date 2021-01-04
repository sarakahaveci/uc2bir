import React from 'react';

/**
 * @param {JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>} props
 */
const Root = ({className, children}) => {
    return (
        <section className={`${className} app-root`}>
            {children}
        </section>
    );
};

export default Root;