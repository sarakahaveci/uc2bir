import React, { useState } from 'react';
import { Material, Button } from 'components';
import { genderData } from 'constants/formData';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';

const ProfileForms = ({ type }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );
  const [data, setData] = useState({});
  const [diffData] = useState({});
  const [saveEnable, setSaveEnable] = useState(false);
  const [setIsBirthdaySafe] = useState(false);

  const diffHandler = (e) => {
    if (detail?.data[e.target.name] !== e.target.value) {
      diffData[e.target.name] = true;
    } else {
      diffData[e.target.name] = false;
    }
    Object.values(diffData).every((el) => el === false)
      ? setSaveEnable(true)
      : setSaveEnable(false);
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
          setData({});
        }
      )
    );
  };

  return (
    <section>
      {!detail.isLoading && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label="Adınız Soyadınız"
            type="text"
            name="name"
            defaultValue={detail?.data?.name}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
              diffHandler(e);
            }}
            settings="current"
          />
          {type !== 'USER' && (
            <Material.TextField
              label="Ünvan"
              type="text"
              name="title"
              defaultValue={detail?.data?.title}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
                diffHandler(e);
              }}
              settings="current"
            />
          )}
          <Material.TextField
            label="Mail Adresiniz"
            type="email"
            name="email"
            defaultValue={detail?.data?.email}
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
              diffHandler(e);
            }}
            settings="current"
            inputProps={{
              readOnly: true,
            }}
          />
          {type !== 'WORK_PLACE' && (
            <Material.SimpleSelect
              label="Cinsiyetiniz"
              items={genderData}
              name="genre"
              defaultValue={detail?.data?.genre}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
                diffHandler(e);
              }}
              settings="current"
            />
          )}
          {type === 'WORK_PLACE' ? (
            <Material.MaterialDateField
              label="Şirket Kuruluş Tarihi"
              type="text"
              name="company_date"
              value={detail?.data?.company_date}
              defaultValue={detail?.data?.company_date}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
                diffHandler(e);
              }}
              settings="current"
              onError={(err) => setIsBirthdaySafe(err)}
            />
          ) : (
            <Material.MaterialDateField
              label="Doğum Tarihiniz"
              type="text"
              name="birthday"
              value={detail?.data?.birthday}
              defaultValue={detail?.data?.birthday}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
              settings="current"
              minDate={'01.01.1945'}
              maxDate={'01.01.2020'}
              onError={(err) => setIsBirthdaySafe(err)}
            />
          )}
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text="KAYDET"
              fontSize="15px"
              color="blue"
              transparentDisabled={saveEnable}
              disabled={saveEnable}
              isLoading={detail.isLoading}
            />
          </Footer>
        </form>
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
