import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api';
import styled from 'styled-components/macro';

import MarkerSvg from './markerSvg.svg';
import { GoogleMapsAPI } from 'utils/config';

const center = { lat: 39.925533, lng: 32.866287 };

export default function GoogleMapClusterer({ data, onSelected }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapContainerStyle = { width: '100%', height: '100%' };

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

  if (loadError) return 'Yüklenme Hatası';
  if (!isLoaded) return 'Yükleniyor';

  const wrapperClass = 'mx-auto map-wrapper';
  return (
    <div className={wrapperClass}>
      <GoogleMap
        id="google-map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
      >
        <MarkerClusterer options={options}>
          {(clusterer) =>
            data?.map((professional) => {
              const lat = +professional?.address?.lat || professional?.lat;
              const lng = +professional?.address?.lng || professional?.lng;
              const addressDetail =
                professional?.address?.address_detail ||
                professional?.address_detail;
              const id = professional?.id || professional?.user_id;

              return (
                <>
                  {selectedMarker === id && (
                    <InfoWindow
                      position={{
                        lat: +lat,
                        lng: +lng,
                      }}
                    >
                      <InfoContainer>
                        <BoldText>{professional?.title}</BoldText>
                        <DetailText>{addressDetail}</DetailText>
                      </InfoContainer>
                    </InfoWindow>
                  )}

                  <Marker
                    onClick={() => showInfoWindow(id)}
                    key={professional?.id}
                    position={{
                      lat: +lat,
                      lng: +lng,
                    }}
                    clusterer={clusterer}
                    icon={
                      professional?.photo
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
                  />
                </>
              );
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
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
