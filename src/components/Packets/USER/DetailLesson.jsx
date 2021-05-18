// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import { device } from 'utils';
import image from '../../../assets/session-type.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMyPacketDetail } from 'actions';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const DetailLesson = ({
  setBannerActive = () => {},
  setPage = () => {},
  globalState,
  setGlobalState,
}) => {
  const dispatch = useDispatch();
  const detailData = useSelector(
    (state) => state.myPackets?.user?.detail?.data
  );

  useEffect(() => {
    dispatch(getUserMyPacketDetail(globalState?.package_uuid));
    setBannerActive(false);
  }, []);
  function onClickLesson(elm) {
    if (elm?.type == 'lesson') {
      setGlobalState({ ...globalState, lesson_id: elm?.id });
      setPage('Exercises');
    }
  }
  const classes = useStyles();
  function locationSelector(index) {
    if (index % 3 == 0) {
      return 'start';
    } else if (index % 3 == 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function handleReservationButton() {}
  function _renderLessons() {
    return detailData?.lessons?.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={
            detailData?.lessons?.length - 1 == index
              ? 'end'
              : locationSelector(index)
          }
          active={elm?.is_completed ? 'true' : 'false'}
        ></CustomProgress>
        <LessonCardContainer
          onClick={() => {
            onClickLesson(elm);
          }}
        >
          <MainField>
            <HeaderArea>
              {elm?.is_completed ? (
                <Svg.TickLesson />
              ) : (
                <Number>
                  <BoldText color={'#C5C4C4'}>{index + 1}</BoldText>
                </Number>
              )}
              <BoldText style={{ marginLeft: '9px' }}>{elm?.title}</BoldText>
            </HeaderArea>
            <DescArea>
              <IconArea></IconArea>
              <DescText>{elm?.description} </DescText>
            </DescArea>
          </MainField>
          {elm?.type == 'lesson' && (
            <RightSideField>
              <Svg.ArrowRightIcon></Svg.ArrowRightIcon>
            </RightSideField>
          )}
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
    <Main>
      <InfoContainer>
        <Right>
          <ImageContainer>
            <ImageBanner src={image}></ImageBanner>
            <Button onClick={handleReservationButton}>Rezervasyon Yap</Button>
          </ImageContainer>
          <TextContainer>
            <Title>{detailData?.package?.title}</Title>
          </TextContainer>
        </Right>
        <RichText>
          {ReactHtmlParser(decode(detailData?.package?.detail))}
        </RichText>
      </InfoContainer>
      <Wrapper>
        <StyledRow header style={{}}>
          <Col lg="12" style={{ padding: 0 }}>
            <HeaderText>Dersler</HeaderText>
            <LinearProgress
              classes={{ barColorPrimary: classes.barColorPrimary }}
              variant="determinate"
              value={20}
            />
          </Col>
        </StyledRow>
        <StyledRow style={{}}>{_renderLessons()}</StyledRow>
      </Wrapper>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  padding: 5px;
  @media ${device.sm} {
  }
`;
const StyledRow = styled(Row)`
  margin: ${(props) => (props.header ? '20px' : '50px')};
  @media ${device.sm} {
    margin: ${(props) => (props.header ? '20px' : '5px')};
  }
`;

const HeaderText = styled.text`
  color: #00b2a9;
  font-size: 16px;
`;

const LessonCardContainer = styled.div`
  display: flex;
  width: 365px;

  height: 102px;
  border: #c5c4c4;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  cursor: pointer;
  @media ${device.sm} {
    margin-top: 10px;
    width: 95%;
  }
`;
const MainField = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const RightSideField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 100%;
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  width: 100%;
  height: 50%;
`;
const Number = styled.div`
  width: 26px;
  text-align: center;
`;
const DescArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  height: 50%;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
`;
const IconArea = styled.div`
  width: 26px;
  height: 26px;
`;
const DescText = styled.text`
  margin-left: 9px;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const ImageBanner = styled.section`
  width: 330px;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;
const Right = styled.div`
  display: flex;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 285px;
  align-items: center;
  padding: 20px;
`;
const Title = styled.text`
  font-size: 26px;
`;
const RichText = styled.text`
  font-size: 16px;
  height: 285px;
  width: 543px;
`;
const ImageContainer = styled.div`
  position: relative;
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

  position: absolute;
  bottom: -17px;
  right: 20px;
`;
export default DetailLesson;
