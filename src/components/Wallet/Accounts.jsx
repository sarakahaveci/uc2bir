import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Title, Svg, Button } from 'components';
import { Material } from 'components';

import styled from 'styled-components/macro';

const TransferInfo = ({
  setCardName,
  setCardNo,
  setSaveName,
  handleSubmitUpdate,
  item,
  setAccountId,
  handleSubmitDelete,
}) => {
  const [editMode, setEditMode] = useState(false);

  const splitIbanNumber = (text) => {
    return text.match(/.{1,4}/g)?.join(' ');
  };

  return (
    <>
      <DataContainer>
        <div style={{ textAlignLast: 'end', marginBottom: '10px' }}>
          <Svg.Pencil
            className="close-icon"
            style={{
              textAlign: 'right',
              cursor: 'pointer',
              display: 'inline-block',
              marginRight: '10px',
            }}
            onClick={() => {
              setEditMode((prev) => !prev);
              setAccountId(item.id);
            }}
          />
          <Svg.BigClose
            style={{
              textAlign: 'right',
              cursor: 'pointer',
              display: 'inline-block',
            }}
            onClick={() => {
              handleSubmitDelete(item.id);
            }}
          />
        </div>

        <Explanation>
          <Col>
            <Title textAlign="left">Kayıt Adı </Title>
          </Col>
          |
          <Col>
            <TitleWrapper>
              {(editMode && (
                <Material.TextField
                  required
                  style={{ display: 'flex' }}
                  fontWeight="400"
                  textAlign="right"
                  type="text"
                  name="bank_title"
                  onChange={(e) => {
                    setSaveName(e.target.value);
                  }}
                />
              )) || (
                <Title textAlign="right" fontWeight="500">
                  {item.bank_title}{' '}
                </Title>
              )}
            </TitleWrapper>
          </Col>
        </Explanation>

        <Explanation>
          <Col>
            <Title textAlign="left">Alıcı Adı Soyadı </Title>
          </Col>
          |
          <Col>
            <TitleWrapper>
              {(editMode && (
                <Material.TextField
                  required
                  style={{ display: 'flex' }}
                  fontWeight="400"
                  type="text"
                  name="holder_name"
                  onChange={(e) => {
                    setCardName(e.target.value);
                  }}
                />
              )) || (
                <Title
                  textAlign="right"
                  style={{ display: 'flex', textAlign: 'right' }}
                  fontWeight="400"
                >
                  {item.username}
                </Title>
              )}
            </TitleWrapper>
          </Col>
        </Explanation>

        <Explanation>
          <Col>
            <Title textAlign="left">Alıcı IBAN No </Title>
          </Col>
          |
          <Col>
            <TitleWrapper>
              {(editMode && (
                <Material.TextField
                  required
                  mask="9999 9999 9999 9999"
                  type="text"
                  name="card_number"
                  onChange={(e) => {
                    setCardNo(e.target.value.replace(/ /g, ''));
                  }}
                />
              )) || (
                <Title
                  textAlign="right"
                  style={{ display: 'flex' }}
                  fontWeight="400"
                >
                  TR {splitIbanNumber(item.iban_no)}
                </Title>
              )}
            </TitleWrapper>
          </Col>
        </Explanation>
        {editMode && (
          <div style={{ textAlign: 'right' }}>
            <Button
              style={{ width: '50%', padding: '10px', marginTop: '20px' }}
              className="blue"
              text="Kaydet"
              onClick={() => {
                handleSubmitUpdate();
                setEditMode(false);
              }}
            />
          </div>
        )}
        <CheckBoxWrapper>
          <Material.CheckBox
            checked={item.default === 1 ? true : false}
            onChange={() => {}}
            style={{ marginTop: '20px' }}
            label={
              <div>
                <span onClick={() => {}}>Varsayılan Hesap Olarak Ayarla</span>
              </div>
            }
          />
        </CheckBoxWrapper>
      </DataContainer>
    </>
  );
};

const DataContainer = styled.div`
  width: 100%;
  background: white;
  margin-top: 20px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #00b2a9;
  padding: 20px 20px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;
const Explanation = styled.section`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:before {
    position: absolute;
    width: calc(100%);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxWrapper = styled.div`
  margin-top: 20px;
  margin-left: 20px;
`;

export default TransferInfo;
