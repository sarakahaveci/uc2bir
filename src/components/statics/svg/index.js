// @ts-nocheck
import React from 'react';
import { ReactSVG } from 'react-svg';

//import svg
import { ReactComponent as Menu } from './images/menu.svg';
import { ReactComponent as Search } from './images/search.svg';

//import resct svg
import InfoHome from './images/info-home.svg';
import InfoOnline from './images/info-online.svg';
import CencelIcon from './images/cancel-icon.svg';
import InfoSport from './images/info-sport.svg';
import Upload from './images/upload.svg';
import Error from './images/error.svg';
import TickWithBg from './images/tick-with-bg.svg';
import Trash from './images/trash.svg';
import Close from './images/close.svg';
import Username from './images/username.svg';
import Email from './images/email.svg';
import Phone from './images/phone.svg';
import Password from './images/password.svg';
import Eye from './images/eye.svg';
import Info from './images/info.svg';
import Success from './images/success.svg';
import ListItem from './images/list-item.svg';
import ArrowDown from './images/arrow-down.svg';
import ArrowRight from './images/arrow-right.svg';
import ArrowUp from './images/arrow-up.svg';
import Certificate from './images/certificate.svg';
import Comment from './images/comment.svg';
import Heart from './images/heart.svg';
import Player from './images/player.svg';
import Fitness from './images/fitness.svg';
import Yoga from './images/yoga.svg';
import KickBoks from './images/kick-boks.svg';
import AthleticPerformance from './images/athletic-performance.svg';
import Tennis from './images/tennis.svg';
import Swimming from './images/swimming.svg';
import Pilates from './images/pilates.svg';
import Notification from './images/notification.svg';
import Date from './images/date.svg';
import Packet from './images/packet.svg';
import Wallet from './images/wallet.svg';
import CommentBlack from './images/comment-black.svg';
import Closed from './images/closed.svg';
import PtHome from './images/pt-home.svg';
import PtBranch from './images/pt-branch.svg';
import Expert from './images/expert.svg';
import Gallery from './images/gallery.svg';
import Blog from './images/blog.svg';
import TickTick from './images/tick-tick.svg';
import UsersGym from './images/users-gym.svg';
import PeopleGroups from './images/people-groups.svg';
import Monies from './images/monies.svg';
import Hki from './images/hki.svg';
import Camera from './images/camera.svg';
import Edit from './images/edit.svg';
import InputClear from './images/input-clear.svg';
import Warning from './images/warning.svg';
import Pencil from './images/pencil.svg';
import SadFace from './images/sad-face.svg';
import Tick from './images/tick.svg';
import BigClose from './images/big-close.svg';
import ArrowLeft from './images/arrow-left.svg';
import SmileyFace from './images/smiley-face.svg';
import Plus from './images/plus.svg';
import Tl from './images/tl.svg';
import UpDown from './images/up-down.svg';
import Location from './images/location.svg';
import ActiveHeart from './images/active-heart.svg';

import AthleticSportIcon from 'assets/sports-type-icons/atletic.svg';
import FitnessSportIcon from 'assets/sports-type-icons/fitness.svg';
import CimnastikSportIcon from 'assets/sports-type-icons/cimnastik.svg';
import KickBoxSportIcon from 'assets/sports-type-icons/kickbox.svg';
import PilatesSportIcon from 'assets/sports-type-icons/pilates.svg';
import SwimSportIcon from 'assets/sports-type-icons/swim.svg';
import TenisSportIcon from 'assets/sports-type-icons/tenis.svg';
import YogaSportIcon from 'assets/sports-type-icons/yoga.svg';

import SessionTypeGym from './images/session_type/gym.svg';
import SessionTypeOnline from './images/session_type/online.svg';
import SessionTypePark from './images/session_type/park.svg';
import SessionTypeClinic from './images/session_type/clinic.svg';

import WhitePencil from './images/white-pencil.svg';

const Svg = {
  Menu: (props) => <Menu {...props} />,
  Search: (props) => <Search {...props} />,
  InfoHome: (props) => <ReactSVG {...props} src={InfoHome} />,
  InfoOnline: (props) => <ReactSVG {...props} src={InfoOnline} />,
  InfoSport: (props) => <ReactSVG {...props} src={InfoSport} />,
  TrashIcon: (props) => <ReactSVG {...props} src={Trash} />,
  UploadIcon: (props) => <ReactSVG {...props} src={Upload} />,
  TickWithBgIcon: (props) => <ReactSVG {...props} src={TickWithBg} />,
  ErrorIcon: (props) => <ReactSVG {...props} src={Error} />,
  CloseIcon: (props) => <ReactSVG {...props} src={Close} />,
  UsernameIcon: (props) => <ReactSVG {...props} src={Username} />,
  EmailIcon: (props) => <ReactSVG {...props} src={Email} />,
  PhoneIcon: (props) => <ReactSVG {...props} src={Phone} />,
  EyeIcon: (props) => <ReactSVG {...props} src={Eye} />,
  PasswordIcon: (props) => <ReactSVG {...props} src={Password} />,
  InfoIcon: (props) => <ReactSVG {...props} src={Info} />,
  SuccessIcon: (props) => <ReactSVG {...props} src={Success} />,
  ListItemIcon: (props) => <ReactSVG {...props} src={ListItem} />,
  ArrowDownIcon: (props) => <ReactSVG {...props} src={ArrowDown} />,
  ArrowRightIcon: (props) => <ReactSVG {...props} src={ArrowRight} />,
  YogaIcon: (props) => <ReactSVG {...props} src={Yoga} />,
  FitnessIcon: (props) => <ReactSVG {...props} src={Fitness} />,
  PilatesIcon: (props) => <ReactSVG {...props} src={Pilates} />,
  TennisIcon: (props) => <ReactSVG {...props} src={Tennis} />,
  CertificateIcon: (props) => <ReactSVG {...props} src={Certificate} />,
  Comment: (props) => <ReactSVG {...props} src={Comment} />,
  Heart: (props) => <ReactSVG {...props} src={Heart} />,
  Player: (props) => <ReactSVG {...props} src={Player} />,
  Notification: (props) => <ReactSVG {...props} src={Notification} />,
  Date: (props) => <ReactSVG {...props} src={Date} />,
  Packet: (props) => <ReactSVG {...props} src={Packet} />,
  Wallet: (props) => <ReactSVG {...props} src={Wallet} />,
  CommentBlack: (props) => <ReactSVG {...props} src={CommentBlack} />,
  Closed: (props) => <ReactSVG {...props} src={Closed} />,
  PtHome: (props) => <ReactSVG {...props} src={PtHome} />,
  PtBranch: (props) => <ReactSVG {...props} src={PtBranch} />,
  Expert: (props) => <ReactSVG {...props} src={Expert} />,
  Gallery: (props) => <ReactSVG {...props} src={Gallery} />,
  Blog: (props) => <ReactSVG {...props} src={Blog} />,
  TickTick: (props) => <ReactSVG {...props} src={TickTick} />,
  UsersGym: (props) => <ReactSVG {...props} src={UsersGym} />,
  PeopleGroups: (props) => <ReactSVG {...props} src={PeopleGroups} />,
  Monies: (props) => <ReactSVG {...props} src={Monies} />,
  Hki: (props) => <ReactSVG {...props} src={Hki} />,
  ArrowUpIcon: (props) => <ReactSVG {...props} src={ArrowUp} />,
  Camera: (props) => <ReactSVG {...props} src={Camera} />,
  EditIcon: (props) => <ReactSVG {...props} src={Edit} />,
  InputClearIcon: (props) => <ReactSVG {...props} src={InputClear} />,
  WarningIcon: (props) => <ReactSVG {...props} src={Warning} />,
  Pencil: (props) => <ReactSVG {...props} src={Pencil} />,
  TickIcon: (props) => <ReactSVG {...props} src={Tick} />,
  BigClose: (props) => <ReactSVG {...props} src={BigClose} />,
  SadFaceIcon: (props) => <ReactSVG {...props} src={SadFace} />,
  ArrowLeftIcon: (props) => <ReactSVG {...props} src={ArrowLeft} />,
  AthleticSportIcon: (props) => <ReactSVG {...props} src={AthleticSportIcon} />,
  FitnessSportIcon: (props) => <ReactSVG {...props} src={FitnessSportIcon} />,
  CimnastikSportIcon: (props) => (
    <ReactSVG {...props} src={CimnastikSportIcon} />
  ),
  KickBoxSportIcon: (props) => <ReactSVG {...props} src={KickBoxSportIcon} />,
  PilatesSportIcon: (props) => <ReactSVG {...props} src={PilatesSportIcon} />,
  PlusIcon: (props) => <ReactSVG {...props} src={Plus} />,
  SwimSportIcon: (props) => <ReactSVG {...props} src={SwimSportIcon} />,
  TenisSportIcon: (props) => <ReactSVG {...props} src={TenisSportIcon} />,
  YogaSportIcon: (props) => <ReactSVG {...props} src={YogaSportIcon} />,
  SmileyFaceIcon: (props) => <ReactSVG {...props} src={SmileyFace} />,
  Tl: (props) => <ReactSVG {...props} src={Tl} />,
  UpDownIcon: (props) => <ReactSVG {...props} src={UpDown} />,
  LocationIcon: (props) => <ReactSVG {...props} src={Location} />,
  ActiveHeartIcon: (props) => <ReactSVG {...props} src={ActiveHeart} />,
  WhitePencil: (props) => <ReactSVG {...props} src={WhitePencil} />,
  CencelIcon: (props) => <ReactSVG {...props} src={CencelIcon} />,

  SessionType: {
    Gym: (props) => <ReactSVG {...props} src={SessionTypeGym} />,
    Online: (props) => <ReactSVG {...props} src={SessionTypeOnline} />,
    Park: (props) => <ReactSVG {...props} src={SessionTypePark} />,
    Clinic: (props) => <ReactSVG {...props} src={SessionTypeClinic} />,
  },

  Categories: [
    {
      name: 'Fitness',
      svg: (props) => <ReactSVG {...props} src={Fitness} />,
    },
    {
      name: 'Pilates',
      svg: (props) => <ReactSVG {...props} src={Pilates} />,
    },
    {
      name: 'Tenis',
      svg: (props) => <ReactSVG {...props} src={Tennis} />,
    },
    {
      name: 'Yoga',
      svg: (props) => <ReactSVG {...props} src={Yoga} />,
    },
    {
      name: 'Kick Boks',
      svg: (props) => <ReactSVG {...props} src={KickBoks} />,
    },
    {
      name: 'Athletic Performans',
      svg: (props) => <ReactSVG {...props} src={AthleticPerformance} />,
    },
    {
      // Değişecek
      name: 'Cimnastik',
      svg: (props) => <ReactSVG {...props} src={Swimming} />,
    },
  ],
};

export default Svg;
