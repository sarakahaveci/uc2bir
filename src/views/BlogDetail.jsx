import React, { useEffect } from 'react';
import { Main, Spinner, BlogCartList, AwesomeIcon } from 'components';
import { Col, Container, Row } from 'react-bootstrap';
import { decode } from 'html-entities';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogDetail } from 'actions';
import { useTranslation } from 'react-i18next';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

const BlogDetail = ({ match }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const detail = useSelector((state) => state?.myBlogs?.detail); 
  const {  infoData } = useSelector((state) => state.footer);

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
                  <div
                    style={{
                      alignItems: 'center',
                      position: 'absolute',
                      left: '10px',
                      marginLeft: '10px',
                      marginTop: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      className="blog-detail__share-buttons"
                    >
                      <span
                        style={{ marginBottom: '10px' }}
                        className="blog-detail__share-title"
                      >
                        {t('Share')}
                      </span>
                      <FacebookShareButton
                        style={{ marginBottom: '10px' }}
                        url={`${window?.location?.origin}/${match?.url}`}
                        media={detail?.data?.blog?.photo}
                        windowWidth={1000}
                        windowHeight={730}
                      >
                        <AwesomeIcon.Facebook />
                      </FacebookShareButton>

                      <TwitterShareButton
                        style={{ marginBottom: '10px' }}
                        url={`${window?.location?.origin}/${match?.url}`}
                        media={detail?.data?.blog?.photo}
                        windowWidth={1000}
                        windowHeight={730}
                      >
                        <AwesomeIcon.Twitter />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        style={{ marginBottom: '10px' }}
                        url={`${window?.location?.origin}/${match?.url}`}
                        media={detail?.data?.blog?.photo}
                        windowWidth={1000}
                        windowHeight={730}
                      >
                        <AwesomeIcon.Linkedin />
                      </LinkedinShareButton>
                    </div>
                  </div>
                  <Row>
                    <Col>
                      <Title>{detail?.data?.blog?.title}</Title>
                      <Seperator />
                    </Col>
                  </Row>{' '}
                  <Desc className="blog-detail__text">
                    {ReactHtmlParser(decode(detail?.data?.blog?.detail))}
                  </Desc>
                  <FixedText>{infoData?.['fixed-blog-text']}</FixedText>
                  <div className="blog-detail__img">
                    <img src={detail?.data?.blog?.photo} />
                  </div>
                </BlogWrapper>
              </div>
            ) : (
              <Spinner />
            )}
          </Container>
        </div>
        <Container fluid>
          <BlogCartList blogs={blogs.data.blogs} />
        </Container>
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
  top: 0px;
  left: 0px;
  right: 0px;

  @media (max-width: 1250px) {
    width: 900px;
    padding: 100px;
  }
  @media (max-width: 769px) {
    width: 650px;
    padding: 90px;
  }
  @media (max-width: 576px) {
    width: 300px;
    padding: 20px;
  }
`;
const Title = styled.p`
  width: 500px;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  font-size: 60px;
  font-weight: bold;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;

  @media (max-width: 769px) {
    font-size: 30px;
  }
  @media (max-width: 576px) {
    font-size: 20px;
    margin-top: 200px;
    align-self: center;
  }

  &:first-line {
    color: black;
  }
`;
const Seperator = styled.div`
  width: 150px;
  border-bottom-style: solid;
  border-color: var(--blue);
  border-width: 3px;
  margin-bottom: 15px;
  margin-top: 15px;
`;
const Desc = styled.p`
  font-size: 16px;
  text-align: left;
  font-weight: normal;
  margin-top: 30px;
`;
const FixedText = styled.p`
  font-size: 14px;
  text-align: left;
  font-weight: normal;
  margin-top: 30px;
  color:gray;
`;

