import React, { useEffect } from 'react';
import {
  Main,
  Title,
  Text,
  Spinner,
  BlogCartList,
  AwesomeIcon,
} from 'components';
import styled from 'styled-components/macro';
import { Col, Container, Row } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from 'react-share';

const BlogDetail = ({ match }) => {
  const detail = useSelector((state) => state?.myBlogs?.detail);
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogDetail(match?.params?.seo));
  }, []);

  return (
    <Main className="blog-detail">
      <Container>
        <>
          {!detail.isLoading ? (
            <>
              <Row style={{ marginTop: 30 }}>
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
                <Col>
                  <Row>
                    <Img src={detail?.data?.blog?.photo}></Img>
                    <Title variant="h4" component="h4" textAlign="left">
                      {detail?.data?.blog?.title}
                    </Title>
                    <Text>{detail?.data?.blog?.detail}</Text>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <Spinner />
          )}
        </>
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
  padding: 0 30px;

  button {
    margin-bottom: 5px;
  }
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 30px;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;


export default BlogDetail;
