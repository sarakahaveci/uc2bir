/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import { device } from 'utils';
import styled from 'styled-components/macro';
import Svg from 'components/statics/svg';
import { Link } from 'react-router-dom';
import { setNewMessageRoom } from '../../../actions';
import { useDispatch } from 'react-redux';

export default function Card({ image, name, desc, data }) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();

  return (
    <Container>
      <Left>
        <Image src={image}></Image>
        <InfoContainer>
          <BoldText>{name}</BoldText>
          <Text>{desc}</Text>
        </InfoContainer>
      </Left>
      <Comment>
        <Link
        to={'/messages'}
        className="list"
        onClick={() => dispatch(setNewMessageRoom(data))}>

          <Svg.Comment />
        </Link>

      </Comment>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 410px;
  height: 124px;
  background: white;
  margin-left: 5px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 13px 2px rgba(122, 122, 122, 0.3);
  box-shadow: 0px 0px 13px 2px rgba(122, 122, 122, 0.3);
  justify-content: space-between;
  padding: 25px;
  margin: 10px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const Text = styled.text`
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.6rem;
  }
`;
const Comment = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: center;
  justify-content: center;
  border-radius: 50px;
  align-items: center;
  width: 50px;
  height: 50px;
  -webkit-box-shadow: 0px 0px 13px 2px rgba(122, 122, 122, 0.1);
  box-shadow: 0px 0px 13px 2px rgba(122, 122, 122, 0.1);
`;
