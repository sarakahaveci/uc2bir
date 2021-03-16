import React, { useState } from 'react';

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
} from 'components';
import styled from 'styled-components/macro';

const Blog = () => {
  const [page, setPage] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  switch (page) {
    case 'create':
      return (
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
                      <form onSubmit={onSubmit}>
                        <div className="d-flex align-items-end">
                          <ExtendButton>
                            <Svg.PlusIcon />
                            <div className="w-100 d-flex justify-content-center">
                              Fotoğraf Ekle
                            </div>
                          </ExtendButton>
                          <Material.TextField
                            label="Başlık giriniz"
                            name="title"
                            required
                          />
                        </div>
                        <Material.TexAreaField
                          label="Detay Giriniz"
                          name="detail"
                          required
                        />
                        <div
                          style={{ marginTop: 15 }}
                          className="d-flex justify-content-end"
                        >
                          <Button className="blue" text="Ekle" type="submit" />
                        </div>
                      </form>
                    </FormGroups>
                  </Row>
                </Text>
              </Col>
            </Row>
          </Container>
        </>
      );

    default:
      return (
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
                      <PlusButton onClick={() => setPage('create')}>
                        +
                      </PlusButton>
                    </div>
                  </Col>

                  {/*
                      <BlogContent>
                    <div className="text-group">
                      <div className="title">Sporcu Beslenmesi Nedir?</div>
                      <div className="content">
                        Sporcu uygun antrenmanlar eşliğinde, uygun yaşam tarzı
                        ile sağlıklı beslendiğinde performansı olumlu şekilde
                        artar.Kişinin beslenme düzenini etkileyen faktörler
                        arasında kişinin fiziksel aktivite durumu da önem taşır.
                        Aktif spor hayatı olan kişiler de….. yapılan sporun
                        çeşidi, yapılma süresi ve sıklığı da beslenme düzenini
                        ve besin gereksinmelerini etkiler. Sporcunun aldığı
                        sıvıların ve makro besinlerin türüne, miktarına ve
                        zamanına önem vermektedir. Ek olarak vitamin...
                      </div>
                    </div>
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className="img"
                    ></div>
                    <Footer>
                      <div className="footer-title">Yazar : Efe Parlak</div>
                      <div className="date">05.07.2020</div>
                    </Footer>
                    <Button
                      className="edit"
                      icon={Svg.EditIcon}
                      onClick={() => console.log('editAddress')}
                    />
                    <Button
                      className="deleted"
                      icon={Svg.CencelIcon}
                      onClick={() => console.log('deleteAddress')}
                    />
                  </BlogContent>
                    */}
                </Row>
              </Text>
            </Col>
          </Row>
        </Container>
      );
  }
};

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
