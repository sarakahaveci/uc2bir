import React from 'react';
import { Container } from 'react-bootstrap';
import {BlogBanners, Button, Title} from '../../components';

const Blog = (props) => {
  return (
    <section className={`blog ${props.className}`}>
      <Title variant="h3" component="h3">Blog</Title>
      <Container fluid>
        <div className="row">
          <div className="col-xl-8">
            <BlogBanners left />
            <BlogBanners right />
          </div>
          <div className="col-xl-4">
            <BlogBanners top />
          </div>
          <div
            style={{ marginBottom: '90px', marginTop: '30px' }}
            className="col d-flex justify-content-center"
          >
            <Button lineButton text="Tümünü Gör" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Blog;
