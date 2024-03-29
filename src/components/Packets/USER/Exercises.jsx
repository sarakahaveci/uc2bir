import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { device } from 'utils';
import Svg from 'components/statics/svg';
import { useTranslation } from 'react-i18next';

import {
  getUserPacketLessonDetail,
  // setUserPacketLessonComplete,
} from 'actions';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const Exercises = ({
  setPage = () => {},
  setGlobalState = () => {},
  globalState,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const detailData = useSelector(
    (state) => state.myPackets?.user?.lessonDetail?.data
  );
  useEffect(() => {
    dispatch(
      getUserPacketLessonDetail(
        globalState?.lesson_id,
        globalState?.package_uuid
      )
    );
  }, []);
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
  function onClickExercise(training_id) {
    setGlobalState({ ...globalState, training_id: training_id });

    setPage('ExerciseDetail');
  }
  function _renderExercises() {
    if (detailData?.trainings?.length > 0) {
      return detailData?.trainings?.map((elm, index) => (
        <Col key={index} style={{ padding: 0 }} lg="4">
          <CustomProgress
            location={
              detailData?.trainings?.length - 1 == index
                ? 'end'
                : locationSelector(index)
            }
            active="false"
          ></CustomProgress>
          <ExerciseCard
            data={elm}
            type="user"
            onClickExercise={onClickExercise}
          />
          <TickContainer
          // onClick={() => {
          //   if(!(elm?.is_completed)){
          //     dispatch(setUserPacketLessonComplete(elm?.training_id));
          //   }
          // }}
          >
            {elm?.is_completed ? <Svg.TickLesson /> : <Svg.TickLessonDisable />}
            <TickLabel enable>{t('completed')}</TickLabel>
          </TickContainer>
        </Col>
      ));
    } else {
      return <>{t('Your instructor has not yet prepared your work')}</>;
    }
  }
  return (
    <Main>
      <BackLink onClick={() => setPage('DetailLesson')}>
        <Svg.ArrowLeftIcon />

        <span>3.Ders</span>
      </BackLink>
      <Wrapper>
        <StyledRow header style={{}}>
          <Col lg="12" style={{ padding: 0 }}>
            <HeaderText>{t('Exercises')}</HeaderText>
            <LinearProgress
              classes={{ barColorPrimary: classes.barColorPrimary }}
              variant="determinate"
              value={20}
            />
          </Col>
        </StyledRow>
        <StyledRow style={{}}>{_renderExercises()}</StyledRow>
      </Wrapper>
    </Main>
  );
};
const Main = styled.div``;

const StyledRow = styled(Row)`
  margin: ${(props) => (props.header ? '20px' : '50px')};
  @media ${device.sm} {
    margin: ${(props) => (props.header ? '20px' : '5px')};
  }
`;
const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  padding: 5px;
  @media ${device.sm} {
    padding: 0;
  }
`;
const HeaderText = styled.text`
  color: #00b2a9;
  font-size: 16px;
  text-transform: uppercase;
`;
const TickContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
const TickLabel = styled.text`
  color: ${(p) => (p.enable ? 'var(--blue)' : 'gray')};
  margin-left: 10px;
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: ${(props) => (props.bold ? 'bold' : 'initial')};
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const BackLink = styled(Text)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export default Exercises;
