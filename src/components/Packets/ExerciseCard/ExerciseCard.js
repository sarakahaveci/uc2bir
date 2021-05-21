import React from 'react';
import styled from 'styled-components/macro';
import Svg from 'components/statics/svg';
import Slider from 'react-slick';
import { device } from 'utils';

const ExerciseCard = ({ onClickExercise, type, data, onDeleteExercise}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <ExerciseCardContainer onClick={onClickExercise}>
        <ImagesContainer>
          <Carousel {...settings}>
            <Svg.ExerciseIcon style={{ width: '80px', height: '80px' }} />
          </Carousel>
        </ImagesContainer>
        <InfoContainer>
          <BoldText color="#00B2A9">{data?.title}</BoldText>
          <table>
            {data?.weight&&
            <tr>
              <th>Ağırlık</th>
              <td>{data?.weight}kg</td>
            </tr>
            }

            {data?.set&&
            <tr>
              <th>Set</th>
              <td>{data?.set}</td>
            </tr>
            }

            {data?.break&&
            <tr>
              <th>Mola</th>
              <td>{data?.break}dk</td>
            </tr>
            }

            {data?.repetition&&
            <tr>
              <th>Tekrar</th>
              <td>{data?.repetition}</td>
            </tr>
            }

            {data?.range&&
            <tr>
              <th>Aralık</th>
              <td>{data?.range}</td>
            </tr>
            }

            {data?.time&&
            <tr>
              <th>Zaman</th>
              <td>{data?.time}dk</td>
            </tr>
            }
          </table>
        </InfoContainer>
        <Svg.ArrowRightIcon style={{ marginRight: '13px' }} />
      </ExerciseCardContainer>
      {type !== 'user' && (
        <DeleteIcon onClick={()=>onDeleteExercise(data)}>
          <Svg.TrashIcon/>
        </DeleteIcon>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 385px;
  height: 195px;
  cursor: pointer;
  @media ${device.sm} {
    width: 98%;
  }
`;
const ExerciseCardContainer = styled.div`
  display: flex;
  width: 365px;
  height: 175px;
  border-radius: 20px;
  overflow: hidden;
  border-color: #909090;
  border-style: solid;
  border-width: 1px;
  align-items: center;
  @media ${device.sm} {
    width: 80vw;
  }
`;
const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 155px;
  @media ${device.sm} {
    width: 30vw;
    height: 30vw;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
  height: 100%;
  @media ${device.sm} {
    padding: 8px;
  }
`;

const BoldText = styled.text`
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.9rem;
  }
`;
const DeleteIcon = styled.button`
  display: flex;
  position: absolute;
  background: #fcfbfb;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 20px;
  width: 43px;
  height: 43px;
  border-radius: 43px;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(68, 68, 68, 0.39);
  box-shadow: 0px 2px 3px 0px rgba(68, 68, 68, 0.39);
`;

const Carousel = styled(Slider)`
  width: 80%;
  display: flex;
  justify-content: center;
`;
export default ExerciseCard;
