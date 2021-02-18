import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Title, Material, Row, Text, Svg } from 'components';

const Agreement = ({
  acceptMemberAgreement,
  setAcceptMemberAgreement,
  setOpenAgreement,
}) => {
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [acceptSecond, setAcceptSecond] = useState(false);
  const [acceptThird, setAcceptThird] = useState(false);

  useEffect(() => {
    if (acceptMemberAgreement) {
      setAcceptFirst(true);
      setAcceptSecond(true);
      setAcceptThird(true);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <AgreementWrapper>
      <Svg.CloseIcon
        className="close-icon"
        onClick={() => setOpenAgreement(false)}
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
      >
        Cayma Hakkı
      </Title>

      <InfoField>
        <Material.checkbox
          checked={acceptFirst}
          onChange={() => setAcceptFirst(!acceptFirst)}
        />

        <TextAreaWrapper>
          <TextArea>
            Lorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed do
            eiusmod tempor eget commodo viverra maeceaccumsan.Lorem ipsum dolor
            sit amet, consectetur urna adipiscing eliti.Lorem ipsum dolor sit
            amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
            commodo viverra maecenas accumsan.Lorem ipsum dolor sit amet,
            consectetur urna adipiscing litiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maaccumsan.Lorem ipsum dolor sit amet, consectetur urna
            adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elitdo eiusmod tempor ecommodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            elitiLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do
            eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
            dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor
            sit amet, consectetur urna adipiscing elit, sed do eiusmod tempor
            eget commodo viverra maecenas Lorem ipsum dolor sit amet,
            consectetur urna adipiscing elitiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maecenas accumsan.Lorem ipsum dolor sit amet, consectetur
            urna adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            eliti
          </TextArea>
        </TextAreaWrapper>
      </InfoField>

      <Title
        variant="h5"
        color="dark"
        letterSpacing={false}
        fontWeight="600"
        textAlign="left"
        fontSize="1.1rem"
      >
        Ön Bilgilendirme Formu
      </Title>

      <InfoField>
        <Material.checkbox
          checked={acceptSecond}
          onChange={() => setAcceptSecond(!acceptSecond)}
        />

        <TextAreaWrapper>
          <TextArea rows={6}>
            Lorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed do
            eiusmod tempor eget commodo viverra maeceaccumsan.Lorem ipsum dolor
            sit amet, consectetur urna adipiscing eliti.Lorem ipsum dolor sit
            amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
            commodo viverra maecenas accumsan.Lorem ipsum dolor sit amet,
            consectetur urna adipiscing litiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maaccumsan.Lorem ipsum dolor sit amet, consectetur urna
            adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elitdo eiusmod tempor ecommodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            elitiLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do
            eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
            dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor
            sit amet, consectetur urna adipiscing elit, sed do eiusmod tempor
            eget commodo viverra maecenas Lorem ipsum dolor sit amet,
            consectetur urna adipiscing elitiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maecenas accumsan.Lorem ipsum dolor sit amet, consectetur
            urna adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            eliti
          </TextArea>
        </TextAreaWrapper>
      </InfoField>

      <Title
        variant="h5"
        color="dark"
        fontWeight="600"
        latterSpacing={false}
        textAlign="left"
        fontSize="1.1rem"
      >
        Mesafeli Satış Sözleşmesi
      </Title>

      <InfoField>
        <Material.checkbox
          checked={acceptThird}
          onChange={() => setAcceptThird(!acceptThird)}
        />

        <TextAreaWrapper>
          <TextArea rows={6}>
            Lorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed do
            eiusmod tempor eget commodo viverra maeceaccumsan.Lorem ipsum dolor
            sit amet, consectetur urna adipiscing eliti.Lorem ipsum dolor sit
            amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
            commodo viverra maecenas accumsan.Lorem ipsum dolor sit amet,
            consectetur urna adipiscing litiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maaccumsan.Lorem ipsum dolor sit amet, consectetur urna
            adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elitdo eiusmod tempor ecommodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            elitiLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do
            eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
            dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor
            sit amet, consectetur urna adipiscing elit, sed do eiusmod tempor
            eget commodo viverra maecenas Lorem ipsum dolor sit amet,
            consectetur urna adipiscing elitiLorem ipsum dolor sit amet,
            consectetur urna adipiscing elit, sed do eiusmod tempor eget commodo
            viverra maecenas accumsan.Lorem ipsum dolor sit amet, consectetur
            urna adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
            adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
            accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
            eliti
          </TextArea>
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
          disabled={!acceptFirst || !acceptSecond || !acceptThird}
          fontWeight="500"
          onClick={() => {
            setAcceptMemberAgreement(true);
            setOpenAgreement(false);
          }}
        />
      </Row>
    </AgreementWrapper>
  );
};

export default Agreement;

const AgreementWrapper = styled.div`
  h5 {
    margin: 0 0 15px 35px;
  }
`;

const InfoField = styled.div`
  display: flex;
  align-items: center;

  fieldset {
    height: 30px;
    margin-right: 10px;
  }
`;

const TextArea = styled.div`
  max-height: 100px;
  font-size: 0.9rem;
  overflow-y: scroll;
  letter-spacing: 0.01em;
  color: var(--black3);
  padding: 10px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 62px;
    border-radius: 3px;
    background: rgba(155, 155, 155, 0.4);
  }
`;

const TextAreaWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  border: 1px solid #c6c6c6;
  padding: 5px;
  letter-spacing: 0.01em;
  color: var(--black3);
  margin-bottom: 15px;
`;
