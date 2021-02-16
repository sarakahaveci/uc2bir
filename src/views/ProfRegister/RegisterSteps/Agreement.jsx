import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Title, Material, Row, Text } from 'components';

const Agreement = ({ setAcceptMemberAgreement, setOpenAgreement }) => {
  return (
    <AgreementWrapper>
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

      <TextAreaWrapper>
        <Material.checkbox checked={false} />

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
          dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor sit
          amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
          commodo viverra maecenas Lorem ipsum dolor sit amet, consectetur urna
          adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
          adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
          accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
          elitiLorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed
          do eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
          dolor sit amet, consectetur urna adipiscing eliti
        </TextArea>
      </TextAreaWrapper>

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

      <TextAreaWrapper>
        <Material.checkbox checked={false} />

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
          dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor sit
          amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
          commodo viverra maecenas Lorem ipsum dolor sit amet, consectetur urna
          adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
          adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
          accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
          elitiLorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed
          do eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
          dolor sit amet, consectetur urna adipiscing eliti
        </TextArea>
      </TextAreaWrapper>

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

      <TextAreaWrapper>
        <Material.checkbox checked={false} />

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
          dolor sit amet, consectetur urna adipiscing elitiLorem ipsum dolor sit
          amet, consectetur urna adipiscing elit, sed do eiusmod tempor eget
          commodo viverra maecenas Lorem ipsum dolor sit amet, consectetur urna
          adipiscing elitiLorem ipsum dolor sit amet, consectetur urna
          adipiscing elit, sed do eiusmod tempor eget commodo viverra maecenas
          accumsan.Lorem ipsum dolor sit amet, consectetur urna adipiscing
          elitiLorem ipsum dolor sit amet, consectetur urna adipiscing elit, sed
          do eiusmod tempor eget commodo viverra maecenas accumsan.Lorem ipsum
          dolor sit amet, consectetur urna adipiscing eliti
        </TextArea>
      </TextAreaWrapper>

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

const TextAreaWrapper = styled.div`
  display: flex;
  align-items: center;

  fieldset {
    height: 30px;
    margin-right: 10px;
  }
`;

const TextArea = styled.div`
  max-height: 127px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #c6c6c6;
  font-size: 0.9rem;
  overflow-y: scroll;
  padding: 15px;
  letter-spacing: 0.01em;
  color: var(--black3);
  margin-bottom: 15px;

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
