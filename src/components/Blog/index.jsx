/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import image from '../../assets/blog.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Text,
  Title,
  Svg,
  PlusButton,
  Span,
  Button,
  Material,
  Spinner,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import axios from 'axios';
import FormData from 'form-data';
import { getMyBlogs } from 'actions';
import { toast } from 'react-toastify';
import { default as MaterialButton } from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { resizeFile } from '../../utils';

const Blog = () => {
  const history = useHistory();
  const [page, setPage] = useState('');
  const [file, setFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category_id, setCategory_id] = useState(1);
  const [data, setData] = useState({});
  const [seo, setSeo] = useState(0);
  const [loading, setLoading] = useState(false);

  const { accessToken, user } = useSelector((state) => state.auth);
  const myBlogs = useSelector((state) => state.myBlogs.me);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyBlogs());
  }, []);

  const createData = new FormData();

  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/cms/blog/create`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const update_config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/cms/blog/mine/${seo}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const upload = async () => {
    const resizedFile = await resizeFile(file);
    createData.append('files[]', resizedFile);
    createData.append('category_id', category_id);
    createData.append('detail', detail);
    createData.append('title', title);
    setLoading(true);

    axios({ ...config, data: createData })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          setPage('');
          setFile('');
          dispatch(getMyBlogs());
          toast.success('Yeni blog eklendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        } else if (response.status === 400) {
          toast.error(response.data.message, {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err.response?.data?.message || 'Blog eklenirken hata oluştu',
          {
            position: 'bottom-right',
            autoClose: 2000,
          }
        );
      });
  };
  const go = (id) => {
    return history.push('/mine-blog/' + id);
  };
  const updated = () => {
    if(fileUrl){
      createData.append('files[]', fileUrl);
    }
    createData.append('category_id', category_id);
    createData.append('detail', detail || data.blog.detail);
    createData.append('title', title || data.blog.title);

    axios({ ...update_config, data: createData })
      .then(function (response) {
        dispatch(getMyBlogs());
        setPage('');
        toast.success('Blog güncellendi eklendi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message?.detail?.[0] ||
            'Blog güncellenirken hata oluştu',
          {
            position: 'bottom-right',
            autoClose: 2000,
          }
        );
      });
  };

  const edit = (id) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cms/blog/mine/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        setData(response?.data?.data);
        setSeo(response?.data?.data?.blog?.id);
        setFile(response?.data?.data?.blog?.photo);
        setPage('edit');
      })
      .catch(function (err) {
        toast.error('Blog getirilirken hata oluştu', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  const deleted = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/cms/blog/mine/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        dispatch(getMyBlogs());
        toast.success('Blog silindi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      })
      .catch(function (err) {
        toast.error('Blog eklenirken hata oluştu', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    return upload();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    return updated();
  };

  return (
    <>
      {page === 'edit' && (
        <>
          <Container>
            <Row>
              <Col lg="12">
                <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
                  Blog
                </Title>
              </Col>
              <Col lg="4">
                <ImageBanner src={image} />
              </Col>
              <Col lg="7">
                <Title fontSize="12pt" textAlign="left">
                  Blog
                </Title>
                <Text fontSize="10pt">
                  <Row>
                    <Col>
                      <>
                        Blog ekleyebilir, profilinizi güncel ve önde
                        tutabilirsiniz
                      </>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <Button text="< Geri" onClick={() => setPage('')} />
                      </div>
                    </Col>
                    <FormGroups>
                      <form onSubmit={onUpdate}>
                        <div
                          style={{ marginBottom: 15 }}
                          className="d-flex align-items-end"
                        >
                          {/*<ExtendButton>
                          <Svg.PlusIcon />
                          <div className="w-100 d-flex justify-content-center">
                            Fotoğraf Ekle
                          </div>
                        </ExtendButton>*/}
                          {file ? (
                            <ImageShow image={file} />
                          ) : (
                            <MaterialButton
                              style={{
                                marginRight: 15,
                                width: 192,
                                height: 120,
                              }}
                              variant="contained"
                              color="default"
                              component="label"
                              startIcon={<Svg.Pencil />}
                            >
                              Fotoğraf Yükle
                              <input
                                type="file"
                                hidden
                                onChange={(event) => {
                                  setFile(event.target.files[0]);
                                  setFileUrl(
                                    URL.createObjectURL(event.target.files[0])
                                  );
                                }}
                              />
                            </MaterialButton>
                          )}

                          <Material.TextField
                            label="Başlık giriniz"
                            name="title"
                            required
                            defaultValue={data?.blog?.title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <Material.TexAreaField
                          label="Detay Giriniz"
                          name="detail"
                          defaultValue={data?.blog?.detail}
                          required
                          onChange={(e) => setDetail(e.target.value)}
                        />
                        <div
                          style={{ marginTop: 15 }}
                          className="d-flex justify-content-end"
                        >
                          <Button
                            className="blue"
                            text="Güncelle"
                            type="submit"
                          />
                        </div>
                      </form>
                    </FormGroups>
                  </Row>
                </Text>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {page === '' && (
        <Container>
          <Row>
            <Col lg="12">
              <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
                Blog
              </Title>
            </Col>
            <Col lg="4">
              <ImageBanner src={image} />
            </Col>
            <Col lg="7">
              <Title fontSize="12pt" textAlign="left">
                Blog
              </Title>
              <Text fontSize="10pt">
                <Row>
                  <Col>
                    <>
                      Blog ekleyebilir, profilinizi güncel ve önde
                      tutabilirsiniz
                    </>
                  </Col>
                  <Col>
                    <div
                      style={{ margin: 15 }}
                      className="d-flex justify-content-end"
                    >
                      <Span
                        color="dark"
                        fontWeight="500"
                        fontSize="0.8rem"
                        mr="7px"
                      >
                        Yeni Yazı Ekle
                      </Span>
                      <PlusButton onClick={() => setPage('create')} />
                    </div>
                  </Col>

                  {!myBlogs?.isLoading ? (
                    <>
                      {myBlogs.data?.blogs?.map((val) => {
                        return (
                          <>
                            <BlogContent>
                              <div className="text-group">
                                <div className="title">{val.title}</div>
                                <div style={{overflow:'hidden'}} className="content">
                                  {val.detail}
                                  <LinkText
                                    onClick={() => {
                                      go(val?.id);
                                    }}
                                  >
                                    Tümünü Gör
                                  </LinkText>
                                </div>
                              </div>
                              <div style={{ backgroundImage: `url(${val.photo})` }} className='img' />
                              <Footer>
                                <div className="footer-title">
                                  Yazar : {user.name}
                                </div>
                                <div className="date">{val.created_at}</div>
                              </Footer>
                              {val.status === 'pending' && (
                                <>
                                  <Button
                                    className="edit"
                                    icon={Svg.EditIcon}
                                    onClick={() => edit(val.id)}
                                  />
                                  <Button
                                    className="deleted"
                                    icon={Svg.CencelIcon}
                                    onClick={() => deleted(val.id)}
                                  />
                                </>
                              )}
                            </BlogContent>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Row>
              </Text>
            </Col>
          </Row>
        </Container>
      )}

      {page === 'create' && (
        <Container>
          <Row>
            <Col lg="12">
              <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
                Blog
              </Title>
            </Col>
            <Col lg="4">
              <ImageBanner src={image} />
            </Col>
            <Col lg="7">
              <Title fontSize="12pt" textAlign="left">
                Blog
              </Title>
              <Text fontSize="10pt">
                <Row>
                  <Col>
                    <>
                      Blog ekleyebilir, profilinizi güncel ve önde
                      tutabilirsiniz
                    </>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Button text="< Geri" onClick={() => setPage('')} />
                    </div>
                  </Col>
                  <FormGroups>
                    <form onSubmit={onSubmit}>
                      <div
                        style={{ marginBottom: 15 }}
                        className="d-flex align-items-end"
                      >
                        {/*<ExtendButton>
                          <Svg.PlusIcon />
                          <div className="w-100 d-flex justify-content-center">
                            Fotoğraf Ekle
                          </div>
                        </ExtendButton>*/}
                        {file ? (
                          <ImageShow image={fileUrl} />
                        ) : (
                          <MaterialButton
                            style={{ marginRight: 15, width: 192, height: 120 }}
                            variant="contained"
                            color="default"
                            component="label"
                            startIcon={<Svg.Pencil />}
                          >
                            Fotoğraf Yükle
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              hidden
                              onChange={(event) => {
                                setFile(event.target.files[0]);
                                setFileUrl(
                                  URL.createObjectURL(event.target.files[0])
                                );
                              }}
                            />
                          </MaterialButton>
                        )}

                        <Material.TextField
                          label="Başlık giriniz"
                          name="title"
                          required
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <Material.TexAreaField
                        label="Detay Giriniz"
                        name="detail"
                        required
                        onChange={(e) => setDetail(e.target.value)}
                        inputProps={{ minLength: 1500 }}
                      />
                      <div
                        style={{ marginTop: 15 }}
                        className="d-flex justify-content-end"
                      >
                        <Button
                          className="blue"
                          text="Ekle"
                          type="submit"
                          isLoading={loading}
                          disabled={loading}
                        />
                      </div>
                    </form>
                  </FormGroups>
                </Row>
              </Text>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

const ImageShow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  position: relative;
  background-size: contain;
  margin-right: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ExtendButton = styled.div`
  width: 190px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid var(--blue3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;
const LinkText = styled.text`
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: var(--blue);
  }
`;
const FormGroups = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;
`;

const Footer = styled.section`
  border-top: 1px solid #707070;
  padding: 5px 0;
`;

const BlogContent = styled.section`
  width: 100%;
  height: auto;
  position: relative;
  padding: 15px;
  padding-right: 75px;
  margin-top: 15px;

  button {
    position: absolute;
    top: 0;
    right: 0;
    span {
      display: none;
    }
  }

  button.deleted {
    top: 30px;
  }

  .text-group {
    padding-right: 170px;
    min-height: 170px;
  }

  .title {
    font-size: 17pt;
    font-weight: bold;
  }

  .content {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 12pt;
    line-height: 125%;
  }

  .img {
    width: 150px;
    height: 125px;
    border-radius: 15px;
    background-size: cover;
    position: absolute;
    top: 30px;
    z-index: 100;
    right: 75px;
  }
`;

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;

const IconGroup = styled.ul`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export default Blog;
