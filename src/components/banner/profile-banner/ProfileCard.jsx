// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Svg, Spinner } from 'components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Card, { CardInfo } from './Card';
import { Col } from 'react-bootstrap';
import { useFileUpload } from 'use-file-upload';
import FormData from 'form-data';
import axios from 'axios';
import { toast } from 'react-toastify';

import defaultImg from '../../../assets/default-profile.jpg';
import { information } from 'actions';
import { resizeFile } from '../../../utils';

const ProfileCard = ({
  user = false,
  name = null,
  location = null,
  children,
}) => {
  const { t } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const accessToken = auth?.accessToken;
  const [loading, setLoading] = useState(false);

  const [files, selectFiles] = useFileUpload();
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/profile/file`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const createData = new FormData();

  const upload = async () => {
    setLoading(true);
    const resizedFile = await resizeFile(files?.file);
    createData.append('files[]', resizedFile);
    createData.append('type_id', '1');
    axios({ ...config, data: createData })
      .then(function () {
        dispatch(information());
        toast.success(
          t(
            'Your profile picture has been updated. You will be notified when approval is given'
          ),
          {
            position: 'bottom-right',
            autoClose: 2000,
          }
        );
        setLoading(false);
      })
      .catch(function () {
        setLoading(false);

        toast.error(t('The file could not be sent'), {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    if (files?.file) {
      upload();
    }
  }, [files]);

  return (
    <Card img={auth?.user?.photo || defaultImg} user={user}>
      <span className="span background camera">
        {!loading ? (
          <Svg.Camera
            onClick={() => {
              selectFiles(
                { accept: 'image/*' },
                ({ name, size, source, file }) => {
                  return {
                    name,
                    size,
                    source,
                    file,
                  };
                }
              );
            }}
          />
        ) : (
          <Spinner type="static" />
        )}
      </span>

      <NotificationLink
        activeClassName="active-bell"
        to="/myprofile/settings/notifications"
      >
        <Svg.Notification />
      </NotificationLink>
      <Cols>
        <CardInfo name={name} location={location} info={children} />
      </Cols>
    </Card>
  );
};

const Cols = styled(Col)`
  height: auto;
  padding: 15px 30px;
  margin-left: 130px;
`;

const NotificationLink = styled(NavLink)`
  position: absolute;
  right: 60px;
  top: 15px;
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  z-index: 2;

  &.active-bell {
    svg {
      polyline,
      path,
      ellipse,
      line {
        stroke: ${(p) => p.theme.colors.blue};
      }
    }
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

export default ProfileCard;

/*
  * example
  * <ProfileCard
      img={img}
  />

  * <ProfileCard
      img={img}
      name="Efe Parlak"
      location="İstanbul Beşiktaş"
      user
  />
*/
