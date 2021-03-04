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
Geocode.setRegion('tr');
Geocode.setLanguage('tr');

export default function MyComponent({
  onPositionChange = () => {},
  showSearchBox,
  draggable,
  disabled = false,
  locationFromUser,
}) {
  const [position, setPosition] = useState({ lat: 41.015137, lng: 28.97953 });
  const [searchAdress, setSearchAdress] = useState('');
  const [selectedAdress, setSelectedAdress] = useState({});
  const [debouncedSearchAdress] = useDebounce(searchAdress, 2000);

  const mapContainerStyle = { width: '100%', height: '100%' };
  const mapRef = React.useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        if (!locationFromUser) {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (locationFromUser) setPosition(locationFromUser);
  }, [locationFromUser]);

  useEffect(() => {
    if (position) {
      Geocode.fromLatLng(position.lat, position.lng).then(
        (response) => {
          const address_detail = response.results[0].formatted_address?.split(
            '/'
          )?.[0];

          let city, district, town;

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
              }
            }
          }
          setSelectedAdress({
            city,
            district,
            town,
            address_detail,
          });
          onPositionChange({
            city,
            district,
            town,
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
    mapRef.current.setZoom(16);
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
    draggable: !disabled,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapsAPI,
    libraries: ['places'],
  });

  if (loadError) return 'Yüklenme Hatası';
  if (!isLoaded) return 'Yükleniyor';

  const wrapperClass = showSearchBox
    ? 'mx-auto map-wrapper'
    : 'mx-auto medium-map-wrapper';

  return (
    <div className={wrapperClass}>
      {showSearchBox && (
        <SearchBar
          id="search"
          name="search"
          className="search-box"
          value={searchAdress}
          onChange={(value) => setSearchAdress(value)}
          placeholder="Mahalle, Cadde veya Sokak adı ile arayın"
          onCancelSearch={() => setSearchAdress()}
        />
      )}

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
          draggable={draggable}
          position={position ?? { lat: 41.015137, lng: 28.97953 }}
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
