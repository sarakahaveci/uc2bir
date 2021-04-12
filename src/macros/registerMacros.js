import { Svg } from '../components';

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
    {
      type: 'password',
      required: true,
      name: 'repassword',
      forHtml: 'repassword',
      text: 'Şifreyi Tekrar Giriniz.',
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

export const stepFour = {
  inputs: {
    survey_id: 0,
    question_id: 0,
    answer: 0,
  },
  macro: [],
};
