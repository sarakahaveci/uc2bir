/* eslint-disable react/no-children-prop */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Svg,
  Button,
  Box,
  Text,
  Title,
  AwesomeIcon,
  IconLabel,
  Stars,
} from 'components';

const UserCard = ({ top = false, bottom = false, data = {}, className }) => {
  return (
    <>
      {top && (
        <div
          className={`img ${className}`}
          style={{
            backgroundImage: `url(${data.photo})`,
          }}
        >
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
                children={data.name}
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
              <span>
                {data.price} <AwesomeIcon.Tl />
              </span>
            </Title>

            <Text fontSize="16px" color="gray2" mb="10px">
              {data.title}
            </Text>

            <ul className="slick-button-group row">
              {data?.branch?.map((branch, index) => (
                <li key={index}>
                  <Button text={branch} />
                </li>
              ))}
            </ul>

            <Box width="100%" my="15px">
              <IconLabel
                className="d-flex"
                text={`${data.city} ${data.district}`}
                icon={Svg.LocationIcon}
              />
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
