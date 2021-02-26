// @ts-nocheck
import React, { useState } from 'react';
import Section from '../Section';

import { Material, Svg, Button } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setPassword } from 'actions';
import styled from 'styled-components/macro';

const Password = () => {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.profileSettings.password);

  const [data, setData] = useState({
    password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const actionSetData = async () => {
    dispatch(
      setPassword(
        { ...data },
        () => {
          toast.success('Şifreniz güncellendi.', {
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

  const onSubmit = (event) => {
    event.preventDefault();
    actionSetData();
  };

  return (
    <Section>
      <form onSubmit={onSubmit}>
        <Material.TextField
          required
          label="Şifreniz"
          type="password"
          settings="current"
          name="password"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          password={Svg.EyeIcon}
        />
        <Material.TextField
          required
          label="Yeni Şifreniz"
          type="password"
          settings="current"
          name="new_password"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          password={Svg.EyeIcon}
        />
        <Material.TextField
          required
          label="Yeni Şifre Tekrar"
          type="password"
          settings="current"
          name="new_password_confirmation"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          password={Svg.EyeIcon}
        />
        <Footer>
          <Button
            type="submit"
            text="Güncelle"
            isLoading={password.isLoading}
          />
        </Footer>
      </form>
    </Section>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: -15px;
  margin-right: -15px;
`;

export default Password;
