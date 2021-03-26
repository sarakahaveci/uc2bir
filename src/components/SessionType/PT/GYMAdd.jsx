import React from 'react';
import {
  Button,
  AwesomeIcon,
  Svg,
  Pagination,
  GoogleAppZoom,
  Title,
  IconLabel,
} from 'components';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import styled from 'styled-components/macro';

import image from '../../../assets/session-type.jpg';

const GYMAdd = ({ setSubPage, setBannerActive }) => {
  const stars = 4;
  return (
    <div>
      <Button
        text="< Geri"
        onClick={() => {
          setBannerActive(true);
          setSubPage('Adds');
        }}
      />
      <Row className="search-trainer">
        <Col className="search-trainer__search-area-wrapper" lg={9}>
          <Row className="search-trainer__search-area">
            <SearchCol>
              <input
                className="search-trainer__search-input"
                placeholder="Eğitmen adı..."
              />
            </SearchCol>

            <SearchCol>
              <div className="search-trainer__location-row">
                <Svg.LocationIcon className="mr-1 mb-1" />

                <input
                  className="search-trainer__search-input"
                  placeholder="Lokasyon..."
                />
              </div>
            </SearchCol>

            <SearchCol>
              <Form.Control as="select" className="search-trainer__select">
                <option hidden>Branşlar</option>
              </Form.Control>
            </SearchCol>

            <SearchCol className="pr-0">
              <Button
                justifyContent="space-around"
                display="flex"
                className="blue"
                alignItems="center"
                text="Ara"
                search
                width="100%"
                maxWidth="150px"
              />
            </SearchCol>
          </Row>
        </Col>

        <Col lg={3}>
          <Row className="search-trainer__sort-row">
            <Col lg={6} sm={12}>
              <FormGroup>
                <Form.Control
                  as="select"
                  style={{
                    height: 53,
                    boxShadow: '0px 0px 7px -2px rgba(0,0,0,0.5)',
                    position: 'relative',
                    top: '5px',
                  }}
                  className="search-trainer__select search-trainer__select--bg"
                >
                  <option hidden>Filtreler</option>
                </Form.Control>
              </FormGroup>
            </Col>
            <Col lg={6} sm={12}>
              <FormGroup>
                <Form.Control
                  as="select"
                  style={{
                    height: 53,
                    boxShadow: '0px 0px 7px -2px rgba(0,0,0,0.5)',
                    position: 'relative',
                    top: '5px',
                  }}
                  className="search-trainer__select search-trainer__select--bg"
                >
                  <option hidden>Sırala</option>
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ margin: '15px 0' }} className="goolge-app">
        <GoogleAppZoom frame={{ width: '100%', height: '450px' }} />
      </div>
      <div
        className="d-flex flex-wrap"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Card>
          <Stars>
            <Star className={`${stars > 0 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${stars > 1 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${stars > 2 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${stars > 3 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${stars > 4 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
          </Stars>
          <div style={{ backgroundImage: `url(${image})` }} className="img">
            <div className="adss">Salonu Ekle</div>
          </div>
          <div className="title">
            <Title textAlign="left" fontSize="14pt">
              CrossFit
            </Title>
            <Title textAlign="left" fontSize="10pt">
              180 m , 100 kişi kapasiteli
            </Title>
          </div>
          <div className="footer-and">
            <div className="and">
              <IconLabel text="İstanbul Beşiktaş" icon={AwesomeIcon.Map} />
              <Title textAlign="right" variant="h5" component="h5">
                15 <AwesomeIcon.Tl />
              </Title>
            </div>
          </div>
        </Card>
      </div>
      <Pagination page={1} onChange={1} count={10} />
    </div>
  );
};

export default GYMAdd;

const Card = styled(Col)`
  max-width: 295px;
  height: 378px;
  box-shadow: 0px 0px 7px -2px rgba(0, 0, 0, 0.75);
  border-radius: 40px;
  padding: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .img {
    width: 100%;
    height: 220px;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;

    .adss {
      width: 75%;
      height: auto;
      padding: 15px;
      background: rgba(255, 255, 255, 0.8);
      z-index: 1000;
      bottom: 15px;
      right: 15px;
      border-radius: 30px;
      position: absolute;
      display: none;
    }
  }

  &:hover {
    .img {
      .adss {
        display: block;
      }
    }
  }

  .title {
    width: 100%;
    padding: 15px;

    p {
      padding: 0;
    }
  }

  .footer-and {
    width: 100%;
    min-height: 30px;

    .and {
      border-top: 1px solid #ddd;
      width: 100%;
      min-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
    }
  }
`;

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 20%;
`;

const Stars = styled.ul`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 5px 15px;
  z-index: 1000;
  opacity: 0.7;
  border-top-right-radius: 30x;
`;

const Star = styled.li`
  margin: 2px;
  cursor: pointer;

  svg {
    color: #ccc;
    font-size: 9pt;

    @media (max-width: 1200px) {
      font-size: 5pt;
    }
  }

  &.active {
    svg {
      color: #ffba00;
    }
  }
`;
