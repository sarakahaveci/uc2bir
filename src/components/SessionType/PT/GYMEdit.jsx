import React, { useEffect, useState } from 'react';
import { Button, AwesomeIcon, Title, IconLabel, BackLink } from 'components';
import { getGymList } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import image from '../../../assets/session-type.jpg';
import { removeGymFromPt } from 'actions';

const GYMEdit = ({ setSubPage }) => {
  const stars = 5;
  const dispatch = useDispatch();

  const { gym } = useSelector(
    (state) => state.profileSettings2.sessionType?.gymList?.data
  );

  const [checked, setChecked] = useState([]);

  const handleChange = (id) => {
    if (!checked.includes(id)) setChecked((prevArr) => [...prevArr, id]);
    else setChecked(checked.filter((item) => item !== id));
  };

  useEffect(() => {
    dispatch(getGymList());
  }, []);

  return (
    <>
      <BackLink text="Geri" onClick={() => setSubPage('Adds')} />

      <div className="d-flex flex-wrap">
        {gym?.map((data) => (
          <>
            <CardGroup key={data.id}>
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
                      {data?.title}
                    </Title>
                    <Title textAlign="left" fontSize="10pt" fontWeight="400">
                      {data?.area_measure} m2 , {data?.capacity} kişi kapasiteli
                    </Title>
                  </div>
                  <div className="footer-and">
                    <div className="and">
                      <IconLabel
                        text="İstanbul Beşiktaş"
                        icon={AwesomeIcon.Map}
                      />
                      <Title textAlign="right" variant="h5" component="h5">
                        {data?.price || 0} <AwesomeIcon.Tl />
                      </Title>
                    </div>
                  </div>
                </div>
              </Card>
              <GreenCheckbox
                checked={checked.includes(data?.id)}
                onChange={() => handleChange(data?.id)}
              />
            </CardGroup>
          </>
        ))}

        <div
          style={{ padding: 30 }}
          className="d-flex btn-group justify-content-end p-30 w-100"
        >
          <div className="ln">
            <Button
              disabled={!checked.length}
              style={{ margin: 5 }}
              className="blue"
              text={`Kaldır ${
                checked.length ? '(' + checked.length + ')' : ''
              }`}
              onClick={() => dispatch(removeGymFromPt(checked))}
            />
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

const GreenCheckbox = withStyles({
  root: {
    color: '#00b3a8',
    width: 50,
    '&$checked': {
      color: '#00b3a8',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default GYMEdit;
