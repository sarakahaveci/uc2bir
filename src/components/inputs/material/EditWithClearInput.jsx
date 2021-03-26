import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { layout } from 'styled-system';

import { Material } from './';
import { Svg, Box } from 'components';

const EditWithClearInput = ({
  value,
  onClear,
  showEditButtons,
  onEditComplete,
  showTickIcon,
  ...rest
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [inputValue, setInputValue] = useState(value);

  const valueCopy = useRef(value);

  return (
    <InputWrapper {...rest}>
      {showTickIcon && (
        <TickIcon
          onClick={() => {
            setReadOnly(true);

            if (valueCopy.current !== inputValue) {
              onEditComplete(inputValue);

              valueCopy.current = inputValue;
            }
          }}
        />
      )}

      <Material.TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        defaultValue={value}
        inputProps={{
          readOnly,
        }}
        onBlur={() => {
          setReadOnly(true);

          if (valueCopy.current !== inputValue) {
            onEditComplete(inputValue);

            valueCopy.current = inputValue;
          }
        }}
      />
      {showEditButtons && (
        <>
          {readOnly && <EditIcon onClick={() => setReadOnly(false)} />}
          <InputClearIcon onClick={onClear} />
        </>
      )}
    </InputWrapper>
  );
};

export default EditWithClearInput;

EditWithClearInput.defaultProps = {
  onEditComplete: () => {},
  data: {},
  onClear: () => {},
};

const InputWrapper = styled(Box)`
  position: relative;
  display: flex;
  margin-bottom: 10px;

  ${layout}

  input {
    padding-right: 60px !important;
    padding-left: 25px !important;
  }
`;

const icon = css`
  z-index: 5;
  position: absolute;
  right: 0;
  bottom: 15px;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const TickIcon = styled(Svg.TickIcon)`
  svg {
    ${icon}
    left: 0;
    bottom: 13px;
    fill: ${(p) => p.theme.colors.blue};
  }
`;

const InputClearIcon = styled(Svg.InputClearIcon)`
  svg {
    ${icon}
  }
`;

const EditIcon = styled(Svg.EditIcon)`
  svg {
    ${icon}
    right: 30px;
  }
`;
