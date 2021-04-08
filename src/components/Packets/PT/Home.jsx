// @ts-nocheck
import React from 'react';
import { Col } from 'react-bootstrap';

import PacketCard from '../PacketCard';
const Home = ({ setPage = () => {} }) => {
  return (
    <>
      <Col lg="4" style={{}}>
        <PacketCard
          onClickEdit={() => {
            setPage('EditLesson');
          }}
        />
        <PacketCard />
      </Col>
    </>
  );
};

export default Home;
