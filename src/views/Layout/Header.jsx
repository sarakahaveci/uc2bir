/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { default as NativeHeader } from '../../components/Header';
import logo from '../../assets/logo.png';
import { AwesomeIcon, IconLabel, Button, HeaderLogin } from 'components';

const Header = () => {
  const { infoData } = useSelector((state) => state.footer);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [menuActive, setMenuActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      setMenuActive(false);
    });
  }, [history.location.pathname]);

  const nav_logo = {
    status: true,
    className: 'col logo justify-content-center',
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
                    href={`mailto:${infoData?.email}`}
                    className="icon-label"
                    text={infoData?.email}
                    icon={AwesomeIcon.Envolope}
                  />
                </li>

                <li>
                  <IconLabel
                    className="icon-label"
                    text={infoData?.phone}
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
                      <a>EĞİTMEN</a>
                    </li>
                    <li>
                      <a>SALON</a>
                    </li>
                    <li>
                      <a>DİYETİSYEN</a>
                    </li>
                    <li>
                      <a>HARİTA</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
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
                    <Link to="/info">Üç2Bir Hakkında</Link>
                  </li>
                  <li>
                    <Link to="/blog-list">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">İletişim</Link>
                  </li>
                </ul>
              </div>
              <div className="bar-item right-bar">
                <ul>
                  {isAuthenticated ? (
                    <HeaderLogin type_id={user?.type_id} user={user} />
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

                  {!isAuthenticated && (
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
                        onClick={() => history.push('/profesyonel/register')}
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
