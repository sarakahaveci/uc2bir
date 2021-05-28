import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';
import { useSelector } from 'react-redux';



const GroupLesson = (props) => {
  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/group-lessons?type=group-lessons');
  };
  const {
    content: { data: content },
  } = useSelector((state) => state.home);
  const query = true;
  //TODO : Tablara linklemeleri yapılacak
  const groups = 'GroupLesson';
  const link = '/packets';
  const categories = [
    {
      id: 1,
      name: 'Tümü',
      activeClass: 'active',
      // link: '#all',
    },
    {
      id: 2,
      name: 'Yoga',
      activeClass: '',
      // link: '#all',
    },
    {
      id: 3,
      name: 'Box',
      activeClass: '',
      // link: '#all',
    },
    {
      id: 4,
      name: 'Meditasyon',
      activeClass: '',
      // link: '#all',
    },
    {
      id: 5,
      name: 'Vücut Geliştirme',
      activeClass: '',
      // link: '#all',
    },
    {
      id: 6,
      name: 'Pilates',
      activeClass: '',
      // link: '#all',
    },
  ];
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title
          variant="h3"
          component="h3"
          lineDisable={false}
          letterSpacing="100"
          fontWeight="600"
        >
          GRUP DERSLERİ
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          ARKADAŞLARINLA BERABER, İSTEDİĞİN SALONDA, İSTEDİĞİN EĞİTMENDEN DERS
          ALMA FIRSATI
        </Title>
      </Container>
      <PacketSlider
        query={query}
        data={content.list_dt || []}
        groups={groups}
        categories={categories}
        link={link}
        handleSeeMoreClick={handleSeeMoreClick}
      />
    </section>
  );
};

export default GroupLesson;
