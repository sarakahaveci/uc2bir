// @ts-nocheck
import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import PacketCard from '../PacketCard';
const Home = ({ setPage = () => {} }) => {
  return (
    <>
      <Col style={{ padding: 0 }} lg="4">
        <CardContainer>
          <PacketCard
            onClickEdit={() => {
              setPage('EditLesson');
            }}
          />
        </CardContainer>
        <CardContainer>
          <PacketCard
            onClickEdit={() => {
              setPage('EditLesson');
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
