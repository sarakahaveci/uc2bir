import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Box, Text } from 'components';

export default function ProfileCancellation() {
  return (
    <Box col mx="10px">
      <StyledLink to="/myprofile/settings/cancel">Üyelik İptali</StyledLink>

      <Text color="gray4" fontWeight="300" fontSize="0.8rem">
        Üyelik iptali durumunda kişiler size ulaşamayacaklardır.
      </Text>
    </Box>
  );
}

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(p) => p.theme.colors.black2};
  font-size: 0.9rem;
  opacity: 0.8;
  cursor: pointer;
`;
