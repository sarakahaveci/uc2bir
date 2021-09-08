// @ts-nocheck
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Main from '../../components/Main';

import Title from '../../components/typography/Titles';
import Text from '../../components/typography/Text';

import Svg from '../../components/statics/svg';

/* images */
import img from '../../assets/info/banner/info-img.png';
import { useTranslation } from 'react-i18next';

const Info = () => {
  const { t } = useTranslation();

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

            <Text fontSize="11pt" lineHeight="20px">
              {t(
                'Our story is the story of thousands of people at the same time… Life is fast, the city is big, the roads are crowded, the days are tiring, the time is tight, the economy is tight, the corona is all     around… and we: We will be the brand of those who make excuses, the timeless, the unsolvable, the ones who have given up and those who are fond of freedom. We will be a source of appetite, passion,  enthusiasm, motivation and energy for sports. We will not be chasing, we will be chasing, we will produce solutions, not problems, we will prepare together for the goals that you can think and realize on your behalf'
              )}
            </Text>
            <Text
              textAlign="center"
              fontSize="14pt"
              color="#00b2a9"
              style={{
                marginTop: 15,
                marginBottom: 15,
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              {t(
                'We have started the countdown to offer world-class sports support on the digital platform… We would be very happy to see you among us'
              )}
            </Text>
            <Text fontSize="11pt" lineHeight="20px">
              {t(
                'üç2bir; It is a digital platform with web and mobile infrastructure, where you can find everything about a healthy life such as sports, diet, sports fields, sports events, you can easily use, buy as much as you need, give control to the user and create a great freedom in this regard. The platform, which consists of expert sports trainers and dietitians, offers users the opportunity to meet the demand for private lessons whenever and wherever they want. The user, who accesses the platform via the web or mobile, can choose the sports branch he wants, contact the expert sports trainer and do the lesson wherever he wants. With the freedom of space created according to the users choice, you can get trainer or dietitian services wherever you want'
              )}
            </Text>

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

            <Text fontSize="11pt" lineHeight="20px">
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
