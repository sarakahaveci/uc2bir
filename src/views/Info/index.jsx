// @ts-nocheck
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Main from '../../components/Main';

import Title from '../../components/typography/Titles';
import Text from '../../components/typography/Text';

import Svg from '../../components/statics/svg';

/* images */
import img from '../../assets/info/banner/info-img.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getStaticPage } from 'actions';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';

const Info = () => {
  const { t } = useTranslation();
  const staticPages = useSelector((state) => state?.staticPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaticPage('uc2bir-hakkinda'));
  }, []);

  return (
    <Main>
      <div style={{ marginTop: 0 }} className="basic-info">
        <div className="starter">
          <img src={img} alt="" />
        </div>
        <Container className="content">
          <Row>
            <Title
              variant={'h4'}
              component={'h4'}
              textLeft
              lineDisable
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              ÜÇ2BİR
            </Title>
            <Title
              variant={'h3'}
              component={'h3'}
              textLeft
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                textTransform: 'uppercase',
              }}
            >
              {t('About')}
            </Title>

            <div>
              {ReactHtmlParser(
                decode(staticPages?.data?.['uc2bir-hakkinda']?.detail)
              )}
            </div>

            <ul className="base-icon">
              <li className="col-md-3">
                <Svg.InfoHome />
                <span style={{ fontSize: '18px' }}>
                  {t('In an open-air area (park / garden / beach)')}
                </span>
              </li>
              <li className="col-md-3">
                <Svg.InfoOnline />
                <span style={{ fontSize: '18px' }}>Online</span>
              </li>
              <li className="col-md-3">
                <Svg.InfoSport />
                <span style={{ fontSize: '18px' }}>
                  {t('At the contracted sports field or dietitian clinic')}
                </span>
              </li>
            </ul>

            <div className="animation-info-group">
              <Title
                variant={'h4'}
                component={'h4'}
                textLeft
                lineDisable
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                {t('WHY')}
              </Title>
              <Title
                variant={'h3'}
                component={'h3'}
                textLeft
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow:
                    ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                }}
              >
                ÜÇ2BİR?
              </Title>

              <ul className="animation-text">
                <li className="active">
                  {t('Trainers certified by expert teams')}
                </li>
                <li>
                  {t(
                    'Opportunity to change instructors with package purchases'
                  )}
                </li>

                <li>
                  {t(
                    'Educational content in accordance with the personalized curriculum'
                  )}
                </li>
                <li>{t('View past programs and all activities')}</li>
                <li>
                  {t(
                    'Thanks to its ease of use, the infrastructure that can take the consumer to action quickly'
                  )}
                </li>
              </ul>

              {/*<ul className="animation-img">
                <li>
                  <div
                    style={{ backgroundImage: `url(${item1})` }}
                    className="img"
                  ></div>
                </li>
                <li className="active">
                  <div
                    style={{ backgroundImage: `url(${item1})` }}
                    className="img"
                  ></div>
                </li>
                <li>
                  <div
                    style={{ backgroundImage: `url(${item1})` }}
                    className="img"
                  ></div>
                </li>
                <li>
                  <div
                    style={{ backgroundImage: `url(${item1})` }}
                    className="img"
                  ></div>
                </li>
                <li>
                  <div
                    style={{ backgroundImage: `url(${item1})` }}
                    className="img"
                  ></div>
                </li>
              </ul>*/}
            </div>

            <Title
              variant={'h4'}
              component={'h4'}
              textLeft
              lineDisable
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {t('Whoweare')}
            </Title>
            <Title
              variant={'h3'}
              component={'h3'}
              textLeft
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
              }}
            >
              {t('Whoweare2')}
            </Title>

            <Text fontSize="11pt" lineHeight="20px" textAlign="justify">
              {t(
                'We see and live that all the systems we know, from economy to social life, from education to health, are changing and transforming. Technology and digitalization have become more important than anything today. In the process of digital transformation, in order to be in the professions of the future, it is necessary to read the present well and to be at the center of change today. The socio-economic change we live in makes digital transformation inevitable in customers expectations. This digital transformation should not only digitize business processes, but also ensure that it creates benefit and value. Emir Digital Investment was established in 2020 with the mission of technology and digitality to create benefit and value. Our aim; to invest in projects that we believe will create common value and benefit for our customers, colleagues and business partners, and implement them with 100% Turkish capital'
              )}
            </Text>
          </Row>
        </Container>
      </div>
    </Main>
  );
};

export default Info;
