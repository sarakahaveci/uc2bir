import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import Title from 'components/typography/Titles';
import SliderFocus from 'components/sliders/SliderFocus';

const PT = ({ className }) => {
  const { content } = useSelector((state) => state.home);

  const link = '/instructor';
  return (
    <section className={cx('pt', { [`${className}`]: className })}>
      <Container>
        <Title variant="h3" lineDisable={false} component="h3">
          EĞİTMENLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <SliderFocus data={content?.list_pt} link={link} userType="PT" />
    </section>
  );
};

export default PT;
