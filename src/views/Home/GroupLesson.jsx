import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';
import { useSelector } from 'react-redux';
import {FITNESS,PILATES,YOGA,TENNIS} from '../../constants/sportTypes'


const GroupLesson = (props) => {
  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/group-lessons?type=group-lessons');
  };
  const {
    content: { data: content },
  } = useSelector((state) => state.home);
  const [activeCategory, setActiveCategory] = useState(1);

  const query = true;
  //TODO : Tablara linklemeleri yapılacak
  const groups = 'GroupLesson';
  const link = '/packets';
  const categories = [
    {
      id: 1,
      name: 'Tümü',
      activeClass: activeCategory == 1 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 2,
      name: 'Fitness',
      activeClass: activeCategory == 2 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 3,
      name: 'Yoga',
      activeClass: activeCategory == 3 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 4,
      name: 'Tennis',
      activeClass: activeCategory == 4 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 5,
      name: 'Pilates',
      activeClass: activeCategory == 6 ? 'active' : '',
      // link: '#all',
    },
  ];
  function dataSelector() {
    switch (activeCategory) {
      case 1:
        return (
          content?.group_lesson?.concat(content?.group_lesson)


        )
      case 2:
        return (
          content?.group_lesson?.filter(item=>item?.slot?.branch?.id == FITNESS)

        )
      case 3:
        return (
          content?.group_lesson?.filter(item=>item?.slot?.branch?.id == YOGA)

        )
      case 4:
        return (
          content?.group_lesson?.filter(item=>item?.slot?.branch?.id == TENNIS)

        )
      case 5:
        return (
          content?.group_lesson?.filter(item=>item?.slot?.branch?.id == PILATES)

        )
     

      default:
        break;
    }
  }
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
        data={dataSelector()}
        groups={groups}
        categories={categories}
        link={link}
        handleClickCategory={(id) => {
          setActiveCategory(id)
        }}
        handleSeeMoreClick={handleSeeMoreClick}
      />
    </section>
  );
};

export default GroupLesson;
