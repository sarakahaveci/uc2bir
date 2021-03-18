import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {BlogBanners, Button, Title} from '../../components';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogList } from 'actions';

const Blog = (props) => {
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogList());
  }, []);

  return (
    <section className={`blog ${props.className}`}>
      <Title variant="h3" component="h3">Blog</Title>
      <Container fluid>
        <div className="row">
          <div className="col-xl-8">
            <BlogBanners left data={blogs?.data?.blogs?.[0]} />
            <BlogBanners right data={blogs?.data?.blogs?.[1]} />
          </div>
          <div className="col-xl-4">
            <BlogBanners top data={blogs?.data?.blogs?.[2]} />
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
