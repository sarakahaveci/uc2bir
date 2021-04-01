import React, { useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api';

import MarkerSvg from './markerSvg.svg';
import { GoogleMapsAPI } from 'utils/config';

const center = { lat: 39.925533, lng: 32.866287 };

export default function GoogleMapClusterer({ data }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapContainerStyle = { width: '100%', height: '100%' };

  const options = {};

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
            data?.map((gym) => (
              <>
                {selectedMarker === gym.id && (
                  <InfoWindow
                    position={{ lat: +gym.address.lat, lng: +gym.address.lng }}
                  >
                    <div>{gym?.address?.address_detail || ''}</div>
                  </InfoWindow>
                )}

                <Marker
                  onClick={() => showInfoWindow(gym?.id)}
                  key={gym.id}
                  position={{ lat: +gym.address.lat, lng: +gym.address.lng }}
                  clusterer={clusterer}
                  icon={
                    gym?.photo
                      ? {
                          url: gym?.photo,
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
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
}
