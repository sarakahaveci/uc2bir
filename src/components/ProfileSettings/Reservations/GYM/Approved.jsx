import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  CancellationModal,
  Svg,
  ReservationDetail,
} from 'components';
import { device } from 'utils';
import {
  getGymApproved,
  getGymReservationDetail,
  GymApproveCancelStepOne,
  GymApproveCancelStepTwo,
} from 'actions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Approved = ({ setSubPage }) => {
  const { t } = useTranslation();

  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openCancellation, setOpenCancellation] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.professionalReservation?.gymReservation?.approved
  );
  const funcStatus = useSelector(
    (state) => state.professionalReservation?.gymReservation?.funcStatus
  );
  const startOfWeeksArr = () => {
    if (items?.date) {
      return Object.keys(items?.date).map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
    } else {
      return [];
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getGymApproved());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getGymApproved(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getGymApproved(moment(selectedDate).format('DD.MM.YYYY')));
  }
  function openReservationDetail(id) {
    dispatch(getGymReservationDetail(id));
    setSubPage(
      <ReservationDetail
        type="gym"
        goBack={() => {
          setSubPage();
        }}
      />
    );
  }
  function _renderTab(date) {
    if (items?.appointment?.[moment(date).format('DD.MM.YYYY')]) {
      return (
        <ReservationAccordion
          defaultOpen={true}
          parent
          title={moment(date).format('DD.MM.YYYY')}
        >
          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.with_pt?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Gym style={{ marginRight: '10px' }} />
              <ApproveCard
                type="approve"
                date={elm?.hour}
                customerName={elm?.student}
                optionalField_1={elm?.branch} //Sport Type || NULL
                optionalField_2={{
                  label: t('trainer'),
                  value: elm?.pt?.name,
                }}
                optionalField_3={{
                  label: t('CLASS'),
                  value: elm?.class,
                  value2:
                    elm?.class_total_appointment + '/' + elm?.class_capacity,
                }}
                onApprove={() => {
                  openReservationDetail(elm?.id);
                }}
                onReject={() => {
                  setOpenCancellation(elm?.id);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.without_pt?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Gym style={{ marginRight: '10px' }} />
              <ApproveCard
                type="approve"
                date={elm?.hour}
                customerName={elm?.student}
                optionalField_1={elm?.branch}
                optionalField_3={{
                  label: t('CLASS'),
                  value: elm?.class,
                  value2:
                    elm?.class_total_appointment + '/' + elm?.class_capacity,
                }}
                onApprove={() => {
                  openReservationDetail(elm?.id);
                }}
                onReject={() => {
                  setOpenCancellation(elm?.id);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}
        </ReservationAccordion>
      );
    } else {
      return <></>;
    }
  }
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            {startOfWeeksArr().map((date) => _renderTab(date))}
            {!(startOfWeeksArr()?.length > 0) && (
              <text style={{ padding: '20px' }}>
                {t('There are no pending reservation requests')}
              </text>
            )}
          </AccordionContainer>
        </StyledCol>
        <StyledCol
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={{ order: IsSmallScreen ? 1 : 2 }}
          lg={4}
        >
          <DateContainer>
            <DatePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
              }}
              selectsRange
              inline
              highlightDates={[
                {
                  'react-datepicker__day--highlighted': startOfWeeksArr(),
                },
              ]}
              minDate={new Date()}
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <CancellationModal
        headerText={t('Are you sure you want to cancel your appointment?')}
        descText={t(
          'Your selected reservation will be cancelled. Please be sure to read the cancellation policies'
        )}
        cancelLabel={t('CANCEL MY APPOINTMENT')}
        cancelProcessLabel={t('Give Up')}
        open={openCancellation}
        cancelStepOne={(id) => {
          dispatch(GymApproveCancelStepOne(id));
        }}
        stepTwoData={funcStatus}
        cancelStepTwo={(id) => {
          dispatch(
            GymApproveCancelStepTwo(id, () => {
              getSelectedDate();
            })
          );
          setOpenCancellation(undefined);
        }}
        cancelProcess={() => {
          setOpenCancellation(undefined);
        }}
      />
    </StyledContainer>
  );
};

const DateContainer = styled.div`
  width: 100%;
`;
const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ApproveCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 5px;
  @media ${device.sm} {
    margin: 0;
  }
`;

const StyledCol = styled(Col)`
  @media ${device.sm} {
    padding: 0;
    margin: 0;
  }
`;
const StyledRow = styled(Row)`
  @media ${device.sm} {
    margin: 0;
  }
`;
const StyledContainer = styled(Container)`
  @media ${device.sm} {
    margin: 0;
    padding: 0;
  }
`;
export default Approved;
