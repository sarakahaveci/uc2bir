import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { AwesomeIcon, IconLabel, Title } from '../../components';
import { default as NativeFooter } from '../../components/Footer';

import downloadRow from '../../components/statics/background/images/download-row.png';

const Footer = () => {
  const history = useHistory();

  return (
    <NativeFooter>
      <div className="item footer-left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="item-lists">
          <div className="list">
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
            >
              321 Hakkında
            </Title>
            <ul></ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
            >
              Yardım Merkezi
            </Title>
            <ul></ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
            >
              Bilgilendirme
            </Title>
            <ul>
              <li>
                <a href="/">Kullanım Koşulları</a>
              </li>
              <li>
                <a href="/">Üyelik Sözleşmesi</a>
              </li>
              <li>
                <a href="/">Kişisel Verilerin Korunması</a>
              </li>
              <li>
                <a href="/">İade Koşulları</a>
              </li>
            </ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
              onClick={() => history.push('/contact')}
            >
              İletişim
            </Title>
            <ul>
              <li>
                <IconLabel
                  href="mailto:info@uc2bir.com"
                  className="icon-label"
                  text="info@uc2bir.com"
                  icon={AwesomeIcon.Envolope}
                />
              </li>
              {/*<li>
                <IconLabel
                  href="tel:05XXXXXXXXX"
                  className="icon-label"
                  text="05XX XXX XX XX"
                  icon={AwesomeIcon.Phone}
                />
              </li>*/}
            </ul>
          </div>
        </div>
      </div>
      <div className="item footer-right">
        <div className="item">
          <div className="item-lists">
            <Title
              color="blue"
              textAlign="left"
              lineDisable
              variant="h4"
              component="h4"
            >
              Populer Tag
            </Title>
            <ul>
              <li>
                <a href="/">DİYETİSYEN</a>
              </li>
              <li>
                <a href="/">CROSSFIT</a>
              </li>
              <li>
                <a href="/">YOGA</a>
              </li>
              <li>
                <a href="/">EĞİTMENLER</a>
              </li>
              <li>
                <a href="/">BOOK</a>
              </li>
              <li>
                <a href="/">MEDİTASYON</a>
              </li>
              <li>
                <a href="/">BESLENME</a>
              </li>
              <li>
                <a href="/">SALON</a>
              </li>
              <li>
                <a href="/">FİTNES</a>
              </li>
            </ul>
            <ul className="social">
              <li>
                <a href="/">
                  <AwesomeIcon.Facebook />
                </a>
              </li>
              <li>
                <a href="/">
                  <AwesomeIcon.Twitter />
                </a>
              </li>
              <li>
                <a href="/">
                  <AwesomeIcon.Instagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-and">
        <pre>©2020 321. All Rights Reserved</pre>
        <div className="download-row">
          <ul
            className="download-row"
            style={{ backgroundImage: `url(${downloadRow})` }}
          >
            <li>
              <a href="/"></a>
            </li>
            <li>
              <a href="/"></a>
            </li>
          </ul>
        </div>
      </div>
    </NativeFooter>
  );
};

export default Footer;
