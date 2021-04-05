import React from 'react';
import styled from 'styled-components/macro';
import Svg from 'components/statics/svg';
import Slider from 'react-slick';

const ExerciseCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <ExerciseCardContainer>
        <ImagesContainer>
          <Carousel {...settings}>
            <img
              style={{ width: '80px', height: '80px' }}
              key={1}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            ></img>
            <img
              style={{ width: '80px', height: '80px' }}
              key={1}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            ></img>
          </Carousel>
        </ImagesContainer>
        <InfoContainer>
          <BoldText color="#00B2A9">Normal Plant</BoldText>
          <table>
            <tr>
              <th>Ağırlık</th>
              <td>10kg</td>
            </tr>
            <tr>
              <th>Set</th>
              <td>1</td>
            </tr>
            <tr>
              <th>Mola</th>
              <td>0:30</td>
            </tr>
          </table>
        </InfoContainer>
        <Svg.ArrowRightIcon style={{ marginRight: '13px' }} />
      </ExerciseCardContainer>
      <DeleteIcon>
        <Svg.TrashIcon></Svg.TrashIcon>
      </DeleteIcon>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 385px;
  height: 175px;
  @media (max-width: 768px) {
    width: 98%;
  }
`;
const ExerciseCardContainer = styled.div`
  display: flex;
  width: 365px;
  height: 155px;
  border-radius: 20px;
  overflow: hidden;
  border-color: #909090;
  border-style: solid;
  border-width: 1px;
  align-items: center;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;
const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 155px;
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const BoldText = styled.text`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media (max-width: 768px) {
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
  background: red;
`;
export default ExerciseCard;
