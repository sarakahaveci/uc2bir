import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useTranslation } from 'react-i18next';

import SaloonSvg from './fitness.svg';
import TrainerSvg from './trainer.svg';
import DietSvg from './diet.svg';
import { useHistory } from 'react-router-dom';
import { GoogleMapsAPI } from 'utils/config';

const center = { lat: 39.925533, lng: 32.866287 };

export default function GoogleMapClusterer({
  data,
  onSelected,
  isSaloonMap,
  disableMinOption = false,
}) {
  const { t } = useTranslation();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMapMin, setIsMapMin] = useState(true && !disableMinOption);
  const mapContainerStyle = { width: '100%', height: '100%' };
  const history = useHistory();
  const options = { maxZoom: 15 };
  useEffect(() => {
    onSelected && onSelected(selectedMarker);
  }, [selectedMarker]); //for selected item callback
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapsAPI,
  });

  const showInfoWindow = (id) => {
    if (id === selectedMarker) setSelectedMarker(null);
    else setSelectedMarker(id);
  };

  if (loadError) return t('Installation Error');
  if (!isLoaded) return t('Loading');

  const wrapperClass = 'mx-auto map-wrapper';
  return (
    <div
      style={{ height: isMapMin ? '25vh' : '55vh', width: '100%' }}
      className={wrapperClass}
    >
      {!disableMinOption && (
        <div className="text-container">
          <span
            className="map-scale"
            onClick={() => {
              setIsMapMin(!isMapMin);
            }}
          >
            {t('themap')}
            {isMapMin ? (
              <span> {t('enlarge')}</span>
            ) : (
              <span>{t('shrink')}</span>
            )}
          </span>
        </div>
      )}
      <GoogleMap
        id="google-map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
      >
        <MarkerClusterer options={options}>
          {(clusterer) =>
            data?.length > 0 &&
            data?.map((prof) => {
              return prof?.addresses?.map((adress) => {
                const lat = +adress?.lat;
                const lng = +adress.lng;
                const addressDetail = adress?.address_detail;
                const id = prof?.id || prof?.user_id;

                return (
                  <>
                    {selectedMarker === adress?.id && (
                      <InfoWindow
                        position={{
                          lat: +lat,
                          lng: +lng,
                        }}
                      >
                        <InfoContainer
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            history.push('/user/' + id);
                          }}
                        >
                          <BoldText>{prof?.name || prof?.title}</BoldText>
                          <DetailText>{addressDetail}</DetailText>
                        </InfoContainer>
                      </InfoWindow>
                    )}

                    {isSaloonMap ? (
                      <Marker
                        onClick={() => showInfoWindow(adress?.id)}
                        key={prof?.id}
                        position={{
                          lat: +lat,
                          lng: +lng,
                        }}
                        clusterer={clusterer}
                        icon={{
                          url: SaloonSvg,
                          origin: new window.google.maps.Point(0, 0),
                          anchor: new window.google.maps.Point(35, 20),
                          scaledSize: new window.google.maps.Size(70, 60),
                          borderRadius: new window.google.maps.Point(45, 70),
                        }}
                      />
                    ) : (
                      <Marker
                        onClick={() => showInfoWindow(adress?.id)}
                        key={prof?.id}
                        position={{
                          lat: +lat,
                          lng: +lng,
                        }}
                        clusterer={clusterer}
                        icon={{
                          url:
                            prof?.type == 'pt'
                              ? TrainerSvg
                              : prof?.type == 'dt'
                              ? DietSvg
                              : prof?.type == 'gym'
                              ? SaloonSvg
                              : null,
                          origin: new window.google.maps.Point(0, 0),
                          anchor: new window.google.maps.Point(35, 20),
                          scaledSize: new window.google.maps.Size(70, 60),
                        }}
                      />
                    )}

                    {/* <Marker
                      onClick={() => showInfoWindow(id)}
                      key={professional?.id}
                      position={{
                        lat: +lat,
                        lng: +lng,
                      }}
                      clusterer={clusterer}
                      icon={
                        isSaloonMap
                          ? {
                            url: SaloonSvg,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(35, 20),
                            scaledSize: new window.google.maps.Size(70, 60),
                          }
                          : professional?.photo
                            ? {
                              url: professional?.photo,
                              origin: new window.google.maps.Point(0, 0),
                              anchor: new window.google.maps.Point(35, 20),
                              scaledSize: new window.google.maps.Size(70, 60),
                            }
                            : {
                              url: MarkerSvg,
                              origin: new window.google.maps.Point(0, 0),
                              anchor: new window.google.maps.Point(35, 20),
                              scaledSize: new window.google.maps.Size(70, 60),
                            }
                      }
                    /> */}
                  </>
                );
              });
            })
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailText = styled.text`
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
