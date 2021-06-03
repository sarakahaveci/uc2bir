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
import { useSelector, useDispatch } from 'react-redux';
import {
  getDtApproved,
  DtApproveCancelStepOne,
  DtApproveCancelStepTwo,
  getDtReservationDetail,
} from 'actions';
import moment from 'moment';

const Approved = ({ setSubPage = () => {} }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.approved
  );
  const funcStatus = useSelector(
    (state) => state.professionalReservation?.dtReservation?.funcStatus
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openCancellation, setOpenCancellation] = useState(undefined);

  const [selectedDate, setSelectedDate] = useState(new Date());
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
    setSelectedDate(new Date());
    dispatch(getDtApproved());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getDtApproved(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getDtApproved(moment(selectedDate).format('DD.MM.YYYY')));
  }
  function openReservationDetail(id, isOnline) {
    dispatch(getDtReservationDetail(id));
    setSubPage(
      <ReservationDetail
        type="dt"
        goBack={() => {
          setSubPage();
        }}
        isOnline={isOnline}
      />
    );
  }
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            <ReservationAccordion
              defaultOpen={true}
              parent
              title={moment(selectedDate).format('DD.MM.YYYY')}
            >
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Gym />}
                title="Klinik"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.clinic?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      type="approve"
                      customerName={elm?.student}
                      onApprove={() => {
                        openReservationDetail(elm?.id);
                      }}
                      onReject={() => {
                        setOpenCancellation(elm?.id);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>

              <ReservationAccordion
                miniIcon={<Svg.SessionType.Online />}
                title="ONLİNE"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.online?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
            
                      type="approve"
                      customerName={elm?.student}
                      onApprove={() => {

                        openReservationDetail(elm?.id, true);
                      }}
                      onReject={() => {
                        setOpenCancellation(elm?.id);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
            </ReservationAccordion>
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
            />{' '}
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <CancellationModal
        headerText="Randevunuzu iptal etmek istediğinize
        emin misiniz?"
        descText={`Seçili oluşturulan rezervasyonunuz iptal edilecektir. Lütfen iptal koşulları’nı okuduğunuzdan emin olun.`}
        cancelLabel="RANDEVUMU İPTAL ET"
        cancelProcessLabel="Vazgeç"
        open={openCancellation}
        cancelStepOne={(id) => {
          dispatch(DtApproveCancelStepOne(id));
        }}
        stepTwoData={funcStatus}
        cancelStepTwo={(id) => {
          dispatch(
            DtApproveCancelStepTwo(id, () => {
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
`;
const ApproveCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
