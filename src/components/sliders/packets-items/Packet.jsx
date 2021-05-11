import React from 'react';

import Title from '../../typography/Titles';
import AwesomeIcon from '../../statics/icon';

const Packet = ({ val }) => {
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
              <div className="team">{val.class}</div>
            </div>
            <div className="info d-flex">
              <Title lineDisable fontWeight="bold">
                {val?.authorType}
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
                  <li>{val.content}</li>
                </ul>
              </div>
              <div className="col-auto">
                <span>
                  {val.price} <AwesomeIcon.Tl /> / {val.package_included} Ders
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packet;
