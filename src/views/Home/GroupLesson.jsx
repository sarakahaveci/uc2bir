import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';

//mocdata
import * as Data from './MocData';

const GroupLesson = (props) => {
  const query = true;

  const data = Data.GroupLesson;
  const groups = 'GroupLesson';
  const link = '/packets';
  const categories = [
    {
      id: 1,
      name: 'Tümü',
      activeClass: 'active',
      link: '#all',
    },
    {
      id: 2,
      name: 'Yoga',
      activeClass: '',
      link: '#all',
    },
    {
      id: 3,
      name: 'Box',
      activeClass: '',
      link: '#all',
    },
    {
      id: 4,
      name: 'Meditasyon',
      activeClass: '',
      link: '#all',
    },
    {
      id: 5,
      name: 'Vücut Geliştirme',
      activeClass: '',
      link: '#all',
    },
    {
      id: 6,
      name: 'Pilates',
      activeClass: '',
      link: '#all',
    },
  ];
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false}>
          GRUP DERSLERİ
        </Title>
        <Title variant="h6" component="h6" fontWeight="500" >
          ARKADAŞLARINLA BERABER, İSTEDİĞİN SALONDA, İSTEDİĞİN EĞİTMENDEN DERS
          ALMA FIRSATI
        </Title>
      </Container>
      <PacketSlider
        query={query}
        data={data}
        groups={groups}
        categories={categories}
        link={link}
      />
    </section>
  );
};

export default GroupLesson;
