import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../statics/svg';
import { device } from 'utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ApproveCard = ({
  user_id,
  customerName = '',
  // has_comment = 0,
  elm,
  onStatusChange = () => { },
  date = '',
  cardType,
  status_bs,
  status_pt,
  status_st,
  status_dt,
  optionalField_1 = null,
  optionalField_2 = null,
  optionalField_3 = null,
  transaction_id,
  userType,
  onApprove = () => { },
  onReject = () => { },
  onTransfer = () => { },
  type = 'await',
  rateText = '',
}) => {
  const { t } = useTranslation();

  const history = useHistory();
  useEffect(() => { }, []);
  function getRejectReason() {
    if (status_bs) {
      return t('By Gym');
    } else if (status_pt) {
      return t('By Trainer');
    } else if (status_st) {
      return t('By User');
    } else if (status_dt) {
      return t('By Dietitian');
    } else {
      return '';
    }
  }
  let buttonGroup;
  switch (type) {
    case 'await':
      if (cardType == 'userCard') {
        buttonGroup = (
          <>
            <ApproveButton disabled onClick={onApprove}>
              {t('Awaiting Approval')}
            </ApproveButton>
            <ApproveButton reject onClick={onReject}>
              {t('cancel')}
            </ApproveButton>
          </>
        );
      } else {
        buttonGroup = (
          <>
            <AwaitButton onClick={onApprove}>{t('Approve')}</AwaitButton>
            <AwaitButton onClick={onReject}>{t('Reject')}</AwaitButton>
          </>
        );
      }
      break;
    case 'approve':
      buttonGroup = (
        <>
          <ApproveButton reject onClick={onReject}>
            {t('cancel')}
          </ApproveButton>
          <ApproveButton onClick={onApprove}>
            {' '}
            {t('Appointment Details')}
          </ApproveButton>
        </>
      );
      break;
    case 'rejecteds':
      buttonGroup =
        userType == 'user' ? (
          <>
            {transaction_id && (
              <ButtonText onClick={onTransfer}>{t('refund')}</ButtonText>
            )}{' '}
            {getRejectReason()} {t('Denied')}
          </>
        ) : (
          <> {getRejectReason() + t('Denied')}</>
        );
      break;
    case 'history':
      if (!(elm?.approval_status == 'pending')) {
        if (elm?.approval_status == 'objected') {

          buttonGroup = <>{t('Lesson Not Held')}</>;
        } else if (elm?.approval_status == 'approved' ) {
          if(elm?.can_write_appointment_comment){
            buttonGroup = (
              <>
                <HistoryButton onClick={onApprove}>{rateText}</HistoryButton>
              </>
            );
          }else{
            buttonGroup = <>{t('commented')}</>;

          }
        }
      } else {
        buttonGroup = (
          <div style={{ display: 'flex' }}>
            <ApproveButton
              style={{ margin: 0 }}
              approved
              onClick={() => {
                onStatusChange(1);
              }}
            >
              {t('done')}
            </ApproveButton>
            <ApproveButton
              style={{ margin: 0 }}
              reject
              onClick={() => {
                onReject()
              }}
            >
              {t('notDone')}
            </ApproveButton>
          </div>
        );
      }
      break;
    default:
      break;
  }

  function _renderField_3() {
    if (optionalField_3?.value2) {
      return (
        <>
          <AdressText>
            {optionalField_3.label}: {optionalField_3.value}{' '}
            {optionalField_3.value2}
          </AdressText>
        </>
      );
    } else if (optionalField_3?.value) {
      return (
        <>
          <Svg.LocationIcon></Svg.LocationIcon>
          <AdressText>{optionalField_3?.value}</AdressText>
        </>
      );
    } else {
      return null;
    }
  }
  return (
    <Container>
      <Row>
        <Column>
          <Svg.ClockIcon
            style={{ marginRight: '9px', marginBottom: '2px' }}
          ></Svg.ClockIcon>
          <BoldText>{date}</BoldText>
        </Column>
        {optionalField_1 && (
          <>
            <Seperator></Seperator>
            <Column>
              <BoldText>{optionalField_1}</BoldText>
            </Column>
            <Seperator></Seperator>
          </>
        )}
        <FlexSpace
          onClick={() => {
            user_id && history.push('/user/' + user_id);
          }}
          style={{ cursor: user_id ? 'pointer' : 'initial' }}
          position={'END'}
        >
          <Dot />
          <BoldText>{customerName}</BoldText>
        </FlexSpace>
      </Row>

      {optionalField_2 && (
        <Row>
          <Column>
            <BoldText>{optionalField_2.label}: </BoldText>
            <NormalText>{optionalField_2.value}</NormalText>
          </Column>
        </Row>
      )}
      <Row borderDisable>
        <FlexSpace>{_renderField_3()}</FlexSpace>

        <Column>{buttonGroup}</Column>
      </Row>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 731px;
  border-radius: 10px;
  background-color: #fcfcfc;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media ${device.sm} {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: 10px;
  border-bottom-style: ${(props) => (props.borderDisable ? 'none' : 'solid')};
  border-bottom-width: 1px;
  border-bottom-color: rgba(197, 196, 196, 0.5);
  @media ${device.sm} {
    height: 6vw;
    padding-left: 1vw;
  }
`;
const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media ${device.sm} {
    padding: 3vw;
  }
`;
const Seperator = styled.div`
  display: flex;
  width: 1px;
  height: 60%;
  background-color: rgba(197, 196, 196, 0.5);
`;
//text
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const AdressText = styled.text`
  color: #909090;
  font-family: 'Poppins', sans-serif;
  margin-left: 8px;
  @media ${device.sm} {
    margin-left: 3px;
    font-size: 0.6rem;
  }
`;

//<=
const FlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position == 'END' ? 'flex-end' : 'flex-start'};
  padding: 0 20px 0 20px;
  flex-grow: 2;
  @media ${device.sm} {
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: #ef805a;
  margin-right: 8px;
  @media ${device.sm} {
    margin-right: 3px;
  }
`;

const AwaitButton = styled.button`
  width: 120px;
  height: 34px;
  background: #f77e0b;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
const ApproveButton = styled.button`
  width: 120px;
  height: 34px;
  color: ${(p) => (p.reject ? '#F01C62' : 'var(--blue)')};
  border-radius: 5px;
  margin-right: 10px;
  background: transparent;
  text-decoration: underline;
  white-space: nowrap;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
const HistoryButton = styled.button`
  height: 34px;
  background: white;
  padding: 5px;
  color: var(--blue);
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
  border-style: solid;
  border-width: 1px;
  border-color: var(--blue);
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
const ButtonText = styled.text`
  cursor: pointer;
  color: var(--blue);
  margin-right: 10px;
`;

const NormalText = styled.text`
  color: gray;
  margin-left: 5px;
`;

export default ApproveCard;
