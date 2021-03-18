import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { searchMessage, resetProductSearch } from 'actions';
import { useDebounce } from 'utils';
import { Box, Svg } from 'components';
import DefaultProfileImg from 'assets/default-profile.jpg';

const MessageSearch = () => {
  const { profile_image } = useSelector((state) => state.auth.user);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(searchMessage(debouncedSearchValue));
    } else {
      dispatch(resetProductSearch());
    }
  }, [debouncedSearchValue]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Avatar src={profile_image.path || DefaultProfileImg} />

        <Box row alignItems="center" position="relative">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ne arıyorsun?"
          />
          <SearchIcon />
        </Box>
      </InnerWrapper>
    </Wrapper>
  );
};

export default MessageSearch;

const Wrapper = styled.div`
  border-bottom: 0.5px solid ${(p) => p.theme.colors.gray7};
  padding: 10px 0px 10px 15px;
`;

const InnerWrapper = styled.div`
  display: flex;
  border-right: 0.5px solid #afafaf;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  border-radius: 20px;
  background: white;
  border: 1px solid #9b9b9b;
  margin: 0 27px 0 10px;
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
  fill: #9b9b9b;
  position: absolute;
  left: 28px;
  top: 16px;
`;
