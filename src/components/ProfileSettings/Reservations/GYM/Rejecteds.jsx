import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  RejectModal,
  ApproveModal,
  Svg,
} from 'components';
import { device } from 'utils';
import { getGymRejects } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Rejecteds = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.gymReservation?.rejecteds
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [choosenElm, setChoosenElm] = useState(null);
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
    dispatch(getGymRejects());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getGymRejects(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);

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
                type="rejecteds"
                date={elm?.hour}
                user_id={elm?.student_id}
                status_bs={elm?.status_bs}
                status_pt={elm?.status_pt}
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
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
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
                user_id={elm?.student_id}
                type="rejecteds"
                date={elm?.hour}
                status_bs={elm?.status_bs}
                status_pt={elm?.status_pt}
                customerName={elm?.student}
                optionalField_1={elm?.branch} //Sport Type || NULL
                optionalField_3={{
                  label: t('CLASS'),
                  value: elm?.class,
                  value2:
                    elm?.class_total_appointment + '/' + elm?.class_capacity,
                }}
                onApprove={() => {
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
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
            />{' '}
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RejectModal
        elm={choosenElm}
        open={openReject}
        reject={() => {
          setOpenReject(false);
        }}
        cancel={() => {
          setOpenReject(false);
        }}
      />
      <ApproveModal
        elm={choosenElm}
        open={openApprove}
        approve={() => {
          setOpenApprove(false);
        }}
        cancel={() => {
          setOpenApprove(false);
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
export default Rejecteds;
