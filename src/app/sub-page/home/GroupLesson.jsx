import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../../components/typography/title';
import PacketSlider from '../../../components/sliders/PacketSlider';

import { useStaticQuery, graphql } from 'gatsby';

const GroupLesson = (props) => {
  const query = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/group-lesson/" } }
        sort: { order: DESC, fields: id }
      ) {
        edges {
          node {
            frontmatter {
              name
              title
              category
              price

              date
              content
              location
              ctn
              seater
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
      name: 'Body Building',
      activeClass: '',
      link: '#all',
    },
    {
      id: 6,
      name: 'Palates',
      activeClass: '',
      link: '#all',
    },
  ];
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          GRUP DERSLERİ
        </Title>
        <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
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
