// @ts-nocheck
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import DietitianPacketCard from '../PacketCard/dietitianPackets';
import { useDispatch, useSelector } from 'react-redux';
import {  getPackageDt } from '../../../actions';
const Home = ({ packageData }) => {
  const dispatch = useDispatch();
  const { packets } = useSelector(
    (state) => state.professionalReservation.dtReservation
  );

  useEffect(() => {
    dispatch(getPackageDt());
  }, []);

  const setPackageData = (data) =>{
    packageData(data)
  }

  return (
    <>
      <Col style={{ padding: 0 }} lg="12">
        {packets?.data?.length>0? (packets?.data?.map((item, index)=>(
          <CardContainer key={index}>
            <DietitianPacketCard
              data={item}
              onClickEdit={(data) => {
                setPackageData(data)
              }}
            />
          </CardContainer>
        ))):(
          <CardContainer >
            <strong className="mx-auto">
              Paketlerden Herhangi bir Rezervasyonunuz Bulunmamaktadır.
            </strong>
          </CardContainer>
        )}

      </Col>
    </>
  );
};

const CardContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;
export default Home;
