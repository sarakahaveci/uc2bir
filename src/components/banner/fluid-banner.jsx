import React from 'react';

const FluidBanner = ({className="", children, backgroundImage, fixed=false}) => {
    return (
        <section className={`fluid-banner ${className}`} style={{backgroundImage: `url(${backgroundImage})`, backgroundAttachment: fixed ? "fixed" : "inherit"}}>
            {children}
        </section>
    );
};

export default FluidBanner;