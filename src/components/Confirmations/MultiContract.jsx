import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { useTranslation } from 'react-i18next';

import { Button, Title, Material, Box, Text, Svg } from 'components';
import {
  Container,
  InfoField,
  TextArea,
  TextAreaWrapper,
  ConfirmationTitle,
} from './Common.styles.jsx';
import { ConfirmContainer } from './Common.styles.jsx';
import styled from 'styled-components/macro';

const MultiContract = ({
  setOpenModal,
  setAccept,
  acceptKvkk,
  confirmationData,
}) => {
  const { t } = useTranslation();

  const [acceptFirst, setAcceptFirst] = useState(false);

  useEffect(() => {
    if (acceptKvkk) {
      setAcceptFirst(true);
    }
  }, []);

  return (
    <Container>
      <Svg.CloseIcon
        className="close-icon"
        onClick={() => setOpenModal(false)}
      />

      <Title
        variant="h5"
        color="softDark"
        fontWeight="600"
        letterSpacing={false}
        textAlign="left"
      >
        {t('Contracts and Forms')}
      </Title>
      <ContractsContainer>
        {confirmationData['uye-on-bilgilendirme-formu'] && (
          <>
            <ConfirmationTitle
              dangerouslySetInnerHTML={{
                __html: confirmationData['uye-on-bilgilendirme-formu']?.title,
              }}
            />
            <InfoField>
              <TextAreaWrapper>
                <TextArea>
                  {ReactHtmlParser(
                    decode(
                      confirmationData['uye-on-bilgilendirme-formu']?.detail
                    )
                  )}
                </TextArea>
              </TextAreaWrapper>
            </InfoField>
          </>
        )}
        {confirmationData['uye-mesafeli-hizmet-sozlesmesi'] && (
          <>
            <ConfirmationTitle
              dangerouslySetInnerHTML={{
                __html:
                  confirmationData['uye-mesafeli-hizmet-sozlesmesi']?.title,
              }}
            />
            <InfoField>
              <TextAreaWrapper>
                <TextArea>
                  {ReactHtmlParser(
                    decode(
                      confirmationData['uye-mesafeli-hizmet-sozlesmesi']?.detail
                    )
                  )}
                </TextArea>
              </TextAreaWrapper>
            </InfoField>
            <ConfirmContainer>
              <Material.checkbox
                checked={acceptFirst}
                onChange={() => setAcceptFirst(!acceptFirst)}
              />
              <Text
                color="gray1"
                fontSize="0.9rem"
                fontWeight="500"
                textAlign="left"
                margin="0 0 0 40px"
              >
                {t(
                  'I have read and approve the Preliminary Information Conditions and the Distance Sales Agreement'
                )}
              </Text>
            </ConfirmContainer>
          </>
        )}
      </ContractsContainer>

      <Box center margin="20px 0">
        <Button
          className="blue"
          text="Onaylıyorum"
          width="300px"
          disabled={!acceptFirst}
          fontWeight="500"
          onClick={() => {
            setAccept(true);
            setOpenModal(false);
          }}
        />
      </Box>
    </Container>
  );
};

const ContractsContainer = styled.div`
  height: 40vh;
  overflow: scroll;
  margin-top: 10vh;
`;
export default MultiContract;
