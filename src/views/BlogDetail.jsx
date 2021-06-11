import React, { useEffect } from 'react';
import { Main, Title, Spinner, BlogCartList, AwesomeIcon } from 'components';
import { Col, Container, Row } from 'react-bootstrap';
import { decode } from 'html-entities';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

const BlogDetail = ({ match }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const detail = useSelector((state) => state?.myBlogs?.detail);

  useEffect(() => {
    dispatch(getBlogDetail(match?.params?.seo));
  }, [match?.params]);

  return (
    <div>
      <Main>
        <section className="blog-top">
          <div className="blog-top__banner" />
        </section>
        <div className="blog-detail">
          <Container>
            {!detail.isLoading ? (
              <div className="blog-detail__wrapper">
                <BlogWrapper>
                  <Row>
                    <Col className="blog-detail__content">
                      <Title variant="h3" component="h3" lineDisable={false}>
                        {detail?.data?.blog?.title}
                      </Title>
                      <Col xs="auto">
                        <div className="blog-detail__share-buttons">
                          <span className="blog-detail__share-title">
                            Paylaş
                          </span>
                          <FacebookShareButton
                            url={`${window?.location?.origin}/${match?.url}`}
                            media={detail?.data?.blog?.photo}
                            windowWidth={1000}
                            windowHeight={730}
                          >
                            <AwesomeIcon.Facebook />
                          </FacebookShareButton>

                          <TwitterShareButton
                            url={`${window?.location?.origin}/${match?.url}`}
                            media={detail?.data?.blog?.photo}
                            windowWidth={1000}
                            windowHeight={730}
                          >
                            <AwesomeIcon.Twitter />
                          </TwitterShareButton>
                          <LinkedinShareButton
                            url={`${window?.location?.origin}/${match?.url}`}
                            media={detail?.data?.blog?.photo}
                            windowWidth={1000}
                            windowHeight={730}
                          >
                            <AwesomeIcon.Linkedin />
                          </LinkedinShareButton>
                        </div>
                      </Col>
                    </Col>
                  </Row>{' '}
                  <text className="blog-detail__text">
                    {ReactHtmlParser(decode(detail?.data?.blog?.detail))}
                  </text>
                  <div className="blog-detail__img">
                    <img src={detail?.data?.blog?.photo} />
                  </div>
                </BlogWrapper>
              </div>
            ) : (
              <Spinner />
            )}
          </Container>
          <Container fluid>
            <BlogCartList blogs={blogs.data.blogs} />
          </Container>
        </div>
      </Main>
    </div>
  );
};

export default BlogDetail;

const BlogWrapper = styled.div`
  width: 1250px;
  text-align: center;
  background-color: white;
  border-radius: 50px;
  padding: 100px;
  position: relative;
  top: -400px;
  left: 0px;
  right: 0px;

  @media (max-width: 1250px) {
    width: 900px;
    padding: 80px;
  }
  @media (max-width: 769px) {
    width: 600px;
    padding: 50px;
  }
  @media (max-width: 576px) {
    width: 300px;
    padding: 20px;
  }
`;
