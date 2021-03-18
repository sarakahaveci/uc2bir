import React, { useEffect, useState } from 'react';
import { Main, Title, Text, Spinner } from 'components';
import axios from 'axios';
import styled from 'styled-components/macro';
import { Container, Row } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';

const BlogDetail = ({ match }) => {
  const detail = useSelector((state) => state?.myBlogs?.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogDetail(match?.params?.seo));
  }, []);

  return (
    <Main>
      <Container>
        <Row style={{ marginTop: 15 }}>
          {!detail.isLoading ? (
            <>
              <Img src={detail?.data?.blog?.photo}></Img>
              <Title variant="h4" component="h4" textAlign="left">
                {detail?.data?.blog?.title}
              </Title>
              <Text>{detail?.data?.blog?.detail}</Text>
            </>
          ) : (
            <Spinner />
          )}
        </Row>
      </Container>
    </Main>
  );
};

const Img = styled.img`
  width: 100%;
  height: auto;
`;

export default BlogDetail;
