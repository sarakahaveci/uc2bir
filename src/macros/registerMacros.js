import React from 'react';
import { AwesomeIcon, Svg } from '../components';
import { genderData } from '../constants/formData';

export const stepOne = {
  inputs: {
    name: '',
    email: '',
    phone: '',
    password: '',
  },
  macro: [
    {
      type: 'text',
      required: true,
      name: 'name',
      forHtml: 'name',
      text: 'Ad Soyad',
      icon: Svg.UsernameIcon,
    },
    {
      type: 'email',
      required: true,
      name: 'email',
      forHtml: 'email',
      text: 'E-mail',
      icon: Svg.EmailIcon,
    },
    {
      type: 'phone',
      required: true,
      name: 'phone',
      forHtml: 'phone',
      text: 'Telefon (05XXXXXXXXX)',
      icon: Svg.PhoneIcon,
    },
    {
      type: 'password',
      required: true,
      name: 'password',
      forHtml: 'password',
      text: 'Şifre',
      icon: Svg.PasswordIcon,
      password: Svg.EyeIcon,
    },
  ],
};

export const stepTwo = {
  inputs: {
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
  },
};

export const stepThree = {
  inputs: {
    birthday: '',
    genre: '',
    /*about: "",
		city: "",
		town: "",
		district: "",
		address_detail: "",
		build_no: "",
		apt_no: "",
		lat: "",
		lng: "",*/
  },
  uri: `${process.env.REACT_APP_API_URL}/regions`,
  macro: [
    {
      type: 'materialdate',
      required: true,
      name: 'birthday',
      forHtml: 'birthday',
      text: 'Doğum Tarihi',
      minDate: '01.01.1945',
      maxDate: '01.01.2014',
    },
    {
      type: 'select',
      required: true,
      name: 'genre',
      forHtml: 'genre',
      text: 'Cinsiyet',
      icon: AwesomeIcon.Gender,
      items: [...genderData],
    },
    /*{
			type: "text",
			required: false,
			name: "about",
			forHtml: "about",
			text: "Hakkında",
			icon: AwesomeIcon.AddressCard
		},*/
  ],
};

export const stepFour = {
  inputs: {
    survey_id: 0,
    question_id: 0,
    answer: 0,
  },
  macro: [],
};
