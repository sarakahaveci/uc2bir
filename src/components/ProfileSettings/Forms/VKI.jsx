// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Section from './Section';

import { Material, Button, Svg } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getVKI, setVKI } from 'actions';

const VKI = () => {
  const dispatch = useDispatch();
  const { vki } = useSelector((state) => state.profileSettings);
  const [data, setData] = useState({
    weight: vki?.data?.weight,
    height: vki?.data?.height,
  });
  const [result, setResult] = useState("");

  const actionGetData = async () => {
    await dispatch(
      getVKI(
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

  useEffect(() => {
    if ( vki.isSuccess ) {
      setResult(vki?.data?.vki);
    }
  },[]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      setVKI(
        { weight: data.weight || vki.data.weight, height: data.height || vki.data.height },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
          actionGetData();
        },
        () => {
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  useEffect(() => {
    actionGetData();
  }, [vki.isSuccess]);

  return (
    <Section>
      {vki.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label="Boy (cm)"
            type="text"
            name="height"
            mask="999"
            value={vki?.data?.height}
            defaultValue={vki?.data?.height}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Material.TextField
            label="Ağarlık (kg)"
            type="text"
            mask="999"
            name="weight"
            value={vki?.data?.weight}
            defaultValue={vki?.data?.weight}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Span><b>VKI</b>: {vki?.data?.vki || result}</Span>
          <Footer>
            <Button
              type="submit"
              text="Hesapla ve Kaydet"
              color="blue"
              isLoading={vki.isLoading}
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

const Span = styled.span`
  display: flex;
  margin-top: 15px;
`;

export default VKI;
