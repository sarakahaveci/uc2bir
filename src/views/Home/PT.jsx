import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { HomeUserSlider, Title } from 'components';

const PT = ({ className }) => {
  const {
    content: { data: content },
  } = useSelector((state) => state.home);

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
      <HomeUserSlider data={content?.list_pt} link={link} />
    </section>
  );
};

export default PT;
