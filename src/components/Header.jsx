import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

import { default as NativeHeader } from "../app/middleware/Header";
// @ts-ignore
import logo from "../images/logo.png";
import AwesomeIcon from '../statics/icon';
import IconButtonLabel from './buttons/icon-button-label';
import IconLabel from './buttons/icon-label';
import Button from './buttons/button';

import { Link, navigate } from "gatsby";

import { connect } from "react-redux";
import {searchChangeNameButton} from '../redux/reducers/search';
import {hamburgerActionButton} from '../redux/reducers/hamberger';
import { bindActionCreators } from "redux";

const Header = ({ loginReducers, searchChangeNameButton, actionLeftBar, hamburgerActionButton }) => {
    const nav_logo = {
        status: true,
        className: "col logo",
        element: () => logo
    }

    const [toggle, setToggle] = useState(false);

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
                                <li onClick={() => setToggle(!toggle)} className="d-xl-none dropdown flex-column">
                                    Kategoriye Göre Arama
                                    <ul className={`dropdown ${toggle ? "open": "close"}`}>
                                        <li><a onClick={() => {searchChangeNameButton("pt"); hamburgerActionButton(!actionLeftBar); return navigate("/");}}>EĞİTMEN</a></li>
                                        <li><a onClick={() => {searchChangeNameButton("living"); hamburgerActionButton(!actionLeftBar); return navigate("/");}}>SALON</a></li>
                                        <li><a onClick={() => {searchChangeNameButton("nutritionist"); hamburgerActionButton(!actionLeftBar); return navigate("/");}}>DİYETİSYEN</a></li>
                                        <li><a onClick={() => {searchChangeNameButton("map"); hamburgerActionButton(!actionLeftBar); return navigate("/");}}>HARİTA</a></li>
                                    </ul>
                                </li>
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
                                    <li><a href="#">Üç2Bir HAKKINDA</a></li>
                                    <li><a href="#">BLOG</a></li>
                                </ul>

                            </div>
                            <div className="bar-item right-bar">
                                <ul>
                                    {!loginReducers.entity.token ? <li><Link to="/login">Giriş Yap</Link></li> : <li><Link to="profile"><AwesomeIcon.User style={{color: "#585858", fontSize: "10pt", marginRight: 7}}/> {`${loginReducers.entity.user.name}`}</Link></li>}
                                    {!loginReducers.entity.token ? <li className="line"><span></span></li> : ""}
                                    {!loginReducers.entity.token ? <li><Link to="/register">Üye Ol</Link></li> : ""}
                                    {!loginReducers.entity.token && <li><Button className="" text="Profosyonel" dark /></li>}
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
            toggle={actionLeftBar}
            setToggle={hamburgerActionButton}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ searchChangeNameButton, hamburgerActionButton }, dispatch),
    }
}

const mapStateToProps = ({ loginReducers, actionSearchButton, actionLeftBar }) => ({ loginReducers, actionSearchButton, actionLeftBar });

export default connect(mapStateToProps, mapDispatchToProps)(Header);