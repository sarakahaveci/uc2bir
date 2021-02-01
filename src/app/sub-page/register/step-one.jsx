// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material } from '../../../components/inputs/material';
import Button from '../../../components/buttons/button';
import { toast } from 'react-toastify';

import { macro } from '../../../redux/reducers/register-step-1/initial';
import { inputs } from '../../../redux/reducers/register-step-1/initial';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register_step_one } from '../../../redux/reducers/register-step-1';
import { verifty_create } from '../../../redux/reducers/verifty';

import FormData from 'form-data';
import { login } from '../../../redux/reducers/login';

import Text from '../../../components/typography/Text';

import { Link } from 'gatsby';
import AwesomeIcon from '../../../statics/icon';
import env from '../../../env';

const StepOne = (props) => {
  const [isload, setIsLoad] = useState(false);
  const {
    register_step_one,
    registerStepOne,
    setSteps,
    login,
    verifty,
    verifty_create,
  } = props;
  const [data, setData] = useState({ ...inputs });
  const Fdata = new FormData();
  const Ldata = new FormData();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoad(true);

    for (const [key, val] of Object.entries(data)) {
      Fdata.append(key, val);
    }

    Ldata.append('email', data.email);
    Ldata.append('password', data.password);

    const result = await register_step_one(Fdata);
    if (result.type === 'FETCH_ERROR') {
      //kayıt var step yok
      const lgn = await login(Ldata);
      if (lgn.type === 'FETCH_SUCCESS') {
        if (
          lgn.payload.token &&
          lgn.payload.refresh_token &&
          lgn.payload.user
        ) {
          sessionStorage.setItem('token', lgn.payload.token);
          sessionStorage.setItem('refresh_token', lgn.payload.token);
          sessionStorage.setItem('user_id', lgn.payload.user.id);

          env.token = lgn.payload.token;
          env.refresh_token = lgn.payload.refresh_token;
          env.user = lgn.payload.user.id;

          return setSteps('step2');
        }
      } else {
        toast.error(result.payload, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      //kayıt yok
      if (
        result.payload.token &&
        result.payload.refresh_token &&
        result.payload.user
      ) {
        sessionStorage.setItem('token', result.payload.token);
        sessionStorage.setItem('refresh_token', result.payload.token);
        sessionStorage.setItem('user_id', result.payload.user.id);

        env.token = result.payload.token;
        env.refresh_token = result.payload.refresh_token;
        env.user = result.payload.user.id;

        new Promise(async (resolve, reject) => {
          const _verifty_create = await verifty_create({
            email: data.email,
            phone: data.phone,
            user_token: result.payload.token,
          });
          if (_verifty_create.type === 'FETCH_CREATE_VERIFTY')
            return resolve('Mesaj için kayıt işlemi başarılı');
          else return reject('Mesaj için kayıt işlemi başarısız');
        })
          .then(() =>
            setTimeout(() => {
              toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 1000)
          )
          .then(() => setTimeout(() => setSteps('step2'), 2050))
          .then(() => setIsLoad(false))
          .catch((err) =>
            toast.error(err, {
              position: 'bottom-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          )
          .catch(() => setIsLoad(false));
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro.map((val, key) => {
          return (
            <div style={{ width: '100%' }} key={key}>
              {(val.type === 'text' ||
                val.type === 'email' ||
                val.type === 'password' ||
                val.type === 'date') &&
                Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  icon: val.icon,
                })}
            </div>
          );
        })}
        <div style={{ width: '100%' }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`radio-${key}`}>
                {val.type === 'radio' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    type: val.type,
                    label: val.text,
                    required: val.required,
                    onChange: (e) =>
                      setData({ ...data, [e.target.name]: e.target.value }),
                    autoComplete: 'off',
                    items: val.items ? val.items : [],
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%' }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`select-${key}`}>
                {val.type === 'select' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    type: val.type,
                    label: val.text,
                    required: val.required,
                    onChange: (e) =>
                      setData({ ...data, [e.target.name]: e.target.value }),
                    autoComplete: 'off',
                    icon: val.icon,
                    items: val.items ? val.items : [],
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%', marginBottom: 25, marginTop: 40 }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`check-${key}`}>
                {val.type === 'checkbox' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    required: val.required,
                    type: val.type,
                    label: val.text,
                    onChange: (e) =>
                      setData({
                        ...data,
                        [val.name]: e.target.checked ? 1 : 0,
                      }),
                    checked: data[val.name] ? true : false,
                  })}
              </div>
            );
          })}
        </div>
        {(!registerStepOne.loading && !verifty_create.loading) || !isload ? (
          <Button type="submit" text={`İleri`} blue />
        ) : (
          <Button
            onClick={async () => {
              console.log('Lütfen Bekleyiniz...');
            }}
            text={`Yükleniyor...`}
            blue
          />
        )}
      </form>
      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        gray
        textAlign="center"
      >
        Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </Text>
      <div className="identfy">
        <span>Veya</span>
      </div>
      <div className="d-flex login-footer-start">
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Google}
            text="Google ile giriş yap"
            customClass="dark"
          />
        </div>
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Facebook}
            text="Facebook ile giriş yap"
            customClass="dark"
          />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(
      { register_step_one, login, verifty_create },
      dispatch
    ),
  };
};

const mapStateToProps = ({ registerStepOne, verifty }) => ({
  registerStepOne,
  verifty,
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
