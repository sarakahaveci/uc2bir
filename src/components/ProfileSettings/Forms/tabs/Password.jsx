import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';

import { setPassword } from 'actions';
import { Material, Svg, Button } from 'components';

const Password = (props) => {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.profileSettings.password);

  const [data, setData] = useState({});

  const actionSetData = async () => {
    dispatch(
      setPassword(
        { ...data },
        () => {
          toast.success('Şifreniz güncellendi.', {
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

  const onSubmit = (event) => {
    event.preventDefault();
    if (data.password !== data.new_password) {
      if (data.new_password === data.new_password_confirmation) {
        actionSetData();
      } else {
        toast.info(() => 'Tekrarlanan Şifre Uymuyor.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      }
    } else {
      toast.info(() => 'Şifreniz bir önceki şifreniz ile aynı olamaz!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <section>
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
            fontWeight="600"
            type="submit"
            text="KAYDET"
            fontSize="15px"
            color="blue"
            transparentDisabled={Object.keys(data).length === 0 ? true : false}
            disabled={Object.keys(data).length === 0 ? true : false}
            isLoading={password.isLoading}
          />
        </Footer>
      </form>
      {props.children}
    </section>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: -15px;
  margin-right: -15px;
`;

export default Password;
