import React from 'react';
import { Row } from 'react-bootstrap';

import { default as NativeHeader } from "../app/middleware/Header";
// @ts-ignore
import logo from "../images/logo.png";
import AwesomeIcon from '../statics/icon';
import IconButtonLabel from './buttons/icon-button-label';
import IconLabel from './buttons/icon-label';
import Button from './buttons/button';

const Header = () => {
    const nav_logo = {
        status: true,
        className: "logo",
        element: () => logo
    }

    const nav_widget = {
        status: true,
        className: "widget-bar bar col-auto d-flex",
        element: () => {
            return (
                <div className={nav_widget.className}>
                    <Row className="nav-element">
                        <div className="bar-item left-bar">
                            <ul>
                                <li><IconLabel href="mail:info@ptpoints.com" className="icon-label" text="info@ptpoints.com" icon={AwesomeIcon.Envolope} /></li>
                                <li><IconLabel href="tel:05XXXXXXXXX" className="icon-label" text="05XX XXX XX XX" icon={AwesomeIcon.Phone} /></li>
                            </ul>
                        </div>
                        <div className="bar-item right-bar">
                            <div className="lang"><a href="#">TR</a> / <a href="#">EN</a></div>
                        </div>
                    </Row>
                </div>
            )
        }
    }

    const nav_menu = {
        status: true,
        className: "container nav-menu center d-flex flex-column",
        element: () => {
            return (
                <>
                    {nav_widget.element()}
                    <div className="menu-bar bar col d-flex">
                        <Row className="nav-element">
                            <div className="bar-item left-bar">
                                <ul>
                                    <li><IconButtonLabel className="icon-button" icon={AwesomeIcon.Search} text="Ne arıyorsun?" /></li>
                                    <li><a href="#">321 HAKKINDA</a></li>
                                    <li><a href="#">BLOG</a></li>
                                </ul>
                            </div>
                            <div className="bar-item right-bar">
                                <ul>
                                    <li><a href="#">Giriş Yap</a></li>
                                    <li className="line"><span></span></li>
                                    <li><a href="#">Üye Ol</a></li>
                                    <li><Button className="" text="Profosyonel" dark/></li>
                                </ul>
                            </div>
                        </Row>
                    </div>
                </>
            )
        }
    }

    return (
        <NativeHeader
            className="header position-fixed"
            navLogo={nav_logo}
            navMenu={nav_menu}
        />
    );
};

export default Header;