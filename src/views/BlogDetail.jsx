import React, { useEffect } from 'react';
import { Main, Title, Spinner, BlogCartList, AwesomeIcon } from 'components';
import styled from 'styled-components/macro';
import { Col, Container, Row } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';
import {decode} from 'html-entities';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from 'react-share';

const BlogDetail = ({ match }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const detail = useSelector((state) => state?.myBlogs?.detail);
  
  useEffect(() => {
    dispatch(getBlogDetail(match?.params?.seo));
  }, [match?.params]);

  return (
    <Main>
      <Container>
        {!detail.isLoading ? (
          <div className="blog-detail__wrapper">
            <div className="blog-detail__img">
              <img src={detail?.data?.blog?.photo} />
            </div>
            <Row>
              <Col xs="auto">
                <ShareButtons>
                  <Title fontSize="9pt">Paylaş</Title>
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

                  <InstapaperShareButton
                    url={`${window?.location?.origin}/${match?.url}`}
                    media={detail?.data?.blog?.photo}
                    windowWidth={1000}
                    windowHeight={730}
                  >
                    <AwesomeIcon.Instagram />
                  </InstapaperShareButton>

                  <LinkedinShareButton
                    url={`${window?.location?.origin}/${match?.url}`}
                    media={detail?.data?.blog?.photo}
                    windowWidth={1000}
                    windowHeight={730}
                  >
                    <AwesomeIcon.Linkedin />
                  </LinkedinShareButton>
                </ShareButtons>
              </Col>
              <Col className="blog-detail__content">
                <Title variant="h3" component="h3" lineDisable={false}>
                  {detail?.data?.blog?.title}
                </Title>
                <div
                  className="blog-detail__text"
                  dangerouslySetInnerHTML={{
                    __html:decode(detail?.data?.blog?.detail) ,
                  }}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <Spinner />
        )}
      </Container>
      <Section>
        <Container fluid>
          <BlogCartList blogs={blogs.data.blogs} />
        </Container>
      </Section>
    </Main>
  );
};

const ShareButtons = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: 5px;
  }
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 30px;
  margin-bottom:270px;
`;

export default BlogDetail;
