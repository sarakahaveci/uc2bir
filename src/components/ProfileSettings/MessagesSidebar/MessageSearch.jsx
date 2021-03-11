import React from 'react';
import styled from 'styled-components/macro';

import { Box, Material } from 'components';

const MessageSearch = () => {
  return (
    <Box p="10px 15px">
      <InnerWrapper>
        <ProfilePicture />

        <Material.TextField />
      </InnerWrapper>
    </Box>
  );
};

export default MessageSearch;

const InnerWrapper = styled.div`
  border-right: 0.5px solid #afafaf;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 9px;
`;
