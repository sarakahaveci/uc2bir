/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Material, Button } from 'components';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { sendTicket } from 'actions';
import InstagramIcon from 'assets/instagram.svg';
import FacebookIcon from 'assets/facebook.svg';
import LinkedinIcon from 'assets/linkedin.svg';
import TwitterIcon from 'assets/twitter.svg';

export default function Contact() {
  const { t } = useTranslation();

  const [shrink, setShrink] = useState(false);

  const [name_surname, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { infoData } = useSelector((state) => state.footer);
  const dispatch = useDispatch();

  // const [formData, setFormData] = useState({});

  const Cordinate = infoData?.coordinates?.split(',');

  const phoneNumberNormalize = (phoneNumber) => {
    let normalizedNumber = phoneNumber.replace(/[- )(]/g, '');
    return normalizedNumber;
  };

  // const handleFormOnChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //     phone: phoneNumberNormalize(phone),
  //   });
  // };

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      sendTicket(
        {
          name_surname,
          subject,
          message,
          email,
          phone: phoneNumberNormalize(phone),
        },
        () => {
          toast.success(t('Your message has been successfully delivered'), {
            position: 'bottom-right',
            autoClose: 7000,
          });
          history.push('/');
        },

        (message) =>
          toast.error(message, {
            position: 'bottom-right',
            autoClose: 7000,
          })
      )
    );
  };

  return (
    <div className="d-flex w-100 flex-column contact-header">
      <div className="d-flex w-75 flex-column mx-auto contact-header__title-wrapper">
        <p className="contact-header__title"> {t('contactUs')}</p>
        <p className="contact-header__subtitle"> {t('contactUs2')}</p>
      </div>
      <div className="d-flex w-25 mx-auto contact-header__social-icons-wrapper">
        <img src={FacebookIcon} alt="facebook" />
        <img src={TwitterIcon} alt="twitter" />
        <img src={LinkedinIcon} alt="linkedin" />
        <img src={InstagramIcon} alt="instagram" />
      </div>
      <div className="d-flex row w-100 mt-5">
        {/* <div className="col-md-4 p-5"> */}
        {/* <div className="mb-3 w-50 ml-auto">
            <span className="contact-header__contact-title">Adres</span>
            <p className="contact-header__contact-subtitle">
              {infoData?.address}
            </p>
          </div> */}
        {/* <div className="w-50 mb-3 ml-auto">
            <span className="contact-header__contact-title">İletişim</span>
            <p className="contact-header__contact-subtitle">
              {infoData?.email}
            </p>
            <p className="contact-header__contact-subtitle">
              {infoData?.phone}
            </p>
          </div> */}
        {/* <div className="w-50 ml-auto">
            <span className="contact-header__contact-title">
              Telefon Numarası
            </span>
            <p className="contact-header__contact-subtitle">
              {infoData?.phone}
            </p>
          </div> */}
        {/* </div> */}
        <div className="col-md-12 col-sm-12 contact-header__map-wrapper">
          <GoogleMap
            locationFromUser={{
              lat: +Cordinate?.[0],
              lng: +Cordinate?.[1],
            }}
            disabled
          />
        </div>
      </div>
      <div className="d-flex w-100 flex-column mt-5">
        <span className="contact-header__contact-title">
          {t('Leave us a Message')}
        </span>
        <form className="d-flex row w-100" onSubmit={submitForm}>
          {!isAuthenticated ? (
            <>
              <div className="col-md-6 col-sm-12">
                <Material.TextField
                  required
                  label={t('Name and surname')}
                  type="text"
                  name="name_surname"
                  onBlur={(e) => setName(e.target.value)}
                />
                <Material.TextField
                  required
                  label="Email"
                  type="email"
                  name="email"
                  onBlur={(e) => setEmail(e.target.value)}
                />
                <div className="materials" style={{ padding_left: '0px' }}>
                  <InputMask
                    required
                    mask="\0(999) 999 99 99"
                    disabled={false}
                    alwaysShowMask={false}
                    maskChar=" "
                    onFocus={() => setShrink(true)}
                    onBlur={(e) => {
                      setPhone(e.target.value);
                      phone !== '\0(   )          '
                        ? setShrink(true)
                        : setShrink(false);
                    }}
                  >
                    {() => (
                      <TextField
                        InputLabelProps={{ shrink }}
                        label={t('Phone')}
                        className="material-inputs"
                      />
                    )}
                  </InputMask>
                </div>

                <Material.TextField
                  required
                  label={t('Topic title')}
                  type="text"
                  name="subject"
                  defaultValue={subject}
                  onBlur={(e) => setSubject(e.target.value)}
                  inputProps={{ minLength: 5 }}
                />
              </div>
              <div className="d-flex  flex-column col-md-6 col-sm-12 mt-2">
                <Material.TexAreaField
                  name="message"
                  label={t('Your Message')}
                  rows={8}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  inputProps={{ minLength: 10, maxLength: 2500 }}
                />
                <Button
                  type="submit"
                  className="blue mt-3 ml-auto contact-header__save-button"
                  text={t('send')}
                  fontWeight="500"
                />
              </div>
            </>
          ) : (
            <div className="d-flex  flex-column col-12 mt-2">
              <Material.TextField
                required
                label={t('Topic title')}
                type="text"
                name="subject"
                defaultValue={subject}
                onBlur={(e) => setSubject(e.target.value)}
                inputProps={{ minLength: 5 }}
              />
              <Material.TexAreaField
                name="message"
                label={t('Your Message')}
                onChange={(e) => setMessage(e.target.value)}
                required
                inputProps={{ minLength: 10, maxLength: 2500 }}
              />
              <Button
                type="submit"
                className="blue w-50 mt-3 mx-auto contact-header__save-button"
                text={t('send')}
                fontWeight="500"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
