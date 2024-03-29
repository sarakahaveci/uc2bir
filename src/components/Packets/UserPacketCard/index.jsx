import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PacketCard = ({
  type,
  trainerClass, //typeözel
  packetName,
  branch,
  status,
  totalLesson,
  currentLesson,
  package_id,
  sessionTypes,
  onClickDetail,
  onClickReservation,
}) => {
  const { t } = useTranslation();

  const history = useHistory();
  const getSessionTypes = () => {
    let tmpString = '';
    var res = sessionTypes?.split(',');
    res?.forEach((element) => {
      if (element == 'gym') tmpString = tmpString + t('sports field') + ', ';
      if (element == 'home_park')
        tmpString = tmpString + t('Home / Park') + '    , ';
      if (element == 'online') tmpString = tmpString + 'Online, ';
    });
    tmpString = tmpString.substring(0, tmpString.length - 2);

    return tmpString;
  };

  let content;
  switch (type) {
    case 'pt':
      content = (
        <>
          <Column>
            <Row>
              <BoldText>
                {trainerClass} {t('CLASS INSTRUCTOR')}:
              </BoldText>

              <BoldText style={{ marginLeft: '5px' }}>{packetName}</BoldText>
            </Row>

            <FlexSpace position={'END'}>
              <BoldText>{branch}</BoldText>
            </FlexSpace>
          </Column>

          <Column>
            <Row>
              <BoldText color={'gray'}>
                {t('SESSION TYPES')}:{getSessionTypes()}
              </BoldText>
            </Row>
          </Column>
          <Column borderDisable>
            <FlexSpace>
              <BoldText color={'gray'}>
                {t('LESSON')} : {currentLesson}/{totalLesson} {t('LESSON')}
              </BoldText>
            </FlexSpace>

            <Row>
              {{
                active: (
                  <>
                    <Button onClick={onClickReservation}>
                      {t('Make a Reservation')}
                    </Button>
                    <ApproveButton onClick={onClickDetail}>
                      {t('Package Detail')}
                    </ApproveButton>
                  </>
                ),
                upgraded: (
                  <BoldText>{t('This package has been upgraded')}</BoldText>
                ),
              }[status] || (
                <Button
                  onClick={() => {
                    history.push(`/packets/${type}/detail/` + package_id);
                  }}
                >
                  {t('Buy Again')}
                </Button>
              )}
            </Row>
          </Column>
        </>
      );
      break;
    case 'dt':
      content = (
        <>
          <Column>
            <Row>
              <BoldText>{t('dietitian')}:</BoldText>

              <BoldText style={{ marginLeft: '5px' }}>{packetName}</BoldText>
            </Row>

            <FlexSpace position={'END'}></FlexSpace>
          </Column>

          <Column>
            <Row>
              <BoldText color={'gray'}>
                {t('SESSION TYPES')}: {getSessionTypes()}
              </BoldText>
            </Row>
          </Column>
          <Column borderDisable>
            <FlexSpace>
              <BoldText color={'gray'}>
                {t('SESSION')} : {currentLesson}/{totalLesson} {t('SESSION')}
              </BoldText>
            </FlexSpace>

            <Row>
              {status == 'active' ? (
                <>
                  <Button onClick={onClickReservation}>
                    {t('Make a Reservation')}
                  </Button>
                </>
              ) : (
                <Button> {t('Buy Again')}</Button>
              )}
            </Row>
          </Column>
        </>
      );
      break;
    default:
      break;
  }
  return <Container>{content}</Container>;
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
const Column = styled.div`
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
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media ${device.sm} {
    padding: 3vw;
  }
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

const Button = styled.button`
  width: 180px;
  height: 34px;
  background: var(--blue);
  color: white;
  border-radius: 5px;
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
export default PacketCard;
