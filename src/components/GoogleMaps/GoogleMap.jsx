import React, { useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getGeocode } from 'use-places-autocomplete';
import { useDebounce } from 'use-debounce';
import SearchBar from 'material-ui-search-bar';
import Geocode from 'react-geocode';

import { GoogleMapsAPI } from '../../utils/config';
import mapStyles from './mapStyles';
import MarkerSvg from './markerSvg.svg';
Geocode.setApiKey(GoogleMapsAPI);

export default function MyComponent({ onPositionChange }) {
  const [position, setPosition] = useState({ lat: 41.015137, lng: 28.97953 });
  const [searchAdress, setSearchAdress] = useState(null);
  const [selectedAdress, setSelectedAdress] = useState({});
  const [debouncedSearchAdress] = useDebounce(searchAdress, 2000);

  const mapContainerStyle = { width: '100%', height: '100%' };
  const mapRef = React.useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (position) {
      console.log(position);
      Geocode.fromLatLng(position.lat, position.lng).then(
        (response) => {
          const address_detail = response.results[0].formatted_address;
          let city, district, town, postalCode;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              // eslint-disable-next-line default-case
              switch (response.results[0].address_components[i].types[j]) {
                case 'administrative_area_level_1':
                  city = response.results[0].address_components[i].long_name;
                  break;
                case 'administrative_area_level_2':
                  district =
                    response.results[0].address_components[i].long_name;
                  break;
                case 'administrative_area_level_4':
                  town = response.results[0].address_components[i].long_name;
                  break;

                case 'postal_code':
                  postalCode =
                    response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          setSelectedAdress({
            city,
            district,
            town,
            postalCode,
            address_detail,
          });
          onPositionChange({
            city,
            district,
            town,
            postalCode,
            address_detail,
            ...position,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [position]);

  useEffect(() => {
    if (!!searchAdress) handleAdressSearch();
  }, [debouncedSearchAdress]);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
    setPosition({ lat, lng });
  }, []);

  const handleAdressSearch = async () => {
    const results = await getGeocode({ address: debouncedSearchAdress });
    const lat = results?.[0]?.geometry?.location?.lat();
    const lng = results?.[0]?.geometry?.location?.lng();
    panTo({ lat, lng });
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapsAPI,
    libraries: ['places'],
  });

  if (loadError) return 'Yüklenme Hatası';
  if (!isLoaded) return 'Yükleniyor';

  return (
    <div className=" mx-auto map-wrapper">
      <SearchBar
        id="search"
        name="search"
        className="search-box"
        value={searchAdress}
        onChange={(value) => setSearchAdress(value)}
        placeholder="Mahalle, Cadde veya Sokak adı ile arayın"
        onCancelSearch={() => setSearchAdress()}
      />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={position}
        options={options}
        onLoad={onMapLoad}
      >
        <InfoWindow position={position}>
          <div>{selectedAdress?.address_detail || ''}</div>
        </InfoWindow>
        <Marker
          draggable
          position={position}
          onDragEnd={async (event) => {
            panTo({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
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
