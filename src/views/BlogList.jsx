import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Col, Container, Row } from 'react-bootstrap';
import { BlogBanners, Pagination, Spinner } from 'components';

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
    <Section>
      <Container fluid>
        {!blogs.isLoading ? (
          <>
            <List>
              {blogs?.data?.blogs?.map((val, key) => (
                <Col key={key} xs="4">
                  <BlogBanners
                    left={key % 2 === 0 ? true : false}
                    right={key % 2 === 0 ? false : true}
                    data={val}
                  />
                </Col>
              ))}
            </List>
          </>
        ) : (
          <Spinner />
        )}
        <End>
          <Pagination page={blogs?.data?.currentPage} onChange={pageChangeHandler} count={blogs?.data?.totalPage} />
        </End>
      </Container>
    </Section>
  );
};

const End = styled(Container)`
  margin-bottom: 90px;
`;

const List = styled(Row)`
  margin-top: 120px;
  margin-bottom: 50px;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 50px;
`;

export default BlogList;
