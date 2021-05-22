import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text, Title, Button } from 'components';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';

import { Material } from 'components/inputs/material';
import Data from './Data';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions } from '@material-ui/core';
import { getWalletTransactions } from 'actions/userProfileActions/walletActions';

const Activities = ({ setPage }) => {
  const transactionsData = useSelector(
    (state) => state?.userProfile?.wallet.transactionsData.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWalletTransactions());
  }, []);

  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [date, setDate] = useState(1);
  const fullWidth = true;

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <Title fontSize="13pt" style={{ padding: 15 }} textAlign="left">
              Cüzdanım
            </Title>
          </Col>
          <Col lg="4">
            <ImageBanner src={image} />
          </Col>
          <Col lg="7">
            <Title
              style={{ cursor: 'pointer' }}
              fontSize="12pt"
              textAlign="left"
              onClick={() => setPage('home')}
            >
              {`< Hesap Hareketlerim`}
            </Title>

            <>
              <Text fontSize="10pt">
                Bütün hesap hareketlerinizi bu alanda görüntüleyebilirsiniz.
              </Text>

              {transactionsData.length > 0 ? (
                <div>
                  {' '}
                  <FilterSelect>
                    <Col>
                      <Material.SimpleSelect
                        onChange={(e) => {
                          setPaymentType(e.target.value);
                        }}
                        label="Ödeme Şekli"
                        items={[
                          { id: 'all', name: 'Hepsi' },
                          { id: 'wallet', name: 'Cüzdan' },
                          { id: 'card', name: 'Kredi Kartı' },
                        ]}
                      />
                    </Col>
                    <Col>
                      <Material.SimpleSelect
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        label="Dönem"
                        items={[
                          { id: 'all', name: 'Hepsi' },
                          { id: 1, name: 'Son 7 Gün' },
                          { id: 2, name: 'Son 15 Gün' },
                          { id: 3, name: 'Son 1 Ay' },
                          { id: 4, name: 'Son 3 Ay' },
                        ]}
                      />
                    </Col>
                    {/* <Button className="blue" text="Listele" onClick={handleClick} /> */}
                  </FilterSelect>
                  <Data paymentType={paymentType} date={date} />
                  <Row className="justify-content-end">
                    <Button
                      style={{ textDecoration: 'underline' }}
                      fontWeight="bold"
                      color="blue"
                      text="Döküm Al >"
                      onClick={() => setOpen(true)}
                    />
                  </Row>{' '}
                </div>
              ) : (
                <Capsule>
                  {' '}
                  <CapsuleItem>
                    <Text
                      color="dark"
                      textAlign="left"
                      fontWeight="500"
                      p="5px"
                    >
                      Herhangi bir veri bulunamadı.
                    </Text>
                  </CapsuleItem>
                </Capsule>
              )}
            </>
          </Col>
        </Row>
      </Container>

      <React.Fragment>
        <StyledDialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth="sm"
          open={open}
        >
          <DialogTitle className="text-center">Cüzdanım</DialogTitle>
          <DialogContent>
            <Data />
          </DialogContent>
          <DialogActions>
            <div
              style={{ padding: 30 }}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <Button
                style={{ borderRadius: 0, marginRight: '10px' }}
                className="blue"
                text="Yazdır"
                onClick={() => window.print()}
              />
              <Button
                style={{ borderRadius: 0 }}
                className="blue"
                text="Kapat"
                onClick={() => setOpen(false)}
              />
            </div>
          </DialogActions>
        </StyledDialog>
      </React.Fragment>
    </>
  );
};

const FilterSelect = styled.div`
  width: 100%;
  height: auto;
  padding: 15px 0;
  display: flex;
  flex-wrap: no-wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const StyledDialog = styled(Dialog)`
  margin-top: 150px;
  height: 70vh;
`;

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;

const Capsule = styled.div`
  width: 75%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-left: 15px;
  margin: 10px 0;

  &:before {
    content: '';
    width: 3px;
    background: #ffc47c;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const CapsuleItem = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 7px;
  border-bottom: 1px solid #ddd;

  tr {
    background: transparent !important;

    td {
      padding: 7px 0;
    }
  }
`;

export default Activities;
