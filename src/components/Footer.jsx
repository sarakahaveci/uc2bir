import React from 'react';

// @ts-ignore
import logo from '../images/logo.png';
import AwesomeIcon from '../statics/icon';
import Svg from '../statics/svg';
import IconLabel from './buttons/icon-label';
import Title from './typography/title';

// @ts-ignore
import downloadRow from '../statics/background/images/download-row.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="item footer-left">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="item-lists">
          <div className="list">
            <Title
              color="white"
              textLeft
              lineDisable
              variant="h6"
              component="h6"
              children="321 Hakkında"
            />
            <ul>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
            </ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textLeft
              lineDisable
              variant="h6"
              component="h6"
              children="Yardım Merkezi"
            />
            <ul>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
            </ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textLeft
              lineDisable
              variant="h6"
              component="h6"
              children="Bilgilendirme"
            />
            <ul>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
            </ul>
          </div>
          <div className="list">
            <Title
              color="white"
              textLeft
              lineDisable
              variant="h6"
              component="h6"
              children="İletişim"
            />
            <ul>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <a href="#">Lorem Ipsum</a>
              </li>
              <li>
                <IconLabel
                  href="mail:info@uc2bir.com"
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
            </ul>
          </div>
        </div>
      </div>
      <div className="item footer-right">
        <div className="item">
          <div className="item-lists">
            <Title
              color="blue"
              textLeft
              lineDisable
              variant="h4"
              component="h4"
              children="Populer Tag"
            />
            <ul>
              <li>
                <a href="#">DİYETİSYEN</a>
              </li>
              <li>
                <a href="#">CROSSFIT</a>
              </li>
              <li>
                <a href="#">YOGA</a>
              </li>
              <li>
                <a href="#">EĞİTMENLER</a>
              </li>
              <li>
                <a href="#">BOOKS</a>
              </li>
              <li>
                <a href="#">MEDİTASYON</a>
              </li>
              <li>
                <a href="#">BESLENME</a>
              </li>
              <li>
                <a href="#">SALON</a>
              </li>
              <li>
                <a href="#">FİTNES</a>
              </li>
            </ul>
            <ul className="social">
              <li>
                <a href="#">
                  <AwesomeIcon.Facebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <AwesomeIcon.Twitter />
                </a>
              </li>
              <li>
                <a href="#">
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
              <a href="#"></a>
            </li>
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
