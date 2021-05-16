// @ts-nocheck
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { clearReservation, setReservation } from 'actions';
import { useDispatch } from 'react-redux';
import UserPacketCard from '../UserPacketCard';
const Home = ({ setPage = () => {} }) => {
  const dispatch = useDispatch();
  const myPackets = useSelector((state) => state.myPackets.user?.data);
  useEffect(() => {}, [myPackets]);
  return (
    <>
      <Col style={{ padding: 0 }} lg="4">
        {myPackets?.data?.data?.map((elm, i) => (
          <CardContainer key={i}>
            <UserPacketCard
              type={elm?.type}
              branch={elm?.branch}
              sessionTypes={elm?.session_type?.toString()}
              packetName={elm?.name}
              trainerClass={elm?.classification}
              onClickDetail={() => {
                setPage('DetailLesson');
              }}
              onClickReservation={() => {
                dispatch(clearReservation());
                dispatch(setReservation({ package_uuid: elm?.package_uuid }));

                setPage('PacketReservation');
              }}
            />
          </CardContainer>
        ))}
      </Col>
    </>
  );
};

const CardContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
export default Home;
