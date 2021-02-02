import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/text';
import SliderFocus from '../../../components/sliders/SliderFocus';

import { useStaticQuery, graphql } from 'gatsby';

const Dietitians = (props) => {
  const query = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/dietitians/" } }
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
              location
              stars
              ctn
              team
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
  const groups = 'Dietitians';
  const link = '/dietitians';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          DİYETİSYENLER
        </Title>
        <Title variant="h5" component="h5" fontWeight="500" lineDisable>
          SANA UYGUN DİYET PROGRAMINI, SANA ÖZEL DİYETİSYENLERLE BELİRLE
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default Dietitians;
