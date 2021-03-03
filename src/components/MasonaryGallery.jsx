import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MasonaryGallery = ({
  gutter = '10px',
  columnsCount = 3,
  galleries,
  className = null,
  style = {},
  columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 },
}) => {
  return (
    <Section className={className} style={style}>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry columnsCount={columnsCount} gutter={gutter}>
          {galleries?.map((image, i) => (
            <img
              key={i}
              src={image.src}
              style={{ width: '100%', display: 'block' }}
              alt=""
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Section>
  );
};

const Section = styled.section`
  height: auto;
`;

MasonaryGallery.propTypes = {
  galleries: PropTypes.array.isRequired,
};

export default MasonaryGallery;

/*
 * example
 * <MasonaryGallery 
    gutter?,
    columnsCount?,
    galleries,
    className?,
    style?,
    columnsCountBreakPoints?
    galleries={[
      {
        type: "video",
        src: img,
        link: img,
      },
      {
        type: "img",
        src: item1,
        link: item1,
      }
    ]}
  />
*/
