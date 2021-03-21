import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Container, Row } from 'react-bootstrap';
import { BlogBanners, Pagination, Spinner, Title } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogList } from 'actions';

const BlogList = () => {
  // @ts-ignore
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogList());
  }, []);

  const pageChangeHandler = (event, value) => {
    dispatch(getBlogList(10, value));
  };

  return (
    <section className="blog-list">
      <div className="blog-list__top-banner" />
      <Container fluid>
        <Title variant="h3" className="blog-list__title" component="h3" lineDisable={false}>
          BLOG
        </Title>
        {!blogs.isLoading ? (
          <div className="blog-list__content">
            <List>
              {blogs?.data?.blogs?.map((blog, i) => (
                <BlogBanners key={blog.id} blogOrder={i} data={blog} />
              ))}
            </List>
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
  margin-bottom: 90px;
`;

const List = styled(Row)`
  margin-top: 120px;
  margin-bottom: 50px;
`;

export default BlogList;
