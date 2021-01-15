// @ts-nocheck
import React from 'react';
import { Link } from "gatsby";

const Header = ({className, navLogo, navMenu}) => {
    return (
        <nav className={className}>
            <Link to="/" className={navLogo.className}>
                <img src={navLogo.element()}/>
            </Link>
            <div className={navMenu.className}>
                {navMenu.element()}
            </div>
        </nav>
    );
};

export default Header;