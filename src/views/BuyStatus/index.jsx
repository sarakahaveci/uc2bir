import React from 'react';
import styled from 'styled-components/macro';
import profileImg from '../../assets/banner/slider-item-1.png';

import { Svg, svgBackground } from 'components';
import { Main } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
const BuyStatus = ({ match }) => {
  let history = useHistory();
  const location = useLocation();

  function SuccessCard() {
    return (
      <CardContainer>
        <Svg.SmileyFaceIcon></Svg.SmileyFaceIcon>
        <h4 style={{ marginTop: '10px' }}>Teşekkürler!</h4>
        <h5>Ödeme işleminiz başarı ile tamamlandı</h5>
        <RouteLink
          onClick={() => {
            history.push('/myprofile/settings/reservation');
          }}
        >
          Rezervasyonlarıma Git
        </RouteLink>
      </CardContainer>
    );
  }
  function FailCard() {
    return (
      <CardContainer>
        <RedBackground mb="25px">
          <Svg.SadFaceIcon></Svg.SadFaceIcon>
        </RedBackground>
        <h4 style={{ marginTop: '10px' }}>Malesef!</h4>
        <h5>
          Ödeme işlemi başarısız oldu. Lütfen Kart bilgilerinizi kontrol edip
          tekrar deneyiniz.
        </h5>
        <RouteLink
          onClick={() => {
            history.push('/');
          }}
        >
          Anasayfaya Git
        </RouteLink>
      </CardContainer>
    );
  }

  return (
    <Main>
      {!(
        location.pathname === '/mobile/buy/success' ||
        location.pathname === '/mobile/buy/fail'
      ) && <img src={profileImg} alt="" className="banner-image" />}
      <Container>
        {match?.params?.status === 'success' && <SuccessCard />}
        {match?.params?.status === 'fail' && <FailCard />}
      </Container>
    </Main>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 1200px;
  padding: 0 15%;
  justify-content: space-between;
  margin-top: 30px;
`;
const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  align-items: center;
`;
const RouteLink = styled.text`
  margin-top: 30px;
  color: var(--blue);
  text-decoration: underline;
  cursor: pointer;
`;
const RedBackground = styled.div`
  ${svgBackground};
  background-color: ${(p) => p.theme.colors.red};
`;

export default BuyStatus;
//
