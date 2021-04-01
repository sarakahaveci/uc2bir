import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PacketCard from './PacketCard';
import { Lessons } from 'components';

const Packets = () => {
  useEffect(() => {}, []);

  useEffect(() => {}, []);
  return (
    <Container>
      <Row>
        <PacketCard />
        <Lessons />
      </Row>
    </Container>
  );
};

export default Packets;
