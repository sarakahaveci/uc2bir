import React from 'react';
import styled from 'styled-components/macro';
import { Title, AwesomeIcon } from 'components';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const MiniProfileCard = () => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={'https://isacanakhan.com/wp-content/uploads/2016/07/8-hafta.jpg'}
        />
      </ImageContainer>
      <InfoContainer>
        <Title
          variant={'h6'}
          component={'h6'}
          textAlign="left"
          fontWeight="bold"
          lineDisable
        >
          {'Efe Parlak'}
        </Title>
        <Title
          variant={'h7'}
          component={'h7'}
          textAlign="left"
          fontWeight="normal"
          lineDisable
        >
          {'Fitness Eğitmeni'}
        </Title>
        <Rating
          style={{
            marginLeft: '-6px',
          }}
          name="customized-empty"
          defaultValue={4}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          readOnly
        />
        <Title textAlign="left" variant="h5" component="h5">
          {'300'} <AwesomeIcon.Tl />
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
const Image = styled.img`
  width: 100%;
  border-radius: 150px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
export default MiniProfileCard;
