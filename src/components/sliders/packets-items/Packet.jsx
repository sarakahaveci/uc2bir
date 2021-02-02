// @ts-nocheck
import React from 'react';

import Title from '../../typography/title';
import AwesomeIcon from '../../../statics/icon';

const Packet = ({ val }) => {
  return (
    <>
      <div className="slider-item">
        <div className="slider-item-content">
          <div className="img-item">
            <div
              className="img"
              style={{
                backgroundImage: `url(${val.node.frontmatter.image.childImageSharp.fluid.src})`,
              }}
            >
              <div className="team">A</div>
            </div>
            <div className="info">
              <Title lineDisable fontWeight="ligher">
                {val.node.frontmatter.title}
              </Title>
            </div>
          </div>
          <div className="text-item">
            <Title lineDisable fontWeight="bold">
              {val.node.frontmatter.name}
            </Title>
            <div className="row info">
              <div className="col">
                <ul>
                  <li>{val.node.frontmatter.content}</li>
                </ul>
              </div>
              <div className="col-auto">
                <span>
                  {val.node.frontmatter.price} <AwesomeIcon.Tl /> /{' '}
                  {val.node.frontmatter.package_included} Gün
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
