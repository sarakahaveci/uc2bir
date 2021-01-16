// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Link } from "gatsby";
import Svg from '../../statics/svg';

import { Pivot as Hamburger } from 'hamburger-react';

const Header = ({className, navLogo, navMenu}) => {
    const [page, setPage] = useState(false);
    useLayoutEffect(() => {
        const page = document.getElementById("pt-point-page");
        setPage(page);
    });

    return (
        <nav className={className}>
            <div onClick={() => page.classList.toggle("open-hamburger-menu")} className="col-auto hamburgers left-menu">
                {/*<Svg.Menu/>*/}
                <Hamburger color="#000" />
            </div>
            <Link to="/" className={navLogo.className}>
                <img src={navLogo.element()}/>
            </Link>
            <div className="col-auto hamburgers right-menu">
                <Svg.Search/>
            </div>
            <div className={navMenu.className}>
                {navMenu.element()}
            </div>
        </nav>
    );
};

export default Header;