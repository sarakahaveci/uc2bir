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
              backgroundImage: `url(${val.node.frontmatter.image.childImageSharp.fluid.src})`,
            }}
          />
        </div>
      )}
      {bottom && (
        <div className="slider-item">
          <div className="slider-item-content">
            <Title
              textLeft
              lineDisable
              variant="h5"
              component="h5"
              children={val.node.frontmatter.name}
            />
            <Title
              lineDisable
              textLeft
              variant="h6"
              component="h6"
              color="gray3"
              fontWeight="normal"
              children={val.node.frontmatter.category}
            />
            <Title textLeft variant="h4" component="h4">
              <span>
                {val.node.frontmatter.price} <AwesomeIcon.Tl />
              </span>
            </Title>
            <Text
              fontSize="16px"
              color="gray2"
              children={val.node.frontmatter.content}
            />
            <ul className="slick-button-group row">
              <li>
                <Button text="Box" />
              </li>
              <li>
                <Button text="Plates" />
              </li>
              <li>
                <Button text="Fitnes" />
              </li>
            </ul>
            <div style={{ width: '100%', margin: '15px 0' }}>
              <IconLabel
                text={val.node.frontmatter.location}
                icon={AwesomeIcon.Map}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GYM;
