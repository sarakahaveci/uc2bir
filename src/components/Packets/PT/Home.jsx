// @ts-nocheck
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import PacketCard from '../PacketCard';
import { useDispatch, useSelector } from 'react-redux';
import { getPackage } from '../../../actions';
import { useTranslation } from 'react-i18next';

const Home = ({ setPage = () => {}, packageData }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { packets } = useSelector(
    (state) => state.professionalReservation.ptReservation
  );

  useEffect(() => {
    dispatch(getPackage());
  }, []);

  const setPackageData = (data) => {
    setPage('EditLesson');
    packageData(data);
  };

  return (
    <>
      <Col style={{ padding: 0 }} lg="12">
        {packets?.length > 0 ? (
          packets?.map((item, index) => (
            <CardContainer key={index}>
              <PacketCard
                data={item}
                onClickEdit={(data) => {
                  setPackageData(data);
                }}
              />
            </CardContainer>
          ))
        ) : (
          <CardContainer>
            <strong className="mx-auto">
              {t('You do not have any reservations from the packages')}{' '}
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
