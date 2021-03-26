import React from 'react';
import styled from 'styled-components/macro';
import { Slider } from '@material-ui/core';

const MaterialSlider = (props) => {
  return <StyledSlider {...props} />;
};

export default MaterialSlider;

const StyledSlider = styled(Slider)`
  margin-top: 20px;

  .PrivateValueLabel-thumb-3.PrivateValueLabel-open-4
    .PrivateValueLabel-offset-5 {
    transform: scale(1) translateY(6px);
  }

  .PrivateValueLabel-circle-6 {
    background: transparent;
  }

  .PrivateValueLabel-label-7 {
    color: ${(p) => p.theme.colors.dark};
    font-size: 0.9rem;
  }

  .MuiSlider {
    &-valueLabel {
      display: block;
      width: 50px;
    }

    &-rail {
      background-color: #e6e7e7;
      height: 6px;
    }

    &-track {
      height: 6px;
      background-color: ${(p) => p.theme.colors.blue};
    }

    &-thumb {
      bottom: 2px;
      width: 20px;
      height: 20px;
      border: 3px solid ${(p) => p.theme.colors.blue};
      background-color: white;
    }
  }
`;
