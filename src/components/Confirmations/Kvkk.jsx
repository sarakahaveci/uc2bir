import React, { useState, useEffect } from 'react';

import { Button, Title, Material, Row, Text, Svg } from 'components';
import {
  Container,
  InfoField,
  TextArea,
  TextAreaWrapper,
  ConfirmationTitle,
} from './Common.styles.jsx';

const Kvkk = ({ setOpenModal, acceptKvkk, setAcceptKvkk, kvkkData }) => {
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
        Sözleşmeler ve Formlar
      </Title>

      <ConfirmationTitle
        dangerouslySetInnerHTML={{ __html: kvkkData?.title }}
      />

      <InfoField>
        <Material.checkbox
          checked={acceptFirst}
          onChange={() => setAcceptFirst(!acceptFirst)}
        />

        <TextAreaWrapper>
          <TextArea dangerouslySetInnerHTML={{ __html: kvkkData?.detail }} />
        </TextAreaWrapper>
      </InfoField>

      <Text
        color="gray1"
        fontSize="0.9rem"
        fontWeight="500"
        textAlign="left"
        margin="0 0 0 40px"
      >
        Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesi’ni okudum.
      </Text>

      <Row center margin="20px 0">
        <Button
          className="blue"
          text="Onaylıyorum"
          width="300px"
          disabled={!acceptFirst}
          fontWeight="500"
          onClick={() => {
            setAcceptKvkk(true);
            setOpenModal(false);
          }}
        />
      </Row>
    </Container>
  );
};

export default Kvkk;
