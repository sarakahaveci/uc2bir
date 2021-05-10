import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Svg } from 'components';

const Header = ({ className, navLogo, navMenu, toggle, setToggle }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(false);
  const [menu, setMenu] = useState(false);

  useLayoutEffect(() => {
    const page = document.getElementById('pt-point-page');
    const menu = document.getElementById('pt-point-menu');
    if (toggle) {
      page.classList.add('open-hamburger-menu');
      menu.classList.add('open');
    } else {
      page.classList.remove('open-hamburger-menu');
      menu.classList.remove('open');
    }
    setPage(page);
    setMenu(menu);
  });

  const toggleEl = (toggle) => {
    if (!toggle) {
      page.classList.add('open-hamburger-menu');
      menu.classList.add('open');
    } else {
      page.classList.remove('open-hamburger-menu');
      menu.classList.remove('open');
    }
    return setToggle(!toggle);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <nav className={className}>
      <div className="col-auto hamburgers left-menu">
        <div
          className={`svg-hamburder-menu ${toggle ? 'h-open' : 'h-close'}`}
          onClick={() => toggleEl(toggle)}
        >
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
      <Link to="/" className={navLogo.className}>
        <img src={navLogo.element()} alt="logo" style={{ width: '110px' }} />
      </Link>

      {isMobile && isAuthenticated ? (
        <UsernameWrapper to="/myprofile/settings/profile">
          <Svg.UsernameIcon />

          <span>{user?.name}</span>
        </UsernameWrapper>
      ) : (
        <div className="col-auto hamburgers right-menu">
          <Svg.Search />
        </div>
      )}

      <div id="pt-point-menu" className={navMenu.className}>
        {navMenu.element()}
      </div>
    </nav>
  );
};

const UsernameWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 65px;

  span {
    color: black;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
`;

export default Header;
