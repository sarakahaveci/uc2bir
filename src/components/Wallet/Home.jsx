import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text, Title, Accordion, Button } from 'components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';
import Wrapper from './Wrapper';

const Home = ({ setPage }) => {
  const { t } = useTranslation();
  const { balance } = useSelector((state) => state?.userProfile?.wallet.data);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <Title fontSize="13pt" style={{ padding: 15 }} textAlign="left">
              {t('my wallet')}
            </Title>
          </Col>
          <Col lg="4">
            <ImageBanner src={image} />
          </Col>
          <Col lg="7">
            <Title fontSize="12pt" textAlign="left">
              {t('my wallet')}
            </Title>
            <>
              <Text fontSize="10pt">
                {t(
                  'You can view the amount in your account and your account activities, and transfer TL to your bank'
                )}
              </Text>
              <Explanation>
                <Col>
                  <Title textAlign="left">
                    {t('Total Amount in My Wallet')}:
                  </Title>
                </Col>
                <Col>
                  <TitleWrapper>
                    <Title textAlign="right" style={{ display: 'flex' }}>
                      {parseFloat(balance).toFixed(2)}₺
                    </Title>
                  </TitleWrapper>
                </Col>
              </Explanation>
              <Accordion>
                <Wrapper />
              </Accordion>
              <Button
                style={{
                  textDecoration: 'underline',
                  display: 'block',
                  marginTop: '20px',
                }}
                fontWeight="600"
                color="blue"
                text={t('Go to My Account Activity >')}
                onClick={() => setPage('activities')}
              />
              {user?.type_id === 1 && (
                <Button
                  style={{ textDecoration: 'underline', display: 'block' }}
                  fontWeight="600"
                  color="blue"
                  text={t('Top Up My Wallet >')}
                  onClick={() => setPage('UserTransfer')}
                />
              )}

              <Col>
                <Row>
                  {user?.type_id !== 1 && (
                    <Button
                      style={{
                        textDecoration: 'underline',
                        display: 'block',
                      }}
                      fontWeight="600"
                      color="blue"
                      text={t('Transfer Balance in My Account >')}
                      onClick={() => setPage('TransferInfo')}
                    />
                  )}
                </Row>
              </Col>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;

const Explanation = styled.section`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:before {
    content: '';
    background: var(--blue3);
    position: absolute;
    width: calc(100%);
    height: 100%;
    left: -15px;
    transform: matrix(1, 0, -0.4, 1, 0, 0);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export default Home;
