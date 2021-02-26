// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Section from '../Section';

import { Material, Svg, Button } from 'components';
import { genderData } from '../../../constants/formData';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import styled from 'styled-components/macro';

const Profile = () => {
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

  const actionSetData = async () => {
    dispatch(
      setProfile(
        { ...data },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        () => {
          toast.error('Güncelleme işlemi yapılamadı.', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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

  const onSubmit = (event) => {
    event.preventDefault();
    actionSetData();
  };

  return (
    <Section>
      {detail.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            required
            label="Adınız Soyadınız"
            type="text"
            settings
            name="name"
            value={detail.data.name}
            defaultValue={detail.data.name}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Material.TextField
            required
            label="Hakkında"
            type="text"
            settings
            name="about"
            value={detail.data.about}
            defaultValue={detail.data.about}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
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
          <Footer>
            <Button type="submit" text="Güncelle" isLoading={detail.isLoading} />
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

export default Profile;
