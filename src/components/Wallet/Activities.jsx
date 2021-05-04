import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text, Title, Button } from 'components';

import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';

import { Material } from 'components/inputs/material';
import Data from './Data';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions } from '@material-ui/core';

const Activities = ({ setPage }) => {
  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'sm';
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
              <FilterSelect>
                <Col>
                  <Material.SimpleSelect
                    label="Ödeme Türü"
                    items={[{ id: 'all', name: 'Hepsi' }]}
                  />
                </Col>
                <Col>
                  <Material.SimpleSelect
                    label="Dönem"
                    items={[{ id: 'all', name: 'Hepsi' }]}
                  />
                </Col>
                <Button className="blue" text="Listele" />
              </FilterSelect>
              <Data />
              <Row className="justify-content-end">
                <Button
                  style={{ textDecoration: 'underline' }}
                  fontWeight="bold"
                  color="blue"
                  text="Döküm Al >"
                  onClick={() => setOpen(true)}
                />
              </Row>
            </>
          </Col>
        </Row>
      </Container>
      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
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
        </Dialog>
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

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;

export default Activities;
