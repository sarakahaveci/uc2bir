import React from 'react';

const FluidBanner = ({className="", children, backgroundImage}) => {
    return (
        <section className={`fluid-banner ${className}`} style={{backgroundImage: `url(${backgroundImage})`}}>
            {children}
        </section>
    );
};

export default FluidBanner;