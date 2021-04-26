import React from 'react';
import { AwesomeIcon, Title } from 'components';
import { Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

const TrainerCard = ({ name, stars = 0, category, price }) => {
  return (
    <>
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
        <div className="_group">
          <IMG src="/static/media/session-type.50fd045c.jpg"></IMG>
        </div>
        <div className="_group">
          <div className="title">
            <Title textAlign="left" fontSize="16pt">
              {name}
            </Title>
            <Title textAlign="left" fontSize="14pt" fontWeight="400">
              {category}
            </Title>
          </div>
          <div className="footer-and">
            <div className="and">
              <Title textAlign="right" variant="h5" component="h5">
                {price || 0} <AwesomeIcon.Tl />
              </Title>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

const Card = styled(Col)`
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 7px -2px rgb(0 0 0 / 75%);
  padding: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  ._group {
    width: 50%;
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
const IMG = styled.img`
  width: 100%;
  height: 200px;

  object-fit: cover;
`;

export default TrainerCard;
