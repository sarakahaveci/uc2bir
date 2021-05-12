import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { searchMessage, resetProductSearch } from 'actions';
import { useDebounce } from 'utils';
import { SearchInput, Box } from 'components';
import DefaultProfileImg from 'assets/default-profile.jpg';

const MessageSearch = () => {
  const photo = useSelector((state) => state.auth.user.photo);

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
        <Avatar src={photo || DefaultProfileImg} />

        <Box row m="0 27px 0 10px" alignItems="center">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ne arıyorsun?"
          />
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
  object-fit: contain;
`;
