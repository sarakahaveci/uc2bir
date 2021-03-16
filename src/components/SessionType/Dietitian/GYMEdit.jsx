import React, { useEffect } from 'react';
import {
  Material,
  Button,
  AwesomeIcon,
  Svg,
  Pagination,
  GoogleAppZoom,
  Box,
  Title,
  IconLabel,
} from 'components';
import { getCitiesAndDistict, addAddress, getAddressList } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import styled from 'styled-components/macro';

import image from '../../../assets/session-type.jpg';

const GYMEdit = ({ setSubPage }) => {
  const stars = 5;
  const dispatch = useDispatch();

  const { getAddress } = useSelector(
    (state) => state.profileSettings2.sessionType
  );

  useEffect(() => {
    dispatch(
      getAddressList(
        () => {},
        () => {}
      )
    );
  }, []);

  return (
    <>
      <Button text="< Geri" onClick={() => setSubPage('Adds')} />
      <div className="d-flex flex-wrap">
        <CardGroup>
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
            <div className="left-group">
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="img"
              ></div>
            </div>
            <div className="right-group">
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
            </div>
          </Card>
        </CardGroup>
        <div style={{padding: 30}} className="d-flex btn-group justify-content-end p-30 w-100">
          <div className="ln">
            <Button style={{margin: 5}} className="gray" text="Kaldır" />
            <Button style={{margin: 5}} className="blue" text="Kaydet" />
          </div>
        </div>
      </div>
    </>
  );
};

const CardGroup = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding-right: 95px;
  position: relative;
  justify-content: center;
  align-items: center;

  &:before {
    position: absolute;
    z-index: 1000;
    content: '';
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    right: 30px;
    border: 2px solid var(--blue);
  }

  &:after {
    position: absolute;
    z-index: 1000;
    content: '';
    background: var(--blue);
    width: 20px;
    height: 20px;
    border-radius: 100%;
    right: 40px;
  }
`;

const Card = styled(Col)`
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 7px -2px rgb(0 0 0 / 75%);
  border-radius: 40px;
  padding: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .left-group {
    width: 50%;
    padding: 15px 0;
  }

  .img {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 30px;

    .adss {
      width: 100%;
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

const Stars = styled.ul`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 5px 15px;
  z-index: 1000;
  opacity: 0.7;
  border-top-right-radius: 30x;
  background: rgba(255, 255, 255, 0.7);
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

const List = styled.ul`
  width: 100%;
  height: auto;
`;

const Item = styled.li`
  border-radius: 15px;
  box-shadow: 4px 6px 15px -5px rgba(0, 0, 0, 0.35);
  padding: 30px;
  margin-bottom: 15px;
  margin-left: -15px;
  position: relative;

  button {
    position: absolute;
    right: -60px;
    top: 0;

    span {
      display: none;
    }
  }

  button.cencel {
    top: 50px;
  }

  button.edit {
    top: 0px;
  }

  .line-left {
    border-left: 4px solid #9d9d9d;
    padding-left: 10px;
  }
`;

export default GYMEdit;
