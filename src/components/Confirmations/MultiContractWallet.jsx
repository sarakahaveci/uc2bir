import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { useTranslation } from 'react-i18next';

import { Button, Title, Box, Svg } from 'components';
import {
  Container,
  InfoField,
  TextArea,
  TextAreaWrapper,
  ConfirmationTitle,
} from './Common.styles.jsx';
import styled from 'styled-components/macro';

const MultiContract = ({ setOpenModal, confirmationData, setAccept }) => {
  const { t } = useTranslation();

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
          </>
        )}
      </ContractsContainer>

      <Box center margin="20px 0">
        <Button
          className="blue"
          text={t('I Approve')}
          width="300px"
          fontWeight="500"
          onClick={() => {
            setOpenModal(false);
            setAccept(true);
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
