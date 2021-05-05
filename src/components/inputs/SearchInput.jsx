import React from 'react';
import styled from 'styled-components/macro';

import { Svg } from 'components';
import { space } from 'styled-system';

export default function SearchInput({
  searchValue,
  setSearchValue,
  placeholder,
  showClearInput,
  onChange,
  ...restProps
}) {
  return (
    <InputGroup {...restProps}>
      <SearchIcon />

      <StyledSearchInput
        value={searchValue}
        onChange={onChange}
        placeholder={placeholder}
      />

      {showClearInput && (
        <Svg.CloseIcon
          onClick={() => setSearchValue('')}
          className="clear-icon"
        />
      )}
    </InputGroup>
  );
}

const InputGroup = styled.div`
  position: relative;
  ${space}

  .clear-icon {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 19px;
    top: 8px;
  }
`;

const StyledSearchInput = styled.input`
  flex: 1;
  height: 40px;
  width: 100%;
  border-radius: 20px;
  background: white;
  border: 1px solid ${(p) => p.theme.colors.gray10};
  padding: 0 10px 0 45px;
  font-size: 0.9rem;
  color: ${(p) => p.theme.colors.dark};

  &::placeholder {
    font-size: 0.9rem;
    color: rgb(0, 0, 0, 0.2);
    padding-left: 5px;
  }
`;

const SearchIcon = styled(Svg.Search)`
  fill: ${(p) => p.theme.colors.gray10};
  position: absolute;
  left: 19px;
  top: 11px;
`;
