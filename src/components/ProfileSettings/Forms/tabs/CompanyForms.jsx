import React, { useState, useEffect } from 'react';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { yesNo } from 'constants/formData';

const ProfileForms = ({ type }) => {
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
            label="Vergi Mükellefi misiniz?"
            onChange={(event) => setHasTaxNumber(!!event.target.value)}
            changeValue={hasTaxNumber ? 1 : 0}
            items={yesNo}
          />
          {(type === 'PERSONAL_TRAINER' || 'WORK_PLACE') && (
            <>
              <Material.TextField
                label="Şirket Ünvanı"
                type="text"
                name="title"
                defaultValue={detail?.data?.title}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
              />
              <Material.TextField
                label="Vergi Dairesi"
                type="text"
                name="tax_office"
                defaultValue={detail?.data?.tax_office}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
              />
              <Material.TextField
                label="Vergi No"
                type="text"
                name="tax_number"
                defaultValue={detail?.data?.tax_number}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                settings="current"
                required
              />
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
