import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Packet = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/packets?type=packets');
  };

  const [activeCategory, setActiveCategory] = useState(1);
  const {
    content: { data: content },
  } = useSelector((state) => state.home);
  const query = true;
  //TODO : Tablara linklemeleri yapılacak
  const groups = 'Packet';
  const link = '/packets';
  const categories = [
    {
      id: 1,
      name: t('all'),
      activeClass: activeCategory == 1 ? 'active' : '',
      //link: '#all',
    },
    {
      id: 2,
      name: t('Trainer Packages'),
      activeClass: activeCategory == 2 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 3,
      name: t('Dietitian Packages'),
      activeClass: activeCategory == 3 ? 'active' : '',
      // link: '#all',
    },
  ];
  function dataSelector() {
    var package_pt = content?.package_pt?.map((item) => ({
      ...item,
      type: 'pt',
    }));
    var package_dt = content?.package_dt?.map((item) => ({
      ...item,
      type: 'dt',
    }));
    switch (activeCategory) {
      case 1:
        return package_pt?.concat(package_dt);
      case 2:
        return package_pt;
      case 3:
        return package_dt;
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
          {t('packages')}
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          {t('CHOOSE THE PACKAGE THAT IS SUITABLE FOR YOU, START WORK NOW')}
        </Title>
      </Container>
      <PacketSlider
        query={query}
        data={dataSelector()}
        handleClickCategory={(id) => {
          setActiveCategory(id);
        }}
        activeCategory={activeCategory}
        groups={groups}
        categories={categories}
        link={link}
        handleSeeMoreClick={handleSeeMoreClick}
      />
    </section>
  );
};

export default Packet;
