import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { device } from 'utils';
import { Span } from '../../index';
import { SESSION_KEYS } from '../../../constants';
import { useTranslation } from 'react-i18next';

const DietitianPacketCard = ({ onClickEdit, data }) => {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <Container>
      <Column>
        <Row>
          <BoldText style={{ fontWeight: '700' }}>
            {' '}
            {t('package name')}:
          </BoldText>
          <Span> {data?.title.toUpperCase()}</Span>
        </Row>
      </Column>
      <Column>
        <Row>
          <BoldText>{t('number of sessions')}:</BoldText>
          <Span> {data?.quantity}</Span>
        </Row>
      </Column>

      <Column>
        <Row>
          <BoldText>{t('session type')}:</BoldText>
          {data?.sessions?.map((item, index) => (
            <Span fontSize={'18px'} key={index}>
              {SESSION_KEYS[item?.session_type?.type]}
              {data?.sessions?.length !== index + 1 ? ',' : ''}
              &nbsp;
            </Span>
          ))}
        </Row>
      </Column>

      <Column borderDisable>
        <FlexSpace>
          <Svg.LocationIcon />
          {data?.session_type !== 'online' && (
            <AdressText>{data?.address_detail}</AdressText>
          )}
        </FlexSpace>
        <Seperator />
        <FlexSpace position={'END'}>
          <Button onClick={() => onClickEdit(data)}>
            {t('Delete Package')}
          </Button>
        </FlexSpace>
      </Column>
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
const Seperator = styled.div`
  display: flex;
  width: 1px;
  height: 60%;
  background-color: rgba(197, 196, 196, 0.5);
`;
//text
const BoldText = styled(Span)`
  font-weight: bold;
  margin-right: 15px;
  text-transform: uppercase;
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

const FlexSpace = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${(props) =>
    props.position === 'END' ? 'flex-end' : 'flex-start'};
  padding: 0 20px 0 20px;
  flex-grow: 2;
  @media ${device.sm} {
  }
`;

const Button = styled.button`
  width: 180px;
  height: 34px;
  background: white;
  color: #f01c62;
  border-radius: 5px;
  border: 1px solid #f01c62;
`;
export default DietitianPacketCard;
