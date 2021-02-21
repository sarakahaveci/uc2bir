import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import PacketSlider from '../../components/sliders/PacketSlider';

//mocdata
import * as Data from './MocData';

const Packet = (props) => {
  const query = true;

  const data = Data.Packets;
  const groups = 'Packet';
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
      name: 'Eğitmen Paketleri',
      activeClass: '',
      link: '#all',
    },
    {
      id: 3,
      name: 'Diyetisyen Paketleri',
      activeClass: '',
      link: '#all',
    },
  ];
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          PAKETLER
        </Title>
        <Title variant="h5" component="h5" fontWeight="500" lineDisable>
          SANA UYGUN OLAN PAKETİ SEÇ, HEMEN ÇALIŞMAYA BAŞLA
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

export default Packet;
