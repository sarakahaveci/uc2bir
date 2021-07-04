import React from 'react';
import { AwesomeIcon } from 'components';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { device } from 'utils';
const TrainerCard = ({
  name,
  image,
  stars = 0,
  category,
  price,
  address,
  classification,
}) => {
  return (
    <>
      <Card>
        <Stars>
          <Star className={`${stars > 0 ? 'active' : ''}`}>
            <AwesomeIcon.StarSolid />
          </Star>
          <Star className={`${stars > 1 ? 'active' : ''}`}>
            <AwesomeIcon.StarSolid />
          </Star>
          <Star className={`${stars > 2 ? 'active' : ''}`}>
            <AwesomeIcon.StarSolid />
          </Star>
          <Star className={`${stars > 3 ? 'active' : ''}`}>
            <AwesomeIcon.StarSolid />
          </Star>
          <Star className={`${stars > 4 ? 'active' : ''}`}>
            <AwesomeIcon.StarSolid />
          </Star>
        </Stars>
        <ImageContainer>
          <IMG src={image}></IMG>
          <Class>
            {classification && (
              <div className="long-user-card__classification">
                {classification}
              </div>
            )}
          </Class>
        </ImageContainer>
        <InfoContainer>
          <HeaderText>{name}</HeaderText>
          <DescText>{category}</DescText>
          <Seperator />
          <AddressText>{address}</AddressText>
          <div>
          <AddressText>{price}</AddressText>
          <AwesomeIcon.Tl style={{marginLeft:'5px',color:'var(--blue)'}}></AwesomeIcon.Tl>
          </div>
        </InfoContainer>
      </Card>
    </>
  );
};

const Card = styled(Col)`
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 7px -2px rgb(0 0 0 / 75%);
  padding: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

const Stars = styled.ul`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 5px 15px;
  z-index: 1000;
  opacity: 1;
  border-bottom-right-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
`;

const Star = styled.li`
  margin: 2px;
  cursor: pointer;

  svg {
    color: #ccc;
    font-size: 9pt;

    @media (max-width: 1200px) {
      font-size: 5pt;
    }
  }

  &.active {
    svg {
      color: #ffba00;
    }
  }
`;
const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 45%;
  align-items: center;
  justify-content: center;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
  flex-direction: column;
  padding: 30px 10px;
`;
const HeaderText = styled.text`
  font-size: 1.3rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 1rem;
  }
`;
const AddressText = styled.text`
  font-size: 1.05rem;
  font-family: 'Poppins', sans-serif;
  color: gray;
  @media ${device.sm} {
    font-size: 0.85rem;
  }
`;
const DescText = styled.text`
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: gray;

  @media ${device.sm} {
    font-size: 0.8rem;
  }
`;
const Seperator = styled.div`
  width: 60px;
  border-bottom-style: solid;
  border-color: var(--blue);
  border-width: 3px;
  margin-bottom: 15px;
`;
const IMG = styled.img`
  width: 80%;
  height: 170px;
  border-radius: 25px;
  object-fit: cover;
`;
const Class = styled.div`
  position: absolute;
  bottom: 0;
`;

export default TrainerCard;
