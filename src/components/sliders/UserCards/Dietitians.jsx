/* eslint-disable react/no-children-prop */
import React from 'react';

import Title from '../../typography/Titles';
import Text from '../../typography/Text';
import AwesomeIcon from '../../statics/icon';
import IconLabel from '../../buttons/icon-label';

const Dietitians = ({ top = false, bottom = false, val }) => {
  return (
    <>
      {top && (
        <div className="slider-item">
          <div
            className="img"
            style={{
              backgroundImage: `url(${val.image?.default})`,
            }}
          >
            <ul className="points">
              <li className={`${val.stars > 0 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 1 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 2 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 3 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
              <li className={`${val.stars > 4 ? 'active' : ''}`}>
                <AwesomeIcon.StarSolid />
              </li>
            </ul>
          </div>
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
              color="gray3"
              fontWeight="normal"
              textAlign="left"
              variant="h6"
              component="h6"
              children={val.category}
            />
            <Title textAlign="left" variant="h4" component="h4">
              <span>
                {val.price} <AwesomeIcon.Tl />
              </span>
            </Title>
            <Text fontSize="1.6rem" color="gray2" children={val.content} />

            <div style={{ width: '100%', margin: '15px 0' }}>
              <IconLabel text={val.location} icon={AwesomeIcon.Map} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dietitians;
