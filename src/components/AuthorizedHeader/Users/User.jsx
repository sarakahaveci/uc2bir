import React from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/default-profile.jpg'
import { useTranslation } from 'react-i18next'
const User = ({ user_name, user_img = null, logoutHandler }) => {
  const { t } = useTranslation();
  /*const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );*/
  const { message_count, notification_count } = useSelector(
    (state) => state.profileSettings2.notifications
  );

  /*const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(allRooms?.filter((value) => value.unread_messages === 1).length);
  }, [allRooms]);*/
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      // It will be updated
      link: TABS.profilePath,
      pulse: true,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      link: TABS.reservationsPath,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.packetsPath,
    },
    {
      name: 'Hesap Hareketleri',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    },
    {
      name: 'Çıkış Yap',
      icon: <Svg.Closed />,
      onClick: logoutHandler,
    },
  ];

  const list = [
    {
      name: t('notifications'),
      icon: <Svg.Notification />,
      notify: notification_count,
      pulse: true,
      linkPath: TABS.notificationPath,
    },
    {
      name: t('messages'),
      icon: <Svg.CommentBlack />,
      notify: message_count,
      pulse: true,
      linkPath: TABS.messagePath,
    },
    {
      name: t('favorites'),
      icon: <Svg.Heart />,
      notify: [],
      linkPath: TABS.favoritesPath,
    },
    {
      name: user_name,
      icon: user_img ? <img style={{ objectFit: 'cover' }} src={user_img} /> : <img style={{ objectFit: 'cover' }} src={defaultImage} />,
      menu: userDependentMenu,
      pulse: true,
      isUserMenu: true

    },
  ];

  return (
    <>
      {list.map((val, key) => {
        return (
          <List
            key={key}
            className="header-login"
            dropDown={val.menu || val.notify}
            linkPath={val?.linkPath}
          >
            <Item isUserMenu={val?.isUserMenu} icon={val.icon} text={val.name} notify={val.notify} />
          </List>
        );
      })}

    </>
  );
};


export default User;
