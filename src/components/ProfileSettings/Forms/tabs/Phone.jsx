// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Section from '../Section';

import { Material, Button } from 'components';
import { genderData } from 'constants/formData';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import { unMaskPhone } from 'utils';

const ProfileForms = ({ type }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );
  const [data, setData] = useState({});

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

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setProfile(
        { ...data },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
          setData({});
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
            value={detail?.data?.phone}
            defaultValue={detail?.data?.phone}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Footer>
            <Button
              style={{
                margin: 15,
                paddingLeft: 30,
                paddingRight: 30,
                fontSize: '10pt',
              }}
              className="blue"
              type="submit"
              text="Kaydet"
              disabled={Object.keys(data).length === 0 ? true : false}
              isLoading={detail.isLoading}
            />
          </Footer>
        </form>
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
