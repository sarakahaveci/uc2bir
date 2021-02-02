// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../../components/typography/title';
import SliderFocus from '../../../components/sliders/SliderFocus';

import { useStaticQuery, graphql } from 'gatsby';

const PT = (props) => {
  const query = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/pt-groups/" } }
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
  const groups = 'PT';
  const link = '/instructor';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          EĞİTMENLER
        </Title>
        <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
          EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default PT;
