/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { default as NativeHeader } from '../../components/Header';
import logo from '../../assets/logo.png';
import { AwesomeIcon, IconLabel, Button, HeaderLogin, Svg } from 'components';
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import i18nx from 'i18next';

const Header = ({ isSearchBarOpen, setIsSearchBarOpen }) => {
  const { infoData } = useSelector((state) => state.footer);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation()
  const [menuActive, setMenuActive] = useState(false);
  const ref = useRef()
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  const [langOpen, setLangOpen] = useState(false)
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (langOpen && ref.current && !ref.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [langOpen])
  function getCurrentLocale() {
    return i18nx.languages[0]?.toLocaleUpperCase()
  }
  const handleSearchWhatClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    setMenuActive(false);
  };

  const handleSearch = () => {
    if (keyword.length >= 3) {

      history.push('/search/' + keyword);
      setIsSearchBarOpen(!isSearchBarOpen);
      setKeyword('');
    } else {
      toast.error('3 Harf ve daha fazlasıyla arama yapabilirsiniz.', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    history.listen(() => {
      setMenuActive(false);
    });
  }, [history.location.pathname]);
  function _langChanger() {
    return (
      <div style={{ position: 'relative', marginLeft: '20px', height: '30px' }} ref={ref}>
        <div
          style={{
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            width: '40px',
            color: 'var(--blue)',
            cursor: 'pointer'
          }}
          onClick={() => setLangOpen(oldState => !oldState)}
        >
          {/* {router.locale?.toUpperCase()} */}
          {getCurrentLocale()}
          <span style={{}}>
            <text style={{ fontSize: '30px' }}> ̬</text>
          </span>
        </div>
        {langOpen && (
          <div
            style={{ position: 'absolute', width: '40px', zIndex: '999999999' }}
          >
            <ul
              style={{
                padding: '5px',
                display: 'flex',
                background: 'white',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {['tr', 'en'].map(locale => (
                <li onClick={() => {
                  i18n.changeLanguage(locale)
                }} style={{ marginTop: '5px' }} key={locale}>
                  <Lang>{locale?.toUpperCase()}</Lang>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
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
                    icon={Svg.HeaderEnvelope}
                  />
                </li>
                <li className="line">
                  <span></span>
                </li>
                <li>
                  <IconLabel
                    className="icon-label"
                    text={infoData?.phone}
                    icon={Svg.HeaderContact}
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
                      text={t('what are you looking for')}
                      className="blue"
                      onClick={() => {
                        handleSearchWhatClick();
                      }}
                    />
                  </li>
                  <li>
                    <Link
                      to="/info"
                      style={{ fontWeight: 'normal', color: 'black' }}
                    >
                      {t('aboutUs')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog-list" style={{ fontWeight: 'normal' }}>
                      BLOG
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/contact" style={{ fontWeight: 'normal' }}>
                      İLETİŞİM
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div className="bar-item right-bar">
                <ul>
                  {isAuthenticated ? (
                    <HeaderLogin type_id={user?.type_id} user={user} />
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          style={{ fontWeight: 'normal', color: 'black' }}
                        >
                          {t('login')}
                        </Link>
                      </li>
                      <li className="line">
                        <span></span>
                      </li>
                    </>
                  )}

                  {!isAuthenticated && (
                    <li>
                      <Link
                        to="/register"
                        style={{ fontWeight: 'normal', color: 'black' }}
                      >
                        {t('signup')}
                      </Link>
                    </li>
                  )}

                  {!isAuthenticated && (
                    <li>
                      <Button
                        style={{ fontWeight: 'normal', color: 'white' }}
                        text={t('proSignup')}
                        className="dark"
                        fontWeight="500"
                        onClick={() => history.push('/profesyonel/register')}
                      />
                    </li>
                  )}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {_langChanger()}
                </div>
              </div>


            </Row>
          </div>
        </>
      );
    },
  };
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      handleSearch();
    }
    if (e.keyCode == 27) {
      setIsSearchBarOpen(!isSearchBarOpen);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <NativeHeader
        className="header position-fixed"
        navLogo={nav_logo}
        navMenu={nav_menu}
        toggle={menuActive}
        setToggle={
          (() => setMenuActive(!menuActive),
            scroll.scrollToTop({
              duration: 1000,
              smooth: true,
            }))
        }
      />
      {isSearchBarOpen && (
        <Wrapper>
          <div className="all-container">
            <StyledDiv>
              <AwesomeIcon.Keyboard color="white" />
              <StyledInput
                onKeyDown={keyPress}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                placeholder={'Ne arıyorsun?'}
              />
            </StyledDiv>
            <Button
              text="Ara"
              icon={AwesomeIcon.Search}
              className="blue"
              onClick={() => {
                handleSearch()
              }}
            />
          </div>
        </Wrapper>
      )}
    </div>
  );
};
import styled from 'styled-components/macro';
import { device } from 'utils';
// ${(p) => p.theme.colors.gray1} input bg
const Wrapper = styled.div`
  margin-top: 130px;
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(p) => p.theme.colors.dark};

  .all-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 70%;
  }

  @media (max-width: 1200px) {
    height: 150px;
    margin-top: 90px;
  }
  @media (max-width: 768px) {
    margin-top: 90px;
  }
  @media ${device.sm} {
    height: 250px;
  }
`;
const StyledDiv = styled.div`
  background: ${(p) => p.theme.colors.gray1};
  width: 50vw;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 9px;
  align-items: center;
  padding: 7px;
  @media ${device.sm} {
    height: 35px;
  }
  .text-input {
    background-color: red;
    @media ${device.sm} {
      padding: -50px;
    }
  }
`;

const StyledInput = styled.input`
  flex: 1;
  height: 40px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 5px;
  font-size: 0.9rem;

  &::placeholder {
    font-size: 0.9rem;
    color: white;
  }
  @media ${device.sm} {
    height: 30px;
  }
`;
const Lang = styled.text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`
export default Header;
