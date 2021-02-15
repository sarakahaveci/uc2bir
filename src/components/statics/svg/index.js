// @ts-nocheck
import React from 'react';
import { ReactSVG } from 'react-svg';

//import svg
import { ReactComponent as Menu } from './images/menu.svg';
import { ReactComponent as Search } from './images/search.svg';

//import resct svg
import InfoHome from './images/info-home.svg';
import InfoOnline from './images/info-online.svg';
import InfoSport from './images/info-sport.svg';
import Upload from './images/upload.svg';
import Error from './images/error.svg';
import Tick from './images/tick.svg';
import Trash from './images/trash.svg';
import Close from './images/close.svg';
import Username from './images/username.svg';
import Email from './images/email.svg';
import Phone from './images/phone.svg';
import Password from './images/password.svg';
import Eye from './images/eye.svg';
import Info from './images/info.svg';
import Success from './images/success.svg';

//categories
import I1 from './images/pt.svg';
import I2 from './images/fitness.svg';
import I3 from './images/tennis.svg';
import I4 from './images/yoga.svg';
import I5 from './images/kick-boks.svg';
import I6 from './images/athletic-performance.svg';
import I7 from './images/swimming.svg';

const Svg = {
  Menu: (props) => <Menu {...props} />,
  Search: (props) => <Search {...props} />,
  InfoHome: (props) => <ReactSVG {...props} src={InfoHome} />,
  InfoOnline: (props) => <ReactSVG {...props} src={InfoOnline} />,
  InfoSport: (props) => <ReactSVG {...props} src={InfoSport} />,
  TrashIcon: (props) => <ReactSVG {...props} src={Trash} />,
  UploadIcon: (props) => <ReactSVG {...props} src={Upload} />,
  TickIcon: (props) => <ReactSVG {...props} src={Tick} />,
  ErrorIcon: (props) => <ReactSVG {...props} src={Error} />,
  CloseIcon: (props) => <ReactSVG {...props} src={Close} />,
  UsernameIcon: (props) => <ReactSVG {...props} src={Username} />,
  EmailIcon: (props) => <ReactSVG {...props} src={Email} />,
  PhoneIcon: (props) => <ReactSVG {...props} src={Phone} />,
  EyeIcon: (props) => <ReactSVG {...props} src={Eye} />,
  PasswordIcon: (props) => <ReactSVG {...props} src={Password} />,
  InfoIcon: (props) => <ReactSVG {...props} src={Info} />,
  SuccessIcon: (props) => <ReactSVG {...props} src={Success} />,

  Categories: [
    {
      name: 'Fitness',
      svg: (props) => <ReactSVG {...props} src={I1} />,
    },
    {
      name: 'Pilates',
      svg: (props) => <ReactSVG {...props} src={I2} />,
    },
    {
      name: 'Tenis',
      svg: (props) => <ReactSVG {...props} src={I3} />,
    },
    {
      name: 'Yoga',
      svg: (props) => <ReactSVG {...props} src={I4} />,
    },
    {
      name: 'Kick Boks',
      svg: (props) => <ReactSVG {...props} src={I5} />,
    },
    {
      name: 'Athletic Performans',
      svg: (props) => <ReactSVG {...props} src={I6} />,
    },
    {
      name: 'Cimnastik',
      svg: (props) => <ReactSVG {...props} src={I7} />,
    },
  ],
};

export default Svg;
