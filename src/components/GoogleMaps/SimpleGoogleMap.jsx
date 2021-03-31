import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { GoogleMapsAPI } from '../../utils/config';
import mapStyles from './mapStyles';
import MarkerSvg from './markerSvg.svg';

export default function SimpleGoogleMap({ location }) {
  const [position, setPosition] = useState({ lat: 41.015137, lng: 28.97953 });

  const mapContainerStyle = {
    width: 'auto',
    height: '30vh',
    borderRadius: '25px',
  };

  const onMapLoad = useCallback(() => {
    setPosition(location);
  }, []);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapsAPI,
  });

  if (loadError) return 'Yüklenme Hatası';
  if (!isLoaded) return 'Yükleniyor';

  return (
    <div className="mx-auto w-100">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={position}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker
          position={position}
          icon={{
            url: MarkerSvg,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(35, 20),
            scaledSize: new window.google.maps.Size(70, 60),
          }}
        />
      </GoogleMap>
    </div>
  );
}
