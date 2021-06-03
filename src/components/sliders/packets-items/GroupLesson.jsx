// @ts-nocheck
import React from 'react';

import Title from '../../typography/Titles';
import AwesomeIcon from '../../statics/icon';

const GroupLesson = ({ val }) => {
  return (
    <>
      <div className="slider-item">
        <div className="slider-item-content">
          <div className="front-card">
            <div className="img-item">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${val?.slot?.photo})`,
                }}
              >
                <div className="team">{val?.pt?.classification}</div>
                <ul className="points">
                  <li className={val?.pt?.rating >= 1 ? 'active' : ''}>
                    <AwesomeIcon.StarSolid />
                  </li>
                  <li className={val?.pt?.rating >= 2 ? 'active' : ''}>
                    <AwesomeIcon.StarSolid />
                  </li>
                  <li className={val?.pt?.rating >= 3 ? 'active' : ''}>
                    <AwesomeIcon.StarSolid />
                  </li>
                  <li className={val?.pt?.rating >= 4 ? 'active' : ''}>
                    <AwesomeIcon.StarSolid />
                  </li>
                  <li className={val?.pt?.rating >= 5 ? 'active' : ''}>
                    <AwesomeIcon.StarSolid />
                  </li>
                </ul>
                <div className="clock-times">
                  <span className="icon">
                    <AwesomeIcon.Clock />
                  </span>
                  <span className="text">{val?.slot?.date}</span>
                </div>
              </div>
              <div className="info">
                <Title lineDisable fontWeight="ligher">
                  {val?.slot?.branch?.name}
                </Title>
              </div>
            </div>
            <div className="text-item">
              <Title lineDisable fontWeight="bold">
                {val?.pt?.name}
              </Title>
              <div className="row info">
                <div className="col">
                  <ul>
                    <li style={{ fontSize: '10pt' }}>{val.content} sssss</li>
                    <li style={{ fontSize: '8pt', marginTop: 5 }}>
                      <AwesomeIcon.Map /> {val?.address?.district} /{' '}
                      {val?.address?.city}
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
                    {val?.slot?.max_capacity} Kişilik
                  </span>

                  <span>
                    {val?.slot?.price} <AwesomeIcon.Tl />
                  </span>
                  <br />
                  <span>{val.ctn}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="back-card">Grup Ders Bilgileri</div>
        </div>
      </div>
    </>
  );
};

export default GroupLesson;
