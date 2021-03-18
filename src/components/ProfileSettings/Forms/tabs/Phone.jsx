// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Section from '../Section';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile, verifyCode } from 'actions';
import { unMaskPhone } from 'utils';
import { StepTwo } from 'views/Register/steps';

const ProfileForms = () => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state?.profileSettings2?.profileDetail
  );
  const [phone, setPhone] = useState(unMaskPhone(detail?.data?.phone));
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setPhone(unMaskPhone(detail?.data?.phone));
  },[detail]);

  const actionGetData = async () => {
    await dispatch(
      getProfile(
        () => {},
        () => {
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  const newAction = () => {
    dispatch(
      setProfile(
        { phone: unMaskPhone(phone) },
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
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (detail?.data?.phone !== unMaskPhone(phone))
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

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <Section>
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
              transparentDisabled={detail?.data?.phone !== unMaskPhone(phone) ? false : true}
              disabled={detail?.data?.phone !== unMaskPhone(phone) ? false : true}
              isLoading={detail.isLoading}
            />
          </Footer>
        </form>
      )}
      {modal && (
        <StepTwo
          newAction={newAction}
          phone={phone}
          count={120}
          modal={modal}
          setModal={setModal}
        />
      )}
    </Section>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: -15px;
  margin-right: -15px;
`;

export default ProfileForms;
