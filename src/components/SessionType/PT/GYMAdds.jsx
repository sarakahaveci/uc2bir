// @ts-nocheck
import React, { useEffect } from 'react';
import { AwesomeIcon, Title, IconLabel } from 'components';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addGym, getGymList } from 'actions';

import defaultImg from 'assets/default-profile.jpg';

const GYMAdds = ({ setSubPage }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { gymList } = useSelector(
    (state) => state.profileSettings2.sessionType
  );

  useEffect(() => {
    dispatch(getGymList());
  }, []);

  const gymAddHandler = (id) => {
    dispatch(
      addGym(
        { gym: [id] },
        () => {
          setSubPage('page');
          toast.success(t('Gym successfully added'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },
        () => {
          toast.error(t('There is a problem'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  return (
    <>
      <Row style={{ marginTop: 30, marginBottom: 30 }}>
        {gymList?.data?.gym?.map((val, key) => {
          return (
            <Card key={key} onClick={() => gymAddHandler(val.id)}>
              <Stars>
                <Star className={`${val.rating > 0 ? 'active' : ''}`}>
                  <AwesomeIcon.StarSolid />
                </Star>
                <Star className={`${val.rating > 1 ? 'active' : ''}`}>
                  <AwesomeIcon.StarSolid />
                </Star>
                <Star className={`${val.rating > 2 ? 'active' : ''}`}>
                  <AwesomeIcon.StarSolid />
                </Star>
                <Star className={`${val.rating > 3 ? 'active' : ''}`}>
                  <AwesomeIcon.StarSolid />
                </Star>
                <Star className={`${val.rating > 4 ? 'active' : ''}`}>
                  <AwesomeIcon.StarSolid />
                </Star>
              </Stars>
              <div
                style={{ backgroundImage: `url(${val.photo || defaultImg})` }}
                className="img"
              >
                <div className="adss">{t('+ Add Gym')}</div>
              </div>
              <div className="title">
                <Title textAlign="left" fontSize="14pt">
                  {val.title}
                </Title>
                <Title textAlign="left" fontSize="10pt">
                  {val.capacity} {t('Capacity')}
                </Title>
              </div>
              <div className="footer-and">
                <div className="and">
                  <IconLabel text={val.city} icon={AwesomeIcon.Map} />
                  <Title textAlign="right" variant="h5" component="h5">
                    {val.price} {val.price && <AwesomeIcon.Tl />}
                  </Title>
                </div>
              </div>
            </Card>
          );
        })}
      </Row>
    </>
  );
};

export default GYMAdds;

const Card = styled(Col)`
  max-width: 295px;
  height: 378px;
  box-shadow: 0px 0px 7px -2px rgba(0, 0, 0, 0.75);
  border-radius: 40px;
  padding: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin: 15px;

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
