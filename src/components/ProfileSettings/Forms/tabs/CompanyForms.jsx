import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { yesNo } from 'constants/formData';

const ProfileForms = ({ type }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );
  const [data, setData] = useState({});
  const [hasTaxNumber, setHasTaxNumber] = useState(false);

  useEffect(() => {
    setHasTaxNumber(!!detail?.data?.tax_number);
  }, [detail]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setProfile(
        { ...data },
        () => {
          toast.success(t('Your information has been updated'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
          setData({});
        },
        () => {
          toast.error(t('Failed to update'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  return (
    <section>
      {detail.isSuccess && (
        <form onSubmit={onSubmit}>
          <Material.SimpleSelect
            required
            name="tax"
            forHtml="tax"
            label={t('Are you a Taxpayer?')}
            onChange={(event) => setHasTaxNumber(!!event.target.value)}
            changeValue={hasTaxNumber ? 1 : 0}
            items={yesNo}
          />
          {(type === 'PERSONAL_TRAINER' || 'WORK_PLACE') && (
            <>
              <Material.TextField
                label={t('Company Title')}
                type="text"
                name="title"
                defaultValue={detail?.data?.title}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
                inputProps={{ maxLength: 100 }}
              />
              <Material.TextField
                label={t('Tax Administration')}
                type="text"
                name="tax_office"
                defaultValue={detail?.data?.tax_office}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
                inputProps={{ maxLength: 100 }}
              />
              <Material.TextField
                label={t('Tax number')}
                type="text"
                name="tax_number"
                defaultValue={detail?.data?.tax_number}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
                inputProps={{ maxLength: 11 }}
              />
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
                  isLoading={detail.isLoading}
                />
              </Footer>
            </>
          )}
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
