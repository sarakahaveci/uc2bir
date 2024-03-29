import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Svg, Title, Text, svgBackground, Button } from 'components';
import { logout } from 'actions';

const CancellationFinalize = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <>
      <Wrapper>
        <RedBackground mb="25px">
          <Svg.SadFaceIcon />
        </RedBackground>

        <Title component="h5">{t('hello')}..</Title>

        <Text
          textAlign="center"
          color="dark"
          fontWeight="500"
          lineHeight="25px"
        >
          {t(
            'We will inform you once your membership cancellation request has been reviewed by us'
          )}
        </Text>
      </Wrapper>

      <Footer>
        <Button
          onClick={() => dispatch(logout())}
          text={t('logout')}
          fontWeight="500"
        />
      </Footer>
    </>
  );
};

export default CancellationFinalize;

const Wrapper = styled.div`
  padding: 30px 90px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 5px 0;
  display: flex;
  justify-content: center;
`;

const RedBackground = styled.div`
  ${svgBackground};
  background-color: ${(p) => p.theme.colors.red};
  margin-bottom: 25px;
`;
