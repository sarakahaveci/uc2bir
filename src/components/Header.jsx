import React from 'react';

import { default as NativeHeader } from "../app/middleware/Header";
// @ts-ignore
import logo from "../images/logo.png";

const Header = () => {
    const navLogo = {
        status: true,
        className: "nav-logo",
        element: () => logo
    }

    const navWidget = {
        status: true,
        className: "nav-widget",
        element: () => {
            return (
                <div className="widget">...</div>
            )
        }
    }

    const navMenu = {
        status: true,
        className: "menu center",
        element: () => {
            return (
                <>
                    {navWidget.element()}
                    <div className="menu-bar">
                        <div className="left-bar"></div>
                        <div className="right-bar"></div>
                    </div>
                </>
            )
        }
    }

    return (
        <NativeHeader
            className="header"
            navLogo={navLogo}
            navMenu={navMenu}
        />
    );
};

export default Header;