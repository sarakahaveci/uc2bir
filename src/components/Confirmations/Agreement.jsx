import React, { useState, useEffect } from 'react';

import { Button, Title, Material, Row, Text, Svg } from 'components';
import {
  Container,
  InfoField,
  TextArea,
  TextAreaWrapper,
} from './Common.styles.jsx';

const Agreement = ({
  acceptMemberAgreement,
  setAcceptMemberAgreement,
  setOpenModal,
  agreementData,
  extraAgreementData,
}) => {
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [acceptSecond, setAcceptSecond] = useState(false);

  useEffect(() => {
    if (acceptMemberAgreement) {
      setAcceptFirst(true);
      setAcceptSecond(true);
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

      <Title
        variant="h5"
        color="softDark"
        fontWeight="600"
        letterSpacing={false}
        textAlign="left"
        fontSize="1.1rem"
        dangerouslySetInnerHTML={{ __html: agreementData?.title }}
      />

      <InfoField>
        <Material.checkbox
          checked={acceptFirst}
          onChange={() => setAcceptFirst(!acceptFirst)}
        />

        <TextAreaWrapper>
          <TextArea
            dangerouslySetInnerHTML={{ __html: agreementData?.detail }}
          />
        </TextAreaWrapper>
      </InfoField>

      <Title
        variant="h5"
        color="dark"
        fontWeight="600"
        latterSpacing={false}
        textAlign="left"
        fontSize="1.1rem"
        dangerouslySetInnerHTML={{ __html: extraAgreementData?.title }}
      />

      <InfoField>
        <Material.checkbox
          checked={acceptSecond}
          onChange={() => setAcceptSecond(!acceptSecond)}
        />

        <TextAreaWrapper>
          <TextArea
            dangerouslySetInnerHTML={{ __html: extraAgreementData?.detail }}
          />
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
          disabled={!acceptFirst || !acceptSecond}
          fontWeight="500"
          onClick={() => {
            setAcceptMemberAgreement(true);
            setOpenModal(false);
          }}
        />
      </Row>
    </Container>
  );
};

export default Agreement;
