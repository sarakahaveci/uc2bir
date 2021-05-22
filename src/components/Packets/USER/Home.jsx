// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { clearReservation, setReservation, getUserMyPacket } from 'actions';
import { useDispatch } from 'react-redux';
import UserPacketCard from '../UserPacketCard';
import { Pagination } from 'components'
const Home = ({ setPage = () => { }, setGlobalState = () => { } }) => {
  const dispatch = useDispatch();
  const myPackets = useSelector((state) => state.myPackets.user?.data);
  const [listPage, setListPage] = useState(1);

  useEffect(() => {
    dispatch(getUserMyPacket(listPage));
  }, [listPage])
  useEffect(() => { }, [myPackets]);
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
                setGlobalState(elm);
              }}
              onClickReservation={() => {
                dispatch(clearReservation());
                dispatch(setReservation({ package_uuid: elm?.package_uuid }));
                dispatch(setReservation({ packetInfo: elm }));
                setPage('PacketReservation');
              }}
            />
          </CardContainer>

        ))}
      </Col>
      <Pagination
        className="mx-auto"
        mt="50px"
        count={myPackets?.data?.totalPage}
        page={listPage}
        onChange={(e, value) => {
          console.log(value)
          setListPage(value)
        }}
      />

    </>
  );
};

const CardContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
export default Home;
