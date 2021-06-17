/* eslint-disable react/display-name */
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { default as NativeBanner } from '../../components/sliders/Banner';
import SearchBar from '../../components/sliders/SearchBar';
import GoogleApp from 'components/GoogleMaps';
import { SET_SEARCH_PROFESSIONAL_TYPE } from 'constants/actionTypes';
//bunları şimdilik ekliyoruz
import s2 from '../../assets/banner/download.jpg';
import s3 from '../../assets/banner/dw2.jpg';
import s4 from '../../assets/blog/image-1.png';

import vid from '../../assets/girisvideo1920x660.mp4';
const Banner = () => {
  const dispatch = useDispatch();
  const [virtual, setVirtual] = useState('pt');
  const handleChangeVirtual = (value) => {
    dispatch({ type: SET_SEARCH_PROFESSIONAL_TYPE, payload: value });
    setVirtual(value);
    //dispatch(searchGymForPt()); //DEĞİŞECEK
  };
  const { data } = useSelector(
    (state) => state.profileSettings2.sessionType.searchGym
  );

  useLayoutEffect(() => {
    const player = document.getElementById('vd-io');
    if (player) {
      player.controls = false;
      player.playsinline = true;
      player.muted = true;
      player.setAttribute('muted', ''); // leave no stones unturned :)
      player.autoplay = true;
    }
  });
  const virtuals = {
    pt: {
      className: '',
      text: 'Eğitmen Ara',
      component: () => {
        return (
          <>
            <div
              className="video"
              style={
                {
                  /*backgroundImage: `url(${s1})`*/
                }
              }
            >
              <video id="vd-io" autoPlay loop>
                <source src={vid} type="video/mp4" />
              </video>
            </div>
          </>
        );
      },
    },
    gym: {
      className: '',
      text: 'Salon Ara',
      component: () => {
        return (
          <>
            <div
              className="img"
              style={{ backgroundImage: `url(${s2})` }}
            ></div>
          </>
        );
      },
    },
    dt: {
      className: '',
      text: 'Diyetisyen Ara',
      component: () => {
        return (
          <>
            <div
              className="img"
              style={{ backgroundImage: `url(${s3})` }}
            ></div>
          </>
        );
      },
    },
    map: {
      className: 'have-map',
      text: 'Konum Ara',
      component: () => {
        return (
          <div className="img">
            <GoogleApp disableMinOption data={data} />
          </div>
        );
      },
    },
    packets: {
      className: '',
      text: 'Paket Ara',
      component: () => {
        return (
          <div className="img" style={{ backgroundImage: `url(${s2})` }}></div>
        );
      },
    },
    'group-lessons': {
      className: '',
      text: 'Grup Ders Ara',
      component: () => {
        return (
          <div className="img" style={{ backgroundImage: `url(${s4})` }}></div>
        );
      },
    },
  };

  const slider_settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    lazyLoad: true,
  };

  const search_bar = {
    status: true,
    className: 'search-bar',
    element: () => (
      <SearchBar
        className={search_bar.className}
        virtual={virtual}
        setVirtual={handleChangeVirtual}
        virtuals={virtuals}
      />
    ),
  };

  return (
    <NativeBanner
      settings={slider_settings}
      searchBar={search_bar}
      virtuals={virtuals}
      virtual={virtual}
    />
  );
};

export default Banner;
