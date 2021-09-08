import React from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress, Title } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { device } from 'utils';
import Svg from '../../statics/svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePackageExerciseList,
  getPackageClassDetail,
} from '../../../actions';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});

const Exercises = ({ setPage = () => {}, packageData }) => {
  const { t } = useTranslation();

  const { classDetailItem } = useSelector(
    (state) => state.professionalReservation.ptReservation
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  function locationSelector(index) {
    if (index % 3 === 0) {
      return 'start';
    } else if (index % 3 === 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function onClickExercise() {
    setPage('ExerciseDetail');
  }
  function onClickExerciseEdit() {
    setPage('ExerciseEdit');
  }
  const onDeleteExercise = (data) => {
    dispatch(
      deletePackageExerciseList(
        { lesson_id: data?.lesson, training_id: data?.training_id },
        () =>
          toast.success(t('Exercise Successfully Deleted'), {
            position: 'bottom-right',
            autoClose: 2000,
            onClose: dispatch(
              getPackageClassDetail({
                package_uuid: packageData?.package_uuid,
                appointment_id: packageData?.appointment_id,
                lesson_id: data?.lesson,
                type: 'lesson',
              })
            ),
          })
      )
    );
  };

  function _renderExercises() {
    return classDetailItem?.trainings?.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={
            classDetailItem?.trainings.length - 1 === index
              ? 'end'
              : locationSelector(index)
          }
          active="false"
        />
        <ExerciseCard
          data={elm}
          onClickExercise={onClickExerciseEdit}
          onDeleteExercise={(data) => {
            onDeleteExercise(data);
          }}
        />
      </Col>
    ));
  }
  return (
    <Wrapper>
      <StyledRow header style={{}}>
        <div style={{ display: 'flex', flex: '1', marginTop: '10px' }}>
          <Title
            style={{ cursor: 'pointer', padding: 5 }}
            fontSize="14pt"
            textAlign="left"
            onClick={() => setPage('EditLesson')}
          >
            {`< Geri`}
          </Title>
          <ExerciseCreateBtn onClick={onClickExercise}>
            <Svg.BluePlusIcon />
            <ButtonText>{t('Add Exercise')}</ButtonText>
          </ExerciseCreateBtn>
        </div>

        <Col lg="12" style={{ padding: 10 }}>
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
  );
};

const ExerciseCreateBtn = styled.button`
  display: flex;
  align-items: center;
  width: 219px;
  height: 32px;
  margin-top: 7px;
  border-radius: 20px;
  background: var(--blue);
`;
const ButtonText = styled.text`
  color: white;
  margin-left: 40px;
`;

const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media ${device.sm} {
    padding: 0;
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

export default Exercises;
