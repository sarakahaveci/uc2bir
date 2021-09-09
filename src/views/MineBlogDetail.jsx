import React, { useEffect } from 'react';
import {
  Main,
  Title,
  Spinner,
  BlogCartList,
  AwesomeIcon,
  Svg,
} from 'components';
import { useTranslation } from 'react-i18next';

import { Col, Container, Row } from 'react-bootstrap';
import { decode } from 'html-entities';
import ReactHtmlParser from 'react-html-parser';

import { useSelector, useDispatch } from 'react-redux';
import { getMineBlogDetail } from 'actions';
import { useHistory } from 'react-router-dom';

import { FacebookShareButton, TwitterShareButton } from 'react-share';

const MineBlogDetail = ({ match }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.myBlogs?.blogs);
  const detail = useSelector((state) => state?.myBlogs?.detail);
  const history = useHistory();
  const goToBlogs = () => {
    return history.push('/myprofile/settings/blog/');
  };
  useEffect(() => {
    dispatch(getMineBlogDetail(match?.params?.id));
  }, [match?.params]);

  return (
    <Main>
      <div className="blog-detail">
        <Container>
          <Row>
            <div
              onClick={() => {
                goToBlogs();
              }}
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Svg.ArrowLeftIcon />
              <h6 style={{ marginLeft: '5px' }}>{t('my posts')}</h6>
            </div>
          </Row>
          {!detail.isLoading ? (
            <div className="blog-detail__wrapper">
              <div className="blog-detail__img">
                <img src={detail?.data?.blog?.photo} />
              </div>

              <Row>
                <Col xs="auto">
                  <div className="blog-detail__share-buttons">
                    <Title fontSize="9pt">{t('Share')}</Title>
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

export default MineBlogDetail;
