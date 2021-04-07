import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components/macro';

import UserCard from './UserCard';

const CardSlider = forwardRef(({ data }, ref) => {
  const [current, setCurrent] = useState(1);

  const next = () => {
    if (current === data.length) {
      setCurrent(1);
      return;
    }

    setCurrent((curr) => curr + 1);
  };

  const previous = () => {
    if (current === 1) {
      setCurrent(data.length > 3 ? data.length - 3 : data.length);

      return;
    }

    setCurrent((curr) => curr - 1);
  };

  useImperativeHandle(ref, () => {
    return {
      previous: () => previous(),
      next: () => next(),
    };
  });

  return (
    <div>
      <SliderWrapper>
        {data.map((item, i) => {
          let leftPos;

          if (current === i + 1) {
            leftPos = 0;
          } else if (current === i) {
            leftPos = 450;
          } else if (current + 2 === i + 1) {
            leftPos = 775;
          } else {
            leftPos = -500;
          }

          return (
            <SliderItem
              key={item.id}
              className={`${current === i + 1 ? 'first-card' : ''} ${
                current === i ? 'second-card' : ''
              } ${current + 2 === i + 1 ? 'third-card' : ''} `}
              leftPos={`${leftPos}px`}
            >
              <UserCard data={item} top />
            </SliderItem>
          );
        })}
      </SliderWrapper>
    </div>
  );
});

export default CardSlider;

const SliderWrapper = styled.div`
  height: 600px;
  display: flex;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;

  &:after {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 1;
    content: '';
  }

  .img {
    height: 500px;
    border-radius: 40px;
    overflow: hidden;
    width: 440px;
    height: 565px;
  }
`;

const SliderItem = styled.div`
  position: absolute;
  left: ${(props) => props.leftPos};
  z-index: -2;
  transform: scale(1);
  transition: all 0.5s;

  &.first-card {
    z-index: 2;
  }

  &.second-card {
    opacity: 0.7;
    transform: scale(0.7);
    z-index: 2;
  }

  &.third-card {
    opacity: 0.5;
    transform: scale(0.5);
    z-index: 2;
  }
`;
