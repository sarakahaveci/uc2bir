import React from 'react';

import Title from '../../../components/typography/title';
import Text from '../../../components/typography/text';
import AwesomeIcon from '../../../statics/icon';
import Button from '../../../components/buttons/button';
import IconLabel from '../../../components/buttons/icon-label';

const Dietitians = ({ top = false, bottom = false, val }) => {
  return (
    <>
      {top && (
        <div className="slider-item">
          <div
            className="img"
            style={{
              backgroundImage: `url(${val.node.frontmatter.image.childImageSharp.fluid.src})`,
            }}
          >
            <ul className="points">
              <li
                className={`${val.node.frontmatter.stars > 0 ? 'active' : ''}`}
              >
                <AwesomeIcon.StarSolid />
              </li>
              <li
                className={`${val.node.frontmatter.stars > 1 ? 'active' : ''}`}
              >
                <AwesomeIcon.StarSolid />
              </li>
              <li
                className={`${val.node.frontmatter.stars > 2 ? 'active' : ''}`}
              >
                <AwesomeIcon.StarSolid />
              </li>
              <li
                className={`${val.node.frontmatter.stars > 3 ? 'active' : ''}`}
              >
                <AwesomeIcon.StarSolid />
              </li>
              <li
                className={`${val.node.frontmatter.stars > 4 ? 'active' : ''}`}
              >
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
              textLeft
              lineDisable
              variant="h5"
              component="h5"
              children={val.node.frontmatter.name}
            />
            <Title
              lineDisable
              fontWeight="lighter"
              textLeft
              variant="h6"
              component="h6"
              children={val.node.frontmatter.category}
            />
            <Title textLeft variant="h4" component="h4">
              <span>
                {val.node.frontmatter.price} <AwesomeIcon.Tl />
              </span>
            </Title>
            <Text
              fontSize="1.6rem"
              color="gray2"
              children={val.node.frontmatter.content}
            />

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

export default Dietitians;
