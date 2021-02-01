import React from 'react';

/**
 * @param {JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>} props
 */
const SubPages = ({className, children}) => {
    return (
        <section className={`${className} app-root`}>
            {children}
        </section>
    );
};

export default SubPages;