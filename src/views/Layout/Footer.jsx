/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getFooterInfo } from 'actions';
import logo from 'assets/logo.png';
import { AwesomeIcon, IconLabel, Title, Box } from 'components';
import AppStore from 'assets/app-store.png';
import GooglePlay from 'assets/google-play.png';
import { device } from 'utils';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  const { tags, infoData, pages } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(getFooterInfo());
  }, []);

  return (
    <footer className="footer">
      <div className="item footer-left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="item-lists">
          <div className="list">
            <Title
              style={{ textTransform: 'capitalize' }}
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
              className="cp"
              onClick={() => history.push('/info')}
            >
              {t('aboutUs')}
            </Title>
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
              paddingTop="10px"
            >
              {t('Information')}
            </Title>
            <ul>

              {pages?.length > 0 && pages?.map((elm,index) => (
                <li key={index}>
                  <Link  to={'/static/' + elm?.seo_friendly_url}>{elm?.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="list">
            <Title
              color="white"
              textAlign="left"
              lineDisable
              variant="h6"
              component="h6"
              className="cp"
              onClick={() => history.push('/contact')}
            >
              {t('contact')}
            </Title>
            <ul className="footer-contact__wrapper">
              <li>
                <IconLabel
                  href={`tel:${infoData?.phone}`}
                  className="icon-label"
                  text={infoData?.phone}
                  icon={AwesomeIcon.Phone}
                />
              </li>
              <li>
                <IconLabel
                  href={`mailto:${infoData?.email}`}
                  className="icon-label"
                  text={infoData?.email}
                  icon={AwesomeIcon.Email}
                />
              </li>
              <li className="w-75">
                <IconLabel
                  className="icon-label"
                  text={infoData?.address}
                  icon={AwesomeIcon.Map}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="item footer-right">
        <div className="item d-flex align-items-center">
          <div className="item-lists">
            <Title color="blue" textAlign="left" lineDisable fontSize="28px">
              {t('Popular Tags')}
            </Title>
            <ul>
              {tags.map((tag) => (
                <li key={tag?.name}>
                  <a href={tag?.link}>{tag?.name}</a>
                </li>
              ))}
            </ul>
            <ul className="social">
              <li>
                <a href={infoData?.facebook} target="_blank">
                  <AwesomeIcon.Facebook />
                </a>
              </li>
              <li>
                <a href={infoData?.youtube} target="_blank">
                  <AwesomeIcon.Youtube />
                </a>
              </li>
              <li>
                <a href={infoData?.instagram} target="_blank">
                  <AwesomeIcon.Instagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>

      <Box
        //row
        alignItems="center"
        //justifyContent="space-between"
        background="gray12"
        width="100%"
      //flexWrap="wrap"
      >
        <div id="ETBIS" style={{ textAlign: 'center' }}>
          <div id="3625302186051115">
            <a
              href="https://etbis.eticaret.gov.tr/sitedogrulama/3625302186051115"
              target="_blank"
            >
              <img
                style={{ width: '100px', height: '120px' }}
                src="data:image/jpeg;base64, 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"
              />
            </a>
          </div>
        </div>

        <pre>
          ©<span>{new Date().getFullYear()}</span> uc2bir All Rights Reserved
        </pre>

        <DownloadButtonRowWrapper>
          <DownloadButtonRow>
            <li>
              <a href={infoData?.android_app_link} target="_blank">
                <img src={GooglePlay} className="google-play" />
              </a>
            </li>

            <li>
              <a href={infoData?.ios_app_link} target="_blank">
                <img src={AppStore} className="app-store" />
              </a>
            </li>
          </DownloadButtonRow>
        </DownloadButtonRowWrapper>
      </Box>
    </footer>
  );
};

export default Footer;

const DownloadButtonRowWrapper = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 20px;
  // transform: translateX(-50%);
`;

const DownloadButtonRow = styled.ul`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  .app-store {
    width: 182px;
    height: 55px;
  }

  .google-play {
    width: 180px;
    height: 55px;
  }

  @media ${device.sm} {
    flex-direction: column;

    .google-play {
      margin-bottom: 15px;
      margin-right: unset;
      margin-top: 50px;
      margin-left: 3px;
    }
  }
`;
