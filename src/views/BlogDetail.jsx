import React, { useEffect } from 'react';
import { Main, Title, Spinner, BlogCartList, AwesomeIcon } from 'components';
import { Col, Container, Row } from 'react-bootstrap';
import { decode } from 'html-entities';
import ReactHtmlParser from 'react-html-parser';

import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';

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
      <div className="blog-detail">
        <Container>
          {!detail.isLoading ? (
            <div className="blog-detail__wrapper">
              <div className="blog-detail__img">
                <img src={detail?.data?.blog?.photo} />
              </div>
              <Row>
                <Col xs="auto">
                  <div className="blog-detail__share-buttons">
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
                  </div>
                </Col>
                <Col className="blog-detail__content">
                  <Title variant="h3" component="h3" lineDisable={false}>
                    {detail?.data?.blog?.title}
                  </Title>
                  <div lassName="blog-detail__text">
                  {ReactHtmlParser(decode(detail?.data?.blog?.detail))}
                  </div>
                </Col>
              </Row>
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
  );
};

export default BlogDetail;
