import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Container } from 'react-bootstrap';
import { BlogCartList, Pagination, Spinner, Title } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogList } from 'actions';

const BlogList = () => {
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogList());
  }, []);

  const pageChangeHandler = (_, value) => {
    dispatch(getBlogList(10, value));
  };

  return (
    <section className="blog-list">
      <div className="blog-list__top-banner" />
      <Container fluid>
        <div className="blog-list__title">
          <Title variant="h3" component="h3" lineDisable={false}>
            BLOG
          </Title>
        </div>
        {!blogs.isLoading ? (
          <div className="blog-list__content">
            <BlogCartList blogs={blogs?.data?.blogs} />
          </div>
        ) : (
          <Spinner />
        )}
        <End>
          <Pagination
            page={blogs?.data?.currentPage}
            onChange={pageChangeHandler}
            count={blogs?.data?.totalPage}
          />
        </End>
      </Container>
    </section>
  );
};

const End = styled(Container)`
  margin-top: 10px;
`;

export default BlogList;
