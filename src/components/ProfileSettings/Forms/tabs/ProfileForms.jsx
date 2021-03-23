import React, { useEffect, useState } from 'react';

import { Material, Button } from 'components';
import { genderData } from 'constants/formData';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';

const ProfileForms = ({ type }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );
  const [data, setData] = useState({});
  const [isBirthdaySafe, setIsBirthdaySafe] = useState(false);

  const actionGetData = () => {
    dispatch(getProfile());
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

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <section>
      {!detail.isLoading && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label="Adınız Soyadınız"
            type="text"
            name="name"
            defaultValue={detail?.data?.name}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            settings="current"
          />
          {type !== 'USER' && (
            <Material.TextField
              label="Ünvan"
              type="text"
              name="title"
              defaultValue={detail?.data?.title}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              settings="current"
            />
          )}
          {type === 'USER' && (
            <>
              <Material.TextField
                label="Mail Adresiniz"
                type="email"
                name="email"
                defaultValue={detail?.data?.email}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
              />
            </>
          )}
          {type !== 'WORK_PLACE' && (
            <Material.SimpleSelect
              label="Cinsiyetiniz"
              items={genderData}
              name="genre"
              defaultValue={detail?.data?.genre}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              settings="current"
            />
          )}
          {type === 'WORK_PLACE' ? (
            <Material.MaterialDateField
              label="Şirket Kuruluş Tarihi"
              type="text"
              name="birthday"
              value={detail?.data?.birthday}
              defaultValue={detail?.data?.birthday}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              settings="current"
              onError={(err) => setIsBirthdaySafe(!!err)}
            />
          ) : (
            <Material.MaterialDateField
              label="Doğum Tarihiniz"
              type="text"
              name="birthday"
              value={detail?.data?.birthday}
              defaultValue={detail?.data?.birthday}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              settings="current"
              minDate={'01.01.1945'}
              maxDate={'01.01.2013'}
              onError={(err) => setIsBirthdaySafe(!!err)}
            />
          )}
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text="KAYDET"
              fontSize="15px"
              color="blue"
              transparentDisabled={
                Object.keys(data).length === 0 ? true : false
              }
              disabled={Object.keys(data).length === 0 || isBirthdaySafe}
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
