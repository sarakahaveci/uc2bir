import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Title,
  DietitianPriceCard,
  Button,
  Modal,
  Svg,
  Text,
} from 'components';
import { getDietitianPrice, updateDietitianPrice } from 'actions';
import BannerPhoto from 'assets/activityPicture.png';

export default function DietitianPrice() {
  const dispatch = useDispatch();
  const [newPrice, setPrice] = useState();
  const [open, setOpen] = useState(false);

  const { price, waiting_approval_price, isLoading } = useSelector(
    (state) => state.profileSettings2.dietitianPrice.price
  );

  useEffect(() => {
    setPrice(waiting_approval_price || price);
  }, [price, waiting_approval_price]);

  useEffect(() => {
    dispatch(getDietitianPrice());
  }, []);

  const updatePrice = () => {
    dispatch(
      updateDietitianPrice(
        { price: newPrice },
        () => setOpen(true),
        (error) => {
          toast.error(error, {
            position: 'bottom-right',
            autoClose: 4000,
          });
        }
      )
    );
  };

  return isLoading ? (
    <div>Yükleniyor</div>
  ) : (
    <div className="p-3">
      <Title fontSize="24px" fontWeight="600" textAlign="left">
        Ücretlerim
      </Title>
      <div className="d-flex row">
        <div className="col-md-4 col-sm-12">
          <img src={BannerPhoto} alt="" width="100%" />
        </div>
        <div className="col-md-8 col-sm-12">
          <Title
            className="mb-2"
            fontSize="16px"
            letterSpacing="0.03em"
            fontWeight="500"
            textAlign="left"
          >
            Seans ücretinizi belirleyiniz
          </Title>{' '}
          <Title
            className="mb-3"
            fontSize="13px"
            fontWeight="500"
            textAlign="left"
          >
            Tek bir seans için verdiğiniz hizmetin ücretini belirleyiniz
          </Title>
          <DietitianPriceCard
            price={price}
            waitingPrice={waiting_approval_price}
            setPrice={setPrice}
          />
        </div>
        <div className="d-flex w-75 mt-5">
          <Button
            className="blue dietitan-price__saveButton"
            text="Kaydet"
            fontSize="10pt"
            disabled={price === newPrice}
            onClick={updatePrice}
          />
        </div>
      </div>
      <Modal show={open} onHide={() => setOpen(false)} backdrop="static">
        <Container>
          <Svg.SuccessIcon />

          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            Merhaba Sevgili Üyemiz{' '}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            Girmiş olduğun seans ücreti tarafımızca incelendikten sonra sana
            bilgi vereceğiz.
            <span> Bildirimleri açmayı unutma :)</span>
          </Text>
        </Container>

        <div className="modal-footer" closeIcon={false}>
          <StyledLink
            onClick={() => {
              setOpen(false);
            }}
          >
            Devam Et
          </StyledLink>
        </div>
      </Modal>
    </div>
  );
}

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--blue);
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;

  svg {
    margin-bottom: 15px;
  }
`;
