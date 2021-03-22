/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Material, Button } from 'components';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { sendTicket } from 'actions';
import InstagramIcon from 'assets/instagram.svg';
import FacebookIcon from 'assets/facebook.svg';
import LinkedinIcon from 'assets/linkedin.svg';
import TwitterIcon from 'assets/twitter.svg';

export default function Contact() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      sendTicket(
        formData,
        () =>
          toast.success('Mesajınız başarı ile iletildi', {
            position: 'bottom-right',
            autoClose: 7000,
          }),
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
        <p className="contact-header__title">Bizimle İletişime</p>
        <p className="contact-header__subtitle">GEÇİN</p>
      </div>
      <div className="d-flex w-25 mx-auto contact-header__social-icons-wrapper">
        <img src={FacebookIcon} alt="facebook" />
        <img src={TwitterIcon} alt="twitter" />
        <img src={LinkedinIcon} alt="linkedin" />
        <img src={InstagramIcon} alt="instagram" />
      </div>
      <div className="d-flex row w-100 mt-5">
        <div className="col-md-4 p-5">
          <div className="mb-3 w-50 ml-auto">
            <span className="contact-header__contact-title">Adres</span>
            <p className="contact-header__contact-subtitle">
              3. Levent mah. Şakayıklı sok. No:4 34330 Beşiktaş,İST
            </p>
          </div>
          <div className="w-50 ml-auto">
            <span className="contact-header__contact-title">İletişim</span>
            <p className="contact-header__contact-subtitle">info@uc2bir.com</p>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 contact-header__map-wrapper">
          <GoogleMap
            locationFromUser={{ lat: 41.084423, lng: 29.014613 }}
            disabled
          />
        </div>
      </div>
      <div className="d-flex w-100 flex-column mt-5">
        <span className="contact-header__contact-title">
          Bize Mesaj Birakın
        </span>
        <form className="d-flex row w-100" onSubmit={submitForm}>
          {!isAuthenticated ? (
            <>
              <div className="col-md-6 col-sm-12">
                <Material.TextField
                  required
                  label="Adi Soyadi"
                  type="text"
                  name="name_surname"
                  onChange={handleFormOnChange}
                />
                <Material.TextField
                  required
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleFormOnChange}
                />
                <Material.TextField
                  required
                  label="Telefon"
                  type="number"
                  name="phone"
                  onChange={handleFormOnChange}
                />
                <Material.TextField
                  required
                  label="Konu Başlığı"
                  type="text"
                  name="subject"
                  onChange={handleFormOnChange}
                />
              </div>
              <div className="d-flex  flex-column col-md-6 col-sm-12 mt-2">
                <Material.TexAreaField
                  name="message"
                  label="Mesajiniz"
                  rows={8}
                  onChange={handleFormOnChange}
                  required
                  inputProps={{ minLength: 50, maxLength: 200 }}
                />
                <Button
                  type="submit"
                  className="blue mt-3 ml-auto contact-header__save-button"
                  text="Gönder"
                  fontWeight="500"
                />
              </div>
            </>
          ) : (
            <div className="d-flex  flex-column col-12 mt-2">
              <Material.TextField
                required
                label="Konu Başlığı"
                type="text"
                name="subject"
                onChange={handleFormOnChange}
              />
              <Material.TexAreaField
                name="message"
                label="Mesajiniz"
                rows={8}
                onChange={handleFormOnChange}
                required
                inputProps={{ minLength: 50, maxLength: 200 }}
              />
              <Button
                type="submit"
                className="blue w-50 mt-3 mx-auto contact-header__save-button"
                text="Gönder"
                fontWeight="500"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}