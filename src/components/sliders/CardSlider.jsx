import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled, { css } from 'styled-components/macro';

import UserCard from './UserCard';

const CardSlider = forwardRef(({ data = [] }, ref) => {
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
      setCurrent(data.length);

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
        {data?.map((item, i) => {
          let leftPos;
          let cardType;

          if (current === i + 1) {
            leftPos = 30;
            cardType = 'first';
          } else if (current === i) {
            leftPos = 450;
            cardType = 'second';
          } else if (current + 2 === i + 1) {
            leftPos = 775;
            cardType = 'third';
          } else {
            leftPos = -500;
          }

          return (
            <SliderItem
              cardType={cardType}
              key={item.id}
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
    width: 100%;
    height: 100%;
  }
`;

const SliderItem = styled.div`
  position: absolute;
  left: ${(props) => props.leftPos};
  z-index: -2;
  transform: scale(1);
  transition: all 0.5s;
  box-shadow: 0px 5px 10px -8px rgb(0 0 0 / 40%);
  border-radius: 40px;
  overflow: hidden;
  height: 500px;
  width: 440px;

  ${(p) =>
    p.cardType === 'first' &&
    css`
      z-index: 2;
    `}

  ${(p) =>
    p.cardType === 'second' &&
    css`
      opacity: 0.7;
      transform: scale(0.7);
      z-index: 2;
    `}

  ${(p) =>
    p.cardType === 'third' &&
    css`
      opacity: 0.5;
      transform: scale(0.5);
      z-index: 2;
    `}
`;
