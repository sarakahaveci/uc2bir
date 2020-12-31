// @ts-nocheck
import React from 'react';

const Header = ({className, navLogo, navMenu}) => {
    return (
        <nav className={className}>
            <div className={navLogo.className}>
                <img src={navLogo.element()}/>
            </div>
            <div className={navMenu.className}>
                {navMenu.element()}
            </div>
        </nav>
    );
};

export default Header;