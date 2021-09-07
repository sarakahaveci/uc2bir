import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Box, Text } from 'components';

export default function ProfileCancellation() {
  const { t } = useTranslation();
  return (
    <Box col mx="10px">
      <StyledLink to="/myprofile/settings/cancel">
        {' '}
        {t('Membership Cancellation')}
      </StyledLink>

      <Text color="gray4" fontWeight="300" fontSize="0.8rem">
        {t(
          'In case of membership cancellation, people will not be able to reach you'
        )}
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
