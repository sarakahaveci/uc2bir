/* eslint-disable react/no-children-prop */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  // Svg,
  Button,
  // Box,
  Text,
  Title,
  AwesomeIcon,
  // IconLabel,
  Stars,
} from 'components';

const UserCard = ({ top = false, bottom = false, data = {}, className }) => {
  return (
    <>
      {top && (
        <div
          className={`img ${className}`}
          style={{
            backgroundColor: "var(--blue)",
            height: '100%', width: '100%', justifyContent: "center", alignItems: "center"
          }}
        >
          <img src={data?.photo?.default || data?.photo} style={{ objectFit: "cover", height: '100%', width: '100%' }} />

          <ul className="points">
            <Stars rating={data.rating} position="top" />
          </ul>

          {data.classification && (
            <div className="team">{data.classification}</div>
          )}
        </div>
      )}
      {bottom && (
        <div className="slider-item">
          <div className="slider-item-content">
            <Link to={`/user/${data.id}`}>
              <Title
                textAlign="left"
                lineDisable
                variant="h5"
                component="h5"
                children={data.name || data?.title}
              />
            </Link>

            <Title
              lineDisable
              color="gray3"
              fontWeight="normal"
              textAlign="left"
              variant="h6"
              component="h6"
              children={data.category}
            />

            <Title textAlign="left" variant="h4" component="h4">
              <SpanWrapper>
                {data.price}{' '}
                <AwesomeIcon.Tl
                  style={{
                    height: '20px',
                    verticalAlign: 'middle',
                  }}
                />
              </SpanWrapper>
            </Title>

            <Text fontSize="16px" color="black" mb="10px">
              {data.title}
            </Text>

            <ul className="slick-button-group row">
              {data?.branch?.map((branch, index) => (
                index < 3 && (
                  <li key={index}>
                  <Button text={branch} />
                </li>
                )
              ))}
            </ul>

            {/* <Box width="100%" my="15px">
              <IconLabel
                className="d-flex"
                text={`${data.city} ${data.district}`}
                icon={Svg.LocationIcon}
              />
            </Box> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;

const SpanWrapper = styled.span`
  border-bottom: 3px solid #00b2a9;
`;
