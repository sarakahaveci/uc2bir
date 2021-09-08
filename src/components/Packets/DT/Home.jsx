// @ts-nocheck
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import DietitianPacketCard from '../PacketCard/dietitianPackets';
import { useDispatch, useSelector } from 'react-redux';
import { getPackageDt, deletePackageSeance } from '../../../actions';
import { toast } from 'react-toastify';

const Home = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { packets } = useSelector(
    (state) => state.professionalReservation.dtReservation
  );

  useEffect(() => {
    dispatch(getPackageDt());
  }, []);

  const deletePackageSuccess = () => {
    dispatch(getPackageDt());
    toast.success(t('Package Deletion Completed Successfully'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const deletePackageFail = () => {
    toast.error(t('Error Occurred While Deleting Package!'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const setPackageData = (data) => {
    dispatch(
      deletePackageSeance(data?.id, deletePackageSuccess, deletePackageFail)
    );
  };

  return (
    <>
      <Col style={{ padding: 0 }} lg="12">
        {packets?.data?.length > 0 ? (
          packets?.data?.map((item, index) => (
            <CardContainer key={index}>
              <DietitianPacketCard
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
