// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Section from '../Section';

import { Material, Svg, Button } from 'components';
import { genderData } from '../../../constants/formData';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import styled from 'styled-components/macro';

const Profile = ({ footer = false }) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.profileSettings.detail);

  const [data, setData] = useState({});

  const actionGetData = async () => {
    await dispatch(
      getProfile(
        () => {
          setData({
            name: detail.data.name,
            title: detail.data.title,
            birthday: detail.data.birthday,
            genre: detail.data.genre,
            about: detail.data.about,
          });
        },
        () => {}
      )
    );
  };

  const actionSetData = async (name, value) => {
    dispatch(
      setProfile(
        { [name]: value },
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
  };

  useEffect(() => {
    actionGetData();
  }, []);

  useLayoutEffect(() => {
    if (detail.isSuccess) {
      setData({
        name: detail.data.name,
        title: detail.data.title,
        birthday: detail.data.birthday,
        genre: detail.data.genre,
        about: detail.data.about,
      });
    }
  }, [detail.isSuccess]);

  return (
    <Section>
      {detail.isSuccess && (
        <>
          <Material.TextField
            required
            label="Adınız Soyadınız"
            type="text"
            name="name"
            value={detail.data.name}
            defaultValue={detail.data.name}
            settings
            action={actionSetData}
            state={detail}
          />
          <Material.TextField
            required
            label="Hakkında"
            type="text"
            name="about"
            value={detail.data.about}
            defaultValue={detail.data.about}
            settings
            action={actionSetData}
            state={detail}
          />
          <Material.SimpleSelect
            required
            label="Cinsiyetiniz"
            items={genderData}
            settings
            name="genre"
            value={detail.data.genre}
            defaultValue={detail.data.genre}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Material.MaterialDateField
            required
            label="Doğum Tarihiniz"
            type="text"
            settings
            name="birthday"
            value={detail.data.birthday}
            defaultValue={detail.data.birthday}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <pre>
            {`
            <Material.TextField
              required
              label="label" //input label
              type="text" // input type
              name="name" // input name
              value={reduicer.name} // reduicer gelen value 
              defaultValue={reduicer.name} // reduicer gelen value
              settings // ayarları açmak için
              action={(name, value) => dispatch({[name]: value})} // action bağlantısı
              state={reduicer} // reduicer isSuccsess and isLoading
            />
            `}
          </pre>
          {footer && (
            <Footer>
              <Button
                type="submit"
                text="Güncelle"
                isLoading={detail.isLoading}
              />
            </Footer>
          )}
        </>
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

export default Profile;
