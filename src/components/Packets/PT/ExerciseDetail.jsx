// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import { device } from 'utils';
import { AddExercise, Button, Title } from 'components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Svg from 'components/statics/svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPackageExerciseList, setPackageExerciseList } from '../../../actions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { toast } from 'react-toastify';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const ExerciseDetail = ({ setPage = () => {},packageData, lessonId }) => {
  const classes = useStyles();
  const [categorySelection, setCategorySelection] = useState('');
  const [exerciseItem, setExerciseItem] = useState('');
  const [trainingId, setTrainingId] = useState('');
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { exerciseList } = useSelector(
    (state) => state.professionalReservation.ptReservation
  );

  useEffect(() => {
    dispatch(getPackageExerciseList({package_uuid:packageData?.package_uuid, appointment_id:packageData?.appointment_id}));
  }, []);


  const succsess = () => {
    setPage('Exercises')
    toast.success(`Dersiniz Kaydedilmiştir`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const saveExercise = () =>{
    dispatch(setPackageExerciseList(
        {
          ...data,
          training_id: trainingId,
          lesson_id:lessonId
        },
        succsess,
      )
    );
  }

  return (
    <Container>
      <Side>
        <Title
          style={{ cursor: 'pointer', padding: 15 }}
          fontSize="14pt"
          textAlign="left"
          onClick={() => setPage('Exercises')}
        >
          {`<Geri`}
        </Title>
        <FormControlWrapper>
          <FormControl>
            <InputLabel>Kategori Seçiniz</InputLabel>
            <Select
              value={categorySelection}
              input={<Input />}
              onChange={(e) => setCategorySelection(e.target.value)}>
              {exerciseList?.categories?.map((exercise) => (
                <MenuItem key={exercise?.category_id} value={exercise?.category_id}>
                  {exercise.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControlWrapper>
        <RadioGroup
          row
          aria-label="workArea"
          name="workArea"
          defaultValue="0l">
          {categorySelection && exerciseList?.trainings[categorySelection].map((item, index) => (
            <>
              <CardGroup style={{ padding: 0 }}>
                <AddExercise
                  key={index}
                  item={item}
                  setData={setData}
                  data={data}/>
                {exerciseItem === index+1 ? (
                  <RadioButtonCheckedIcon
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    onClick={() => {
                     setExerciseItem(index+1);
                     setTrainingId(item.training_id);
                     setData({});
                    }}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                )}
              </CardGroup>
            </>
          )) || null}
        </RadioGroup>
      </Side>
      <Side>
        <TextContent>
          <Text bold>Nasıl Yapılır ? </Text>
          <LinearProgress
            classes={{ barColorPrimary: classes.barColorPrimary }}
            variant="determinate"
            value={20}
          />
          {exerciseItem&&
          <Text>
            {ReactHtmlParser(
              decode(exerciseList?.trainings[categorySelection][exerciseItem-1]?.detail)
            )}
          </Text>
          }
        </TextContent>
        <Info>
          <Text bold>Squat</Text>
          <Properties>
            {exerciseItem&&
            <PropertyContainer>
              <Svg.Difficulty/>
              <TextWrapper>
                <Text>Zorluk</Text>
                <Text bold>{exerciseList?.trainings[categorySelection][exerciseItem-1]?.level}</Text>
              </TextWrapper>
            </PropertyContainer>
            }
            <PropertyContainer>
              <Svg.Weight/>
              <TextWrapper>
                <Text>Ağırlık</Text>
                <Text bold>{data?.weight} kg</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Set/>
              <TextWrapper>
                <Text>Set</Text>
                <Text bold>{data?.set}</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Break/>
              <TextWrapper>
                <Text>Mola</Text>
                <Text bold>{data?.breakTime}</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Repetition/>
              <TextWrapper>
                <Text>Tekrar</Text>
                <Text bold>{data?.repetition}</Text>
              </TextWrapper>
            </PropertyContainer>
          </Properties>
        </Info>

        <div style={{display:'flex', alignContent:'center'}}>
          <Button
            className="blue dietitan-price__saveButton"
            text="Kaydet"
            fontSize="10pt"
            style={{width:'90%'}}
            onClick={()=>saveExercise()}
          />
        </div>


      </Side>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
const Side = styled.div`
  width: 586px;
  height: auto;
  @media ${device.sm} {
    width: 100%;
  }
`;
const TextContent = styled.div`
  width: 586px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Info = styled.div`
  width: 586px;
  height: 234px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Properties = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  @media ${device.sm} {
    width: 100%;
  }
`;

const CardGroup = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding-right: 95px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const FormControlWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin-bottom: 20px;
  }
`;


export default ExerciseDetail;
