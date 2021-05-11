/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { default as NativeHeader } from '../../components/Header';
import logo from '../../assets/logo.png';
import { AwesomeIcon, IconLabel, Button, HeaderLogin, Svg, Material } from 'components';

const Header = () => {
  const { infoData } = useSelector((state) => state.footer);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [menuActive, setMenuActive] = useState(false);
  const [isOpenSearchWhatBox, setIsOpenSearchWhatBox] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const [search, setSearch] = useState('');
  const history = useHistory();


  const handleSearchWhatClick = () => {
    setIsOpenSearchWhatBox(!isOpenSearchWhatBox)
  }

 
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
                    {/* <div className="menubar-search-wrapper">
                      <AwesomeIcon.Search />
                      <input
                        className="menubar-search-input"
                        placeholder="Ne Arıyorsun?"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div> */}

                    <Button
                      icon={AwesomeIcon.Search}
                      text="Ne arıyorsun?"
                      className="blue"
                      onClick={() => { handleSearchWhatClick() }}
                    />
                  </li>
                  <li>
                    <Link
                      to="/info"
                      style={{ fontWeight: 'normal', color: 'black' }}
                    >
                      Üç2Bir HAKKINDA
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog-list" style={{ fontWeight: 'normal' }}>
                      BLOG
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" style={{ fontWeight: 'normal' }}>
                      İLETİŞİM
                    </Link>
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
                        <Link
                          to="/login"
                          style={{ fontWeight: 'normal', color: 'black' }}
                        >
                          Giriş Yap
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
                        Üye Ol
                      </Link>
                    </li>
                  )}

                  {!isAuthenticated && (
                    <li>
                      <Button
                        style={{ fontWeight: 'normal', color: 'white' }}
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
    <div style={{ display: "flex", flexDirection: "row" }} >
      <NativeHeader
        className="header position-fixed"
        navLogo={nav_logo}
        navMenu={nav_menu}
        toggle={menuActive}
        setToggle={() => setMenuActive(!menuActive)}
      />
      {isOpenSearchWhatBox &&
        <GridWrapper>
          <StyledDiv>
            <AwesomeIcon.Keyboard color="white" />
            <StyledInput
              placeholder={"Ne arıyorsun"}
            />
          </StyledDiv>
          <StyledDiv>
            <AwesomeIcon.Map color="white" />
            <StyledInput
              placeholder={"Lokasyon... "}
            />
          </StyledDiv>
          <StyledDiv>
            <AwesomeIcon.Bars color="white" />
            <Material.SimpleSelect
              placeholder="Tüm Kategoriler"
              items={[{ id: 'Option1', name: 'Option1' },
              { id: 'Option2', name: 'Option2' },
              { id: 'Option3', name: 'Option3' },]}  
              // onChange={(e) => {} }  
            />
          </StyledDiv>
          <Button
            text="Ara"
            icon={AwesomeIcon.Search}
            className="blue"
            onClick={() => { handleSearchWhatClick() }}
          />
        </GridWrapper> 
      } 
    </div>
  );
};
import styled from 'styled-components/macro';
import { device } from 'utils';
// ${(p) => p.theme.colors.gray1} input bg 
const GridWrapper = styled.div`
margin-top:130px;
position: fixed;
z-index: 10000; 
width:100%;
height:100px;  
  display: grid; 
  grid-column-gap: 10px;
   justify-content:center;
   align-items:center;
   background-color: ${(p) => p.theme.colors.dark} ;
  grid-template-columns: 240px 240px 240px 100px;
  grid-row-gap: 10px; 

  @media (max-width: 1200px) {
    height:150px;
    grid-template-columns: 400px 400px; 
    margin-top:90px; 
  }  
  @media (max-width: 768px) {
    margin-top:90px; 
  }
  @media ${device.sm} {
    height:250px;
    grid-template-columns: auto;
  } 
`;
const StyledDiv = styled.div`
background: ${(p) => p.theme.colors.gray1};
max-width:300px;
height:50px;
display:flex;
flexDirection:row;
justify-content:space-between;
align-items:center;
padding:7px;  
@media ${device.sm} {
  height:35px; 
} 
.text-input{
  background-color:red;
  @media ${device.sm} {
    padding:-50px;
  } 
}
`;

const StyledInput = styled.input`
flex: 1;
height: 40px;
width: 100%; 
background: transparent;
border: none;
padding:5px;
font-size: 0.9rem; 

&::placeholder {
  font-size: 0.9rem;
  color: white; 
}
@media ${device.sm} {
  height:30px; 
} 
`
export default Header;
