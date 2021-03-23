/* eslint-disable react/no-children-prop */
import React from 'react';

import Title from '../../typography/Titles';
import Text from '../../typography/Text';
import AwesomeIcon from '../../statics/icon';
import Button from '../../buttons/button';
import IconLabel from '../../buttons/icon-label';

const GYM = ({ top = false, bottom = false, val }) => {
  return (
    <>
      {top && (
        <div className="slider-item">
          <div
            className="img"
            style={{
              backgroundImage: `url(${val.image?.default})`,
            }}
          />
        </div>
      )}
      {bottom && (
        <div className="slider-item">
          <div className="slider-item-content">
            <Title
              textAlign="left"
              lineDisable
              variant="h5"
              component="h5"
              children={val.name}
            />
            <Title
              lineDisable
              textAlign="left"
              variant="h6"
              component="h6"
              color="gray3"
              fontWeight="normal"
              children={val.category}
            />
            <Title textAlign="left" variant="h4" component="h4">
              <span>
                {val.price} <AwesomeIcon.Tl />
              </span>
            </Title>
            <Text fontSize="16px" color="gray2" children={val.content} />
            <ul className="slick-button-group row">
              <li>
                <Button text="Box" />
              </li>
              <li>
                <Button text="Pilates" />
              </li>
              <li>
                <Button text="Fitnes" />
              </li>
            </ul>
            <div style={{ width: '100%', margin: '15px 0' }}>
              <IconLabel text={val.location} icon={AwesomeIcon.Map} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GYM;
