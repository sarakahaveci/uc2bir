// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getVKI, setVKI } from 'actions';
import { useTranslation } from 'react-i18next';

const VKI = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { vki } = useSelector((state) => state.profileSettings);
  const [data, setData] = useState({});
  const [result, setResult] = useState('');

  const actionGetData = () => {
    dispatch(
      getVKI(
        () => {},
        () => {
          toast.error(t('Failed to Fetch Profile Information'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  useEffect(() => {
    if (vki.isSuccess) {
      setResult(vki?.data?.vki);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setVKI(
        {
          weight: data.weight || vki.data.weight,
          height: data.height || vki.data.height,
        },
        () => {
          toast.success(t('Your information has been updated'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
          setData({});
          actionGetData();
        },
        () =>
          toast.error(t('Failed to update'), {
            position: 'bottom-right',
            autoClose: 2000,
          })
      )
    );
  };

  useEffect(() => {
    actionGetData();
  }, [vki.isSuccess]);

  return (
    <section>
      {vki.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.TextField
            label={t('Height (cm)')}
            type="text"
            name="height"
            mask="999"
            defaultValue={vki?.data?.height}
            settings="current"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Material.TextField
            label={t('Weight (kg)')}
            type="text"
            mask="999"
            name="weight"
            defaultValue={vki?.data?.weight}
            settings="current"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Span>
            <p style={{ fontWeight: '400', fontSize: '14px' }}>
              {t('BMI (Body Mass Index)')} : {vki?.data?.vki || result}
            </p>{' '}
          </Span>
          <Footer>
            <Button
              fontWeight="600"
              type="submit"
              text={t('save')}
              fontSize="15px"
              color="blue"
              transparentDisabled={
                Object.keys(data).length === 0 ? true : false
              }
              disabled={Object.keys(data).length === 0 ? true : false}
              isLoading={vki.isLoading}
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

const Span = styled.span`
  display: flex;
  margin-top: 15px;
`;

export default VKI;
