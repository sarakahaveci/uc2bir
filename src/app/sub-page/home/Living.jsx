import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/text';
import SliderFocus from '../../../components/sliders/SliderFocus';

import { useStaticQuery, graphql } from "gatsby";

const Living = (props) => {
    const query = useStaticQuery(graphql`
        {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/gym/"}}, sort: {order: DESC, fields: id}) {
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
    const groups = "GYM";
    const link = "/gym";
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    SALONLAR
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    İSTEDİĞİN SALONDA ÇALIŞMA FIRSATI
                </Title>
            </Container>
            <SliderFocus query={query} data={data} groups={groups} link={link}/>
        </section>
    );
};

export default Living;