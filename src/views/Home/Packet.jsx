import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';

//mocdata
import * as Data from './MocData';

const Packet = (props) => {
  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/packets?type=packets');
  };

  const query = true;
  //TODO : Tablara linklemeleri yapılacak
  const data = Data.Packets;
  const groups = 'Packet';
  const link = '/packets';
  const categories = [
    {
      id: 1,
      name: 'Tümü',
      activeClass: 'active',
    },
    {
      id: 2,
      name: 'Eğitmen Paketleri',
      activeClass: '',
      // link: '#all',
    },
    {
      id: 3,
      name: 'Diyetisyen Paketleri',
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
          PAKETLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          SANA UYGUN OLAN PAKETİ SEÇ, HEMEN ÇALIŞMAYA BAŞLA
        </Title>
      </Container>
      <PacketSlider
        query={query}
        data={data}
        groups={groups}
        categories={categories}
        link={link}
        handleSeeMoreClick={handleSeeMoreClick}
      />
    </section>
  );
};

export default Packet;
