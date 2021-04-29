// @ts-nocheck
import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import UserPacketCard from '../UserPacketCard';
const Home = ({ setPage = () => {} }) => {
  return (
    <>
      <Col style={{ padding: 0 }} lg="4">
        <CardContainer>
          <UserPacketCard
            type="gym"
            onClickDetail={() => {
              setPage('DetailLesson');
            }}
          />
        </CardContainer>
        <CardContainer>
          <UserPacketCard
            type="dt"
            onClickDetail={() => {
              setPage('DetailLesson');
            }}
          />
        </CardContainer>
      </Col>
    </>
  );
};

const CardContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
export default Home;
