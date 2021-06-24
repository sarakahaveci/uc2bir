// @ts-nocheck
import React, { useEffect, useState } from 'react';

import styled from 'styled-components/macro';
import { Svg, Spinner } from 'components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { useFileUpload } from 'use-file-upload';
import FormData from 'form-data';
import axios from 'axios';
import { toast } from 'react-toastify';

import defaultImg from '../../../assets/default-profile.jpg';
import { information } from 'actions';
import { resizeFile } from '../../../utils';

const CircleProfileCard = ({
}) => {
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
                    'Profil resminiz güncellendi. Onay verildiğinde size bildirim gelecektir.',
                    {
                        position: 'bottom-right',
                        autoClose: 2000,
                    }
                );
                setLoading(false);
            })
            .catch(function () {
                setLoading(false);

                toast.error('Dosya gönderilemedi.', {
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
        <CircleImage img={auth?.user?.photo || defaultImg} >
            <CameraContainer style={{position:'absolute',bottom:'20px',background:'white',padding:'5px',borderRadius:'5px',right:'-5px'}} className="span background camera">
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
            </CameraContainer>

            <NotificationLink
                activeClassName="active-bell"
                to="/myprofile/settings/notifications"
            >
                <Svg.Notification />
            </NotificationLink>

        </CircleImage>
    );
};



const CircleImage = styled.div`
width:160px;
height:160px;
border-radius:100%;
background-image: url('${(props) => props.img}');
background-repeat: no-repeat;
background-size: cover;
position:relative;
`
const CameraContainer = styled.span`
cursor:pointer;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const NotificationLink = styled(NavLink)`
  position: absolute;
  right: -5px;
  top: 15px;
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

export default CircleProfileCard;

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
