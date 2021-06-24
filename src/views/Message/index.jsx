// @ts-nocheck
import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import Main from 'components/Main';
import Message from 'components/ProfileSettings/Message';
import profileImg from '../../assets/banner/slider-item-1.png';

const Info = ({ match }) => {
  return (
    <Main>
      <div  style={{ marginTop: '0px',minHeight:'121vh'}} className="basic-info">
      <img  src={profileImg} alt="" className="banner-image" />

        <Container>
          <Wrapper>
          <Message id={match?.params?.id} />
          </Wrapper>
        </Container>
      </div>
    </Main>
  );
};
const Container = styled.div`
  position:absolute;
  width: 100%;
  padding: 0 80px;
  @media ${device.sm} {
    padding: 0;
  }
  margin-top:-15px;
  z-index:4;
`;
const Wrapper = styled.div`
  padding:20px 6px;
  border-radius:10px;
  background:white;
`
export default Info;
