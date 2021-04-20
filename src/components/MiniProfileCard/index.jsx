import React from 'react';
import styled from 'styled-components/macro';
import { Title, AwesomeIcon } from 'components';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const MiniProfileCard = ({ photo, name, rating, type_id, price }) => {
  return (
    <Container>
      <ImageContainer>
        <img className="banner-image" src={photo} />
      </ImageContainer>
      <InfoContainer>
        <Title
          variant={'h6'}
          component={'h6'}
          textAlign="left"
          fontWeight="bold"
          lineDisable
        >
          {name}
        </Title>
        <Title
          variant={'h7'}
          component={'h7'}
          textAlign="left"
          fontWeight="normal"
          lineDisable
        >
          {type_id === 1 ? 'Kullanıcı' : null}
          {type_id === 2 ? 'Spor Eğitmeni' : null}
          {type_id === 3 ? 'Spor Alanı' : null}
          {type_id === 4 ? 'Diyetisyen' : null}
        </Title>
        <Rating
          style={{
            marginLeft: '-6px',
          }}
          name="customized-empty"
          defaultValue={rating}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          readOnly
        />
        <Title textAlign="left" variant="h5" component="h5">
          {price} <AwesomeIcon.Tl />
        </Title>
      </InfoContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
`;
/*const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
`;*/
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
export default MiniProfileCard;
