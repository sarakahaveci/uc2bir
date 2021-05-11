import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { HomeUserSlider, Title } from 'components';
import * as Data from './MocData';
const PT = ({ className }) => {
  const {
    content: { data: content },
  } = useSelector((state) => state.home);
  const data = Data.Pt;
  // You can delete it later
  if ((content?.list_pt || []).length === 0) {
    return <> </>;
  }

  const link = '/instructor';
  return (
    <section className={cx('pt', { [`${className}`]: className })}>
      <Container>
        <Title
          variant="h3"
          lineDisable={false}
          component="h3"
          letterSpacing="100"
          fontWeight="600"
        >
          EĞİTMENLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <HomeUserSlider
        //data={content?.list_pt || []}
        data={data || []}
        link={link}
      />
    </section>
  );
};

export default PT;
