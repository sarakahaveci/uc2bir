import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Button, Svg, Spinner } from 'components';
import { deleteAddressList, getAddressList } from 'actions';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Edit = ({ setSubPage }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { getAddress } = useSelector(
    (state) => state.profileSettings2.sessionType
  );

  useEffect(() => {
    dispatch(getAddressList());
  }, []);

  const deleted = (id) => {
    dispatch(
      deleteAddressList(
        id,
        () => {
          dispatch(getAddressList());
          toast.success(t('Address deleted successfully'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },
        () => {}
      )
    );
  };

  return (
    <>
      <Button text={t('< Back')} onClick={() => setSubPage('Adds')} />
      {!getAddress?.isLoading ? (
        <>
          <div className="d-flex flex-wrap">
            <List>
              {getAddress?.data.length > 0 ? (
                getAddress.data.map((val) => (
                  <>
                    <Item>
                      <div className="line-left">
                        <div>{val?.title || t('Clinic')}</div>
                        <div>
                          <span>
                            <Svg.LocationIcon />
                          </span>
                          {val?.address_detail}
                        </div>
                      </div>

                      <Button
                        className="edit"
                        icon={Svg.CencelIcon}
                        onClick={() => deleted(val?.id)}
                      />
                    </Item>
                  </>
                ))
              ) : (
                <strong>{t('You do not have any address entered')} </strong>
              )}
            </List>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const List = styled.ul`
  width: 100%;
  height: auto;
`;

const Item = styled.li`
  border-radius: 15px;
  box-shadow: 4px 6px 15px -5px rgba(0, 0, 0, 0.35);
  padding: 30px;
  margin-bottom: 15px;
  margin-left: -15px;
  position: relative;

  button {
    position: absolute;
    right: -60px;
    top: 0;

    span {
      display: none;
    }
  }

  button.cencel {
    top: 30px;
  }

  button.edit {
    top: 0px;
  }

  .line-left {
    border-left: 4px solid #9d9d9d;
    padding-left: 10px;
  }
`;

export default Edit;
