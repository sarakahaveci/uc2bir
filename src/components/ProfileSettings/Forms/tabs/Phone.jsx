import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';

import { Material, Button } from 'components';
import { getProfile, setProfile, verifyCode } from 'actions';
import { unMaskPhone } from 'utils';
import { StepTwo } from 'views/Register/steps';

const ProfileForms = () => {
  const { detail } = useSelector(
    (state) => state?.profileSettings2?.profileDetail
  );

  const [phone, setPhone] = useState();
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const unMaskedPhone = unMaskPhone(phone);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    setPhone(unMaskedPhone);
  }, [detail]);

  // If phone is same with current phone or its length is less than it has to be then it is invalid.
  const invalidPhoneNumber =
    detail?.data?.phone === unMaskedPhone ||
    unMaskedPhone.toString().length < 11;

  const editPhoneHandler = () =>
    dispatch(
      setProfile(
        { phone: unMaskedPhone },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });

          setPhone();

          setModal(false);
        },
        () => {
          toast.error('Güncelleme işlemi yapılamadı.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );

  const onSubmit = (event) => {
    event.preventDefault();

    if (detail?.data?.phone !== unMaskedPhone)
      dispatch(
        verifyCode(
          { phone },
          () => setModal(true),
          () =>
            toast.error('Kod gönderilemedi', {
              position: 'bottom-right',
              autoClose: 2000,
            })
        )
      );
  };

  return (
    <section>
      {detail.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label="Telefon Numaranız"
            type="text"
            name="phone"
            mask="\0(999) 999 99 99"
            defaultValue={detail?.data?.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text="KAYDET"
              fontSize="15px"
              color="blue"
              transparentDisabled={invalidPhoneNumber}
              disabled={invalidPhoneNumber}
              isLoading={detail.isLoading}
            />
          </Footer>
        </form>
      )}
      {modal && (
        <StepTwo
          newAction={editPhoneHandler}
          phone={phone}
          count={120}
          modal={modal}
          setModal={setModal}
        />
      )}
    </section>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: -15px;
  margin-right: -15px;
`;

export default ProfileForms;
