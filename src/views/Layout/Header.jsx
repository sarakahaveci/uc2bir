import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import { default as NativeHeader } from '../../components/Header';
import logo from '../../assets/logo.png';
import { AwesomeIcon, IconLabel, Button, HeaderLogin } from '../../components';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const history = useHistory();

  const [menuActive, setMenuActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  const nav_logo = {
    status: true,
    className: 'col logo',
    element: () => logo,
  };

  const nav_widget = {
    status: true,
    className: 'widget-bar bar col-auto d-flex',
    element: () => {
      return (
        <div className={nav_widget.className}>
          <Row className="nav-element">
            <div className="bar-item left-bar">
              <ul>
                <li>
                  <IconLabel
                    href="mailto:info@uc2bir.com"
                    className="icon-label"
                    text="info@uc2bir.com"
                    icon={AwesomeIcon.Envolope}
                  />
                </li>
                <li>
                  <IconLabel
                    href="tel:05XXXXXXXXX"
                    className="icon-label"
                    text="05XX XXX XX XX"
                    icon={AwesomeIcon.Phone}
                  />
                </li>
                <li
                  onClick={() => setToggle(!toggle)}
                  className="d-xl-none dropdown flex-column"
                >
                  Kategoriye Göre Arama
                  <ul className={`dropdown ${toggle ? 'open' : 'close'}`}>
                    <li>
                      {/* TODO: Add function */}
                      <a onClick={() => {}}>EĞİTMEN</a>
                    </li>
                    <li>
                      <a onClick={() => {}}>SALON</a>
                    </li>
                    <li>
                      <a onClick={() => {}}>DİYETİSYEN</a>
                    </li>
                    <li>
                      <a onClick={() => {}}>HARİTA</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/*<div className="bar-item right-bar">
              <div className="lang">
                <a href="#">TR</a> / <a href="#">EN</a>
              </div>
            </div>*/}
          </Row>
        </div>
      );
    },
  };

  const nav_menu = {
    status: true,
    className: 'container nav-menu center d-flex flex-column',
    element: () => {
      return (
        <>
          {nav_widget.element()}
          <div className="menu-bar bar col d-flex">
            <Row className="nav-element">
              <div className="bar-item left-bar">
                <ul>
                  <li>
                    <Button
                      icon={AwesomeIcon.Search}
                      text="Ne arıyorsun?"
                      className="blue"
                    />
                  </li>
                  <li>
                    <Link to="/info">Üç2Bir HAKKINDA</Link>
                  </li>
                  <li>
                    <a href="#">BLOG</a>
                  </li>
                </ul>
              </div>
              <div className="bar-item right-bar">
                <ul>
                  {isAuthenticated ? (
                    <HeaderLogin
                      type_id={1}
                      user={user}
                    />
                  ) : (
                    <>
                      <li>
                        <Link to="/login">Giriş Yap</Link>
                      </li>
                      <li className="line">
                        <span></span>
                      </li>
                    </>
                  )}

                  {isAuthenticated ? (
                    ''
                  ) : (
                    <li>
                      <Link to="/register">Üye Ol</Link>
                    </li>
                  )}
                  {!isAuthenticated && (
                    <li>
                      <Button
                        text="Profesyonel"
                        className="dark"
                        fontWeight="500"
                        onClick={() => history.replace('/profesyonel/register')}
                      />
                    </li>
                  )}
                </ul>
              </div>
            </Row>
          </div>
        </>
      );
    },
  };

  return (
    <NativeHeader
      className="header position-fixed"
      navLogo={nav_logo}
      navMenu={nav_menu}
      toggle={menuActive}
      setToggle={() => setMenuActive(!menuActive)}
    />
  );
};

export default Header;
