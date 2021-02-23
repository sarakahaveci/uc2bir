// @ts-nocheck
import React, { useEffect, useState } from 'react';

import {
  Button,
  Text,
  MacroCollections,
  Material,
  Agreement,
  Kvkk,
  Permission,
} from '../../../components';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { stepOne as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepOne, getConfirmationData } from '../../../actions';
import StepTwo from './step-two';

import { Modal } from 'react-bootstrap';

const StepOne = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const {
    confirmation: { data: confirmationData }
  } = useSelector((state) => state.registerData);

  const getStepOne = useSelector((state) => state.stepOne);
  const [data, setData] = useState({ ...macro.inputs });
  const [modal, setModal] = useState('');

  const [confirmationType, setConfirmationType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(true);
  const [acceptKvkk, setAcceptKvkk] = useState(false);
  const [acceptPermissions, setAcceptPermissions] = useState(false);

  useEffect(() => {
    if (Object.keys(registerData).length) {
      dispatch(getConfirmationData());
    }
  }, [registerData]);

  const isSuccess = () => {
    return setModal(true);
  };
  const isError = () => {
    toast.error('Hatalı Giriş', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (getStepOne.error) {
      if (getStepOne.error) {
        if ( Object.entries(getStepOne.error).length < 6 ) {
          for (const [key, val] of Object.entries(getStepOne.error)) {
            toast.error(`${key}: ${val}`, {
              position: 'bottom-right',
              autoClose: 4500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      } else {
        toast.error(getStepOne.error, {
          position: 'bottom-right',
          autoClose: 4500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [getStepOne.error]);

  const actionStepOne = () => {
    dispatch(
      setStepOne(
        {
          ...data,
          kvkk: acceptKvkk ? 1 : 0,
          agreement: acceptMemberAgreement ? 1 : 0,
          health_status: acceptHealthAgreement ? 1 : 0,
          permission: acceptPermissions ? 1 : 0,
        },
        isSuccess,
        isError
      )
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (registerData) {
      const user_type = registerData['user-type'].filter((f) => f.key === 'st');
      setData({ ...data, [data.type_id]: user_type.id });
      const response = await actionStepOne();
      return response;
    } else {
      toast.error('Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let confirmation;

  switch (confirmationType) {
    case 'agreement':
      confirmation = (
        <Agreement
          setAcceptMemberAgreement={setAcceptMemberAgreement}
          acceptMemberAgreement={acceptMemberAgreement}
          setOpenModal={setOpenModal}
          agreementData={confirmationData?.['agreement']}
          extraAgreementData={confirmationData?.['agreementExtra']}
        />
      );
      break;

    case 'kvkk':
      confirmation = (
        <Kvkk
          acceptKvkk={acceptKvkk}
          setAcceptKvkk={setAcceptKvkk}
          setOpenModal={setOpenModal}
          kvkkData={confirmationData?.['kvkk']}
        />
      );
      break;

    case 'permission':
      confirmation = (
        <Permission
          acceptPermissions={acceptPermissions}
          setAcceptPermissions={setAcceptPermissions}
          setOpenModal={setOpenModal}
          permissionData={confirmationData?.['permission']}
        />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <form className="step-one-wrapper" onSubmit={onSubmit} autoComplete="off">
        <MacroCollections macro={macro.macro} data={data} setData={setData} />
        <div className="step-one-wrapper__checkbox-wrapper">
          <Material.CheckBox
            checked={acceptMemberAgreement}
            required={true}
            onChange={(e) => setAcceptMemberAgreement(e.target.checked)}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('agreement');
                    setOpenModal(true);
                  }}
                >
                  Üyelik Sözleşmesini
                </span>
                ve &nbsp;
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('agreement');
                    setOpenModal(true);
                  }}
                >
                  Ekleri'ni
                </span>
                kabul ediyorum.
              </div>
            }
          />

          <Material.CheckBox
            onChange={(e) => setAcceptKvkk(e.target.checked)}
            required={true}
            checked={acceptKvkk}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('kvkk');
                    setOpenModal(true);
                  }}
                >
                  KVKK
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            onChange={(e) => setAcceptPermissions(e.target.checked)}
            required={true}
            checked={acceptPermissions}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('permission');
                    setOpenModal(true);
                  }}
                >
                  Açık rıza ve aydınlatma metinleri
                </span>
              </div>
            }
          />
        </div>
        {!getStepOne.isLoading ? (
          <Button type="submit" text={`İleri`} className="blue" />
        ) : (
          <Button
            onClick={() => {
              console.log('Lütfen Bekleyiniz...');
            }}
            text={`Yükleniyor...`}
            className="blue"
          />
        )}
      </form>
      {modal && <StepTwo setSteps={setSteps} phone={data.phone} count={1} modal={modal} setModal={setModal} />}
      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        gray
        textAlign="center"
      >
        Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </Text>
      <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
        {confirmation}
      </StyledModal>
      {/* <div className="identfy">
        <span>Veya</span>
      </div> */}
    </>
  );
};

const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
  }
`;

export default StepOne;
