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
  ConfirmContainer,
} from './Common.styles.jsx';
import { WORK_PLACE, DIETITIAN, PERSONAL_TRAINER, USER } from '../../constants';

const fileIdMap = {
  [USER]: 18,
  [PERSONAL_TRAINER]: 12,
  [WORK_PLACE]: 15,
  [DIETITIAN]: 9,
};

const Information = ({
  setOpenModal,
  acceptHealthAgreement,
  setAcceptHealthAgreement,
  confirmationData,
  userTypeId,
}) => {
  const { t } = useTranslation();

  const [acceptFirst, setAcceptFirst] = useState(false);

  useEffect(() => {
    if (acceptHealthAgreement) {
      setAcceptFirst(true);
    }
  }, []);

  const kvkkData = confirmationData.find(
    (item) => item.id === fileIdMap[userTypeId]
  );

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

      {userTypeId ? (
        <>
          {' '}
          <ConfirmationTitle
            dangerouslySetInnerHTML={{ __html: kvkkData?.title }}
          />
          <InfoField>
            <TextAreaWrapper>
              <TextArea>{ReactHtmlParser(decode(kvkkData?.detail))}</TextArea>
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
              margin="0 0 0 10px"
            >
              {t('I have read and approve the Illumination Statement')}
            </Text>
          </ConfirmContainer>
        </>
      ) : (
        <Text color="dark" fontWeight="500" my="20px" lineHeight="20px">
          {t(
            'In order to see the member agreements, you need to choose one of the membership types'
          )}
        </Text>
      )}

      <Box center margin="20px 0">
        <Button
          className="blue"
          text={t('I Approve')}
          width="300px"
          disabled={!acceptFirst}
          fontWeight="500"
          onClick={() => {
            setAcceptHealthAgreement(true);
            setOpenModal(false);
          }}
        />
      </Box>
    </Container>
  );
};

export default Information;
