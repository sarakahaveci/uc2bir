// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Button, Text, MacroCollections, Material } from '../../../components';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { stepOne as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepOne } from '../../../actions';
import StepTwo from './step-two';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { colorGenerator } from 'utils';

const StepOne = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const getStepOne = useSelector((state) => state.stepOne);
  const [data, setData] = useState({ ...macro.inputs });
  const [modal, setModal] = useState('');
  const [modalConfiguration, setModalConfiguration] = useState({
    name: '',
    text: {},
    label: '',
  });

  const [openModal, setOpenModal] = useState(false);
  const fullWidth = true;
  const maxWidth = 'lg';
  const handleClose = () => setOpenModal(false);
  const handleClickOpen = () => setOpenModal(true);

  const isSuccess = () => {
    toast.success('Kayıt alındı.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => setModal(true),
      });
    }, 1000);
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
    dispatch(setStepOne({ ...data }, isSuccess, isError));
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
  return (
    <>
      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openModal}
          onClose={handleClose}
        >
          <DialogTitle className="text-center">
            Sözleşmeyi şartları.
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ padding: '15px 30px' }}
              className="text-center"
            >
              {modalConfiguration.text.title} Lütfen okuyunuz!
            </DialogContentText>
            <div className="d-flex flex-wrap dialog-center">
              {modalConfiguration.text.text}
              <div style={{margin: 15}} className="d-flex">
                <Material.CheckBox
                  name={modalConfiguration.name}
                  checked={data[modalConfiguration.name] ? true : false}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.checked ? 1 : 0,
                    });
                    return setOpenModal(false);
                  }}
                  label={modalConfiguration.label}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <form onSubmit={onSubmit} autoComplete="off">
        <MacroCollections macro={macro.macro} data={data} setData={setData} />
        <div className="step-one-wrapper__checkbox-wrapper">
          <Material.CheckBox
            required
            name="agreement"
            checked={data.agreement ? true : false}
            label={
              <div>
                <span
                  style={{ color: colorGenerator('blue') }}
                  className="underline-text"
                  onClick={(e) => {
                    setOpenModal(true);
                    setData({ ...data, agreement: 0 });
                    return setModalConfiguration({
                      name: 'agreement',
                      text: registerData?.pages?.filter(
                        (f) => f.seo_friendly_url === 'uyelik-sozlesmesi-ekleri'
                      ),
                      label: 'Üyelik Sözleşmesini ve Ekleri ’ni kabul ediyorum',
                    });
                  }}
                >
                  Üyelik Sözleşmesini
                </span>
                ve &nbsp;
                <span
                  style={{ color: colorGenerator('blue') }}
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
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
            required
            name="health_status"
            checked={data.health_status ? true : false}
            label={
              <div>
                <span
                  style={{ color: colorGenerator('blue') }}
                  className="underline-text"
                  onClick={(e) => {
                    setOpenModal(true);
                    setData({ ...data, health_status: 0 });
                    return setModalConfiguration({
                      name: 'health_status',
                      text: registerData?.pages?.filter(
                        (f) => f.seo_friendly_url === 'uyelik-sozlesmesi-ekleri'
                      ),
                      label: 'Sağlık muvafakatnamesi okudum, onaylıyorum',
                    });
                  }}
                >
                Sağlık muvafakatnamesi
                </span>
                &nbsp;okudum, onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            required
            name="kvkk"
            checked={data.kvkk ? true : false}
            label={
              <div>
                <span
                  style={{ color: colorGenerator('blue') }}
                  className="underline-text"
                  onClick={(e) => {
                    setOpenModal(true);
                    setData({ ...data, kvkk: 0 });
                    return setModalConfiguration({
                      name: 'kvkk',
                      text: registerData?.pages?.filter(
                        (f) => f.seo_friendly_url === 'uyelik-sozlesmesi-ekleri'
                      ),
                      label: 'KVKK okudum, onaylıyorum.',
                    });
                  }}
                >
                  KVKK
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            required
            name="permission"
            checked={data.permission ? true : false}
            label={
              <div>
                Açık rıza ve aydınlatma
                <span
                  style={{ color: colorGenerator('blue') }}
                  className="underline-text"
                  onClick={(e) => {
                    setOpenModal(true);
                    setData({ ...data, permission: 0 });
                    return setModalConfiguration({
                      name: 'permission',
                      text: registerData?.pages?.filter(
                        (f) => f.seo_friendly_url === 'uyelik-sozlesmesi-ekleri'
                      ),
                      label: 'Açık rıza aydınlatma metinleri',
                    });
                  }}
                >
                  &nbsp;metinleri
                </span>
              </div>
            }
          />
        </div>
        {!getStepOne.isLoading ? (
          <Button onClick={onSubmit} text={`İleri`} className="blue" />
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
      {modal && <StepTwo setSteps={setSteps} />}
      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        gray
        textAlign="center"
      >
        Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </Text>
      {/* <div className="identfy">
        <span>Veya</span>
      </div> */}
    </>
  );
};

export default StepOne;
