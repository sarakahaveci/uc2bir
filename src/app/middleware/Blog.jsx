import React from 'react';
import { Container } from 'react-bootstrap';
import BlogBanners from '../../components/banner/blog-banners';
import Button from '../../components/buttons/button';
import LineButton from '../../components/buttons/line-button';
import Title from '../../components/typography/title';

const Blog = ({className}) => {
    return (
        <section className={`blog ${className}`}>
            <Title variant="h3" component="h3" children="Blog"/>
            <Container fluid>
                <div className="row">
                    <div className="col-xl-8">
                        <BlogBanners left/>
                        <BlogBanners right/>
                    </div>
                    <div className="col-xl-4">
                        <BlogBanners top/>
                    </div>
                    <div style={{marginBottom: "90px", marginTop: "30px"}} className="col d-flex justify-content-center">
                        <LineButton text="Tümünü Gör"/>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Blog;