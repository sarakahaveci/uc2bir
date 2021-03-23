import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import { Title, DefBackground } from 'components';
import AsNavFor from 'components/sliders/AsNavFor';

const TopPromotion = ({ className, background, children }) => {
  return (
    <section className={cx('top-promotion', { [`${className}`]: className })}>
      {background && (
        <div
          className="background-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <Title
              variant="h3"
              component="h3"
              lineDisable={false}
              textLeft
              fontWeight="600"
            >
              Başarmak İçİn sen de hemen başla!
            </Title>
            <p className="mb-5">
              Spor için tutku, özgürlük, motivasyon, enerji; Forma Girmek için
              heves, istikrar, profesyonel destek; Grup Motivasyonu için ortak
              hedefler, beraberlikten gelen itici güç! Unutma hedeflerini ancak
              başlayanlar başarabilir.
            </p>
          </div>
          <div className="slider-p0 col-lg-6 d-flex">
            <AsNavFor />
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
};

export default TopPromotion;
