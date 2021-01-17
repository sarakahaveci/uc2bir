// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Link } from "gatsby";
import Svg from '../../statics/svg';

import { Pivot as Hamburger } from 'hamburger-react';

const Header = ({className, navLogo, navMenu}) => {
    useLayoutEffect(() => {
        const page = document.getElementById("pt-point-page");
        const menu = document.getElementById("pt-point-menu");
        setPage(page);
        setMenu(menu);
    });

    const [page, setPage] = useState(false);
    const [menu, setMenu] = useState(false);
    const [toggle, setToggle] = useState(false);

    const toggleEl = (toggle) => {
        if (!toggle) {
            page.classList.add("open-hamburger-menu");
            menu.classList.add("open");
        } else {
            page.classList.remove("open-hamburger-menu");
            menu.classList.remove("open");
        }
        return setToggle(!toggle);
    }

    return (
        <nav className={className}>
            <div className="col-auto hamburgers left-menu">
                {/*<Svg.Menu/>*/}
                <a onClick={() => toggleEl(toggle)}><Hamburger color="#000" easing="ease-in" onToggle={toggled => toggleEl(toggled)} /></a>
            </div>
            <Link to="/" className={navLogo.className}>
                <img src={navLogo.element()}/>
            </Link>
            <div className="col-auto hamburgers right-menu">
                <Svg.Search/>
            </div>
            <div id="pt-point-menu" className={navMenu.className}>
                {navMenu.element()}
            </div>
        </nav>
    );
};

export default Header;