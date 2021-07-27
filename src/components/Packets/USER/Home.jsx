// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { clearReservation, setReservation, getUserMyPacket } from 'actions';
import { useDispatch } from 'react-redux';
import UserPacketCard from '../UserPacketCard';
import { Pagination } from 'components';
const Home = ({ setPage = () => {}, setGlobalState = () => {} }) => {
  const dispatch = useDispatch();
  const myPackets = useSelector((state) => state.myPackets.user?.data);
  const [listPage, setListPage] = useState(1);

  useEffect(() => {
    dispatch(getUserMyPacket(listPage));
  }, [listPage]);
  useEffect(() => {}, [myPackets]);
  return (
    <>
      <Col style={{ padding: 0 }} lg="4">
        {myPackets?.data?.data?.map((elm, i) => (
          <CardContainer key={i}>
            <UserPacketCard
              package_id={elm?.package_id}
              type={elm?.type}
              branch={elm?.branch}
              totalLesson={elm?.quantity}
              currentLesson={elm?.remaining_quantity}
              status={elm?.status}
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
      {!(myPackets?.data?.data?.length > 0) && (
        <div style={{ padding: '10px', height: '120px' }}>
          <text>Satın aldığınız her hangi bir paket bulunmamaktadır</text>
        </div>
      )}
      {myPackets?.data?.data?.length > 0 && (
        <Pagination
          className="mx-auto"
          mt="50px"
          count={myPackets?.data?.totalPage}
          page={listPage}
          onChange={(e, value) => {
            setListPage(value);
          }}
        />
      )}
    </>
  );
};

const CardContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
export default Home;
