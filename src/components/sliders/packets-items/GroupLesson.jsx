// @ts-nocheck
import React from 'react';

import Title from '../../typography/Titles';
import AwesomeIcon from '../../statics/icon';

const GroupLesson = ({ val }) => {
  return (
    <>
      <div className="slider-item">
        <div className="slider-item-content">
          <div className="img-item">
            <div
              className="img"
              style={{
                backgroundImage: `url(${val.image?.default})`,
              }}
            >
              <div className="team">A</div>
              <ul className="points">
                <li className="active">
                  <AwesomeIcon.StarSolid />
                </li>
                <li className="active">
                  <AwesomeIcon.StarSolid />
                </li>
                <li className="active">
                  <AwesomeIcon.StarSolid />
                </li>
                <li className="active">
                  <AwesomeIcon.StarSolid />
                </li>
                <li className="active">
                  <AwesomeIcon.StarSolid />
                </li>
              </ul>
              <div className="clock-times">
                <span className="icon">
                  <AwesomeIcon.Clock />
                </span>
                <span className="text">{val.date}</span>
              </div>
            </div>
            <div className="info">
              <Title lineDisable fontWeight="ligher">
                {val.category}
              </Title>
            </div>
          </div>
          <div className="text-item">
            <Title lineDisable fontWeight="bold">
              {val.name}
            </Title>
            <div className="row info">
              <div className="col">
                <ul>
                  <li style={{ fontSize: '10pt' }}>{val.content}</li>
                  <li style={{ fontSize: '8pt', marginTop: 5 }}>
                    <AwesomeIcon.Map /> {val.location}
                  </li>
                </ul>
              </div>
              <div style={{ position: 'relative' }} className="col-auto">
                <span
                  style={{
                    fontSize: '9pt',
                    fontWeight: 'normal',
                    color: '#00b2a9',
                    position: 'absolute',
                    top: '-47px',
                    left: 'inherit',
                    right: '0',
                  }}
                >
                  {val.seater} Kişilik
                </span>

                <span>
                  {val.price} <AwesomeIcon.Tl />
                </span>
                <br />
                <span>{val.ctn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupLesson;
