import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../../components/typography/title';
import PacketSlider from '../../../components/sliders/PacketSlider';

import { useStaticQuery, graphql } from 'gatsby';

const Packet = (props) => {
  const query = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/packets/" } }
        sort: { order: DESC, fields: id }
      ) {
        edges {
          node {
            frontmatter {
              name
              title
              category
              price
              content
              package_included
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            id
          }
        }
      }
    }
  `);

  const data = query.allMarkdownRemark.edges;
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
