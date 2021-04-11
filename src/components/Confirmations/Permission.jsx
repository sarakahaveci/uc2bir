import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';

import { Button, Title, Material, Box, Text, Svg } from 'components';
import {
  Container,
  InfoField,
  TextArea,
  TextAreaWrapper,
  ConfirmationTitle,
} from './Common.styles.jsx';
import { WORK_PLACE, DIETITIAN, PERSONAL_TRAINER, USER } from '../../constants';
import { ConfirmContainer } from './Common.styles.jsx';

const fileIdMap = {
  [USER]: 17,
  [PERSONAL_TRAINER]: 11,
  [WORK_PLACE]: 17,
  [DIETITIAN]: 8,
};

const Permission = ({
  setOpenModal,
  acceptPermissions,
  setAcceptPermissions,
  confirmationData,
  userTypeId,
}) => {
  const [acceptFirst, setAcceptFirst] = useState(false);

  const permissionData = confirmationData.find(
    (item) => item.id === fileIdMap[userTypeId]
  );

  useEffect(() => {
    if (acceptPermissions) {
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
        Sözleşmeler ve Formlar
      </Title>

      {userTypeId ? (
        <>
          {' '}
          <ConfirmationTitle
            dangerouslySetInnerHTML={{ __html: permissionData?.title }}
          />
          <InfoField>
            <TextAreaWrapper>
              <TextArea>
                {ReactHtmlParser(decode(permissionData?.detail))}
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
              margin="0 0 0 10px"
            >
              Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesi’ni
              okudum.
            </Text>{' '}
          </ConfirmContainer>
        </>
      ) : (
        <Text color="dark" fontWeight="500" my="20px" lineHeight="20px">
          Üye sözleşmelerini görebilmeniz için üyelik tipinden birini seçmeniz
          gerekmektedir.
        </Text>
      )}

      <Box center margin="20px 0">
        <Button
          className="blue"
          text="Onaylıyorum"
          width="300px"
          disabled={!acceptFirst}
          fontWeight="500"
          onClick={() => {
            setAcceptPermissions(true);
            setOpenModal(false);
          }}
        />
      </Box>
    </Container>
  );
};

export default Permission;
