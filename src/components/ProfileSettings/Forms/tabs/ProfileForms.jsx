import React, { useEffect, useState } from 'react';
import { Material, Button } from 'components';
import { genderData } from 'constants/formData';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { WORK_PLACE } from '../../../../constants';

const ProfileForms = ({ type }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );
  const user = useSelector((state) => state.auth.user);
  const [saveEnable, setSaveEnable] = useState(false);
  const [data, setData] = useState({});
  const [isDiff, setIsDiff] = useState();


  useEffect(() => {
    setData({ ...data, name: detail?.data?.name })
  }, [detail]);

  const diffHandler = () => {
    const fields = Object.keys(data);
    setIsDiff(fields.every((field) => data[field] === detail?.data[field]));

    if (isDiff) {
      setSaveEnable(false);
    } else {
      setSaveEnable(true);
    }
  };

  const checkDateRange = (minYY, maxYY, value) => {
    if (value !== "Invalid date" &&
      Number(value.substring(6, 10)) >= minYY &&
      Number(value.substring(6, 10)) <= maxYY
    ) {
      setSaveEnable(true);
    }
    else {
      setSaveEnable(false);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (data.name) {
      dispatch(
        setProfile(
          { ...data },
          () => {
            toast.success('Bilgileriniz güncellendi.', {
              position: 'bottom-right',
              autoClose: 2000,
            });
          },
          () => {
            toast.error('Güncelleme işlemi yapılamadı.', {
              position: 'bottom-right',
              autoClose: 2000,
            });
          }
        )
      );
    } else {
      toast.error('İsim Alanı Boş Girilemez', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }

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
              setData({ ...data, [e.target.name]: e.target.value });
              diffHandler(e);
            }}
            settings="current"
            inputProps={{
              readOnly: true,
            }}
          />
          {type == 'WORK_PLACE' && (
            <Material.number
              label="Kapasite (m2)"
              type="number"
              name="capacity"
              defaultValue={detail?.data?.capacity}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
                diffHandler();
              }}
              settings="current"
            />
          )}
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

          {user?.type_id === WORK_PLACE ? (
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
                  checkDateRange(1945, 2014, e.target.value)
                  setData({ ...data, [e.target.name]: e.target.value });
                  //diffHandler(e);
                }
              }}
              settings="current"
              minDate={'01.01.1945'}
              maxDate={'12.12.2014'}
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
