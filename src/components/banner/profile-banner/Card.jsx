// @ts-nocheck
import React from 'react';

import styled, { css } from 'styled-components/macro';
import { Col } from 'react-bootstrap';
import { Title, AwesomeIcon, IconLabel } from 'components';
import { Link } from 'react-router-dom';
import { colorGenerator } from 'utils';

export const CardInfo = ({
  name,
  category,
  price,
  categories = [],
  location,
  info,
}) => {
  return (
    <>
      {name && (
        <Title
          variant={'h5'}
          component={'h5'}
          textAlign="left"
          fontWeight="normal"
          margin="0"
          lineDisable
        >
          {name}
        </Title>
      )}
      {category && (
        <Title
          variant={'h6'}
          component={'h6'}
          textAlign="left"
          fontWeight="normal"
          lineDisable
        >
          {category}
        </Title>
      )}
      {price && (
        <Title textAlign="left" variant="h5" component="h5">
          {price} <AwesomeIcon.Tl />
        </Title>
      )}
      {categories.length > 0 && (
        <Categories>
          {categories.map((val) => (
            <List>
              <A to={val.link}>{val.text}</A>
            </List>
          ))}
        </Categories>
      )}
      {info}
      {location && <IconLabel text={location} icon={AwesomeIcon.Map} />}
    </>
  );
};

export const CardFooter = ({ children }) => {
  return <StyledCardFooter>{children}</StyledCardFooter>;
};

const Card = ({ img, children, user = false }) => {
  return (
    <StyledCard img={img} user={user}>
      {children}
      <CardFooter />
    </StyledCard>
  );
};

const StyledCard = styled(Col)`
  ${(props) =>
    !props.user
      ? css`
          max-width: 375px;
          height: 285px;
          position: relative;
          background-image: url('${(props) => props.img}');
          background-repeat: no-repeat;
          background-size: cover;
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;

          span.team {
            position: absolute;
            left: 0;
            top: 0;
            padding: 7px 15px;
            color: #00b2a9;
            font-weight: bold;
            font-size: 1.2rem;
            background: rgba(255, 255, 255, 0.5);
            border-top-left-radius: 30px;
          }

          span.span {
            position: absolute;
            right: 30px;
            top: 30px;

            &.camera {
              cursor: pointer;
            }

            &.background {
              background: #fff;
              padding: 5px;
              border-radius: 5px;
            }

            svg {
              width: 25px;
              height: 25px;
            }
          }
        `
      : css`
          width: 100%;
          height: 150px;
          position: relative;
          padding-right: 120px;

          span.camera {
            position: absolute;
            left: 130px;
            bottom: 5px;
            box-shadow: 5px 5px 10px -8px rgba(0, 0, 0, 0.75);
            cursor: pointer;

            &.background {
              background: #fff;
              padding: 5px;
              border-radius: 5px;
            }

            svg {
              width: 25px;
              height: 25px;
            }
          }

          &::before {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background-image: url('${(props) => props.img}');
            background-repeat: no-repeat;
            background-size: cover;
            overflow: hidden;
            border-radius: 100%;
          }
        `};
`;

const StyledCardFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: -15px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 30px;

  .list {
    margin-left: 7px;
    box-shadow: 5px 5px 10px -8px rgba(0, 0, 0, 0.75);
  }
`;

const Categories = styled.ul`
  display: flex;
  margin-left: -5px;
  margin-right: -5px;
`;

const List = styled.li`
  border: 1px solid #707070;
  border-radius: 15px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const A = styled(Link)`
  padding: 5px 10px;
  display: flex;
  flex: 1 1 100%;
  font-size: 8pt;
  color: ${colorGenerator('black')};
`;

export default Card;
