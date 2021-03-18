import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Col, Container, Row } from 'react-bootstrap';
import { BlogBanners, Pagination } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogList } from 'actions';

const BlogList = () => {
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogList());
  }, []);

  return (
    <Container fluid>
      <Section>
        <List>
          {blogs?.data?.blogs?.map((val, key) => (
            <Col key={key} xs="4">
              <BlogBanners left data={val} />
            </Col>
          ))}
        </List>
      </Section>
      <End>
        <Pagination page={1} onChange={1} count={10} />
      </End>
    </Container>
  );
};

const End = styled(Container)`
  margin-bottom: 90px;
`;

const List = styled(Row)`
  margin-top: 10%;
  margin-bottom: 50px;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 30px;
`;

export default BlogList;
