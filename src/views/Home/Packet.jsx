import React, {  useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';
import { useSelector } from 'react-redux'
//mocdata

const Packet = (props) => {
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
      name: 'Tümü',
      activeClass: activeCategory == 1 ? 'active' : '',
      //link: '#all',

    },
    {
      id: 2,
      name: 'Eğitmen Paketleri',
      activeClass: activeCategory == 2 ? 'active' : '',
      // link: '#all',
    },
    {
      id: 3,
      name: 'Diyetisyen Paketleri',
      activeClass: activeCategory == 3 ? 'active' : '',
      // link: '#all',
    },
  ];
  function dataSelector() {
    switch (activeCategory) {
      case 1:
        return (
          content?.package_pt?.concat(content?.package_pt)


        )
      case 2:
        return (
          content?.package_pt

        )
      case 2:
        return (
          content?.package_dt

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
          PAKETLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          SANA UYGUN OLAN PAKETİ SEÇ, HEMEN ÇALIŞMAYA BAŞLA
        </Title>
      </Container>
      <PacketSlider
        query={query}
        data={dataSelector()}
        handleClickCategory={(id) => {
          setActiveCategory(id)
        }}
        groups={groups}
        categories={categories}
        link={link}
        handleSeeMoreClick={handleSeeMoreClick}
      />
    </section>
  );
};

export default Packet;
