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
  let data = {};
  const [saveEnable, setSaveEnable] = useState(false);

  const diffHandler = () => {
    var fields = Object.keys(data);
    var isDiff = fields.every((field) => data[field] == detail?.data[field]);
    var charValidation = fields.every((field) => { 
      if (field == "name") { return data[field].length >= 6 }
      if (field == "title") { return true }
      if (field == "company_date") { return data[field] !== "Invalid date"; }
    });
    if (isDiff) {
      setSaveEnable(false);
    } else {
      setSaveEnable(true);
    }
    if (charValidation) {
      setSaveEnable(true);
    } else {
      setSaveEnable(false);
    }
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
          data = {};
        },
        () => {
          toast.error('Güncelleme işlemi yapılamadı.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
          data = {};
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
              data = { ...data, [e.target.name]: e.target.value };
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
                data = { ...data, [e.target.name]: e.target.value };
                diffHandler();
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
              data = { ...data, [e.target.name]: e.target.value };
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
                data = { ...data, [e.target.name]: e.target.value };
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
                data = { ...data, [e.target.name]: e.target.value };
                diffHandler(e);
              }}
              settings="current"
            />
          ) : (
            <Material.MaterialDateField
              label="Doğum Tarihiniz"
              type="text"
              name="birthday"
              value={detail?.data?.birthday}
              defaultValue={detail?.data?.birthday}
              onChange={(e) => {
                if (e.target.value !== 'Invalid date') {
                  data = { ...data, [e.target.name]: e.target.value };
                  diffHandler(e);
                }
              }}
              settings="current"
              minDate={'01.01.1945'}
              maxDate={'01.15.2014'}
            />
          )}
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text="KAYDET"
              fontSize="15px"
              color="blue"
              transparentDisabled={!saveEnable}
              disabled={!saveEnable}
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
