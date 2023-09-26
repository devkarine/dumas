import { Container } from './styled';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { Chef } from '../../types/Chef';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import { getLocationWithIPAddress } from '../../service/api/location';

interface NearDishesMapProps {
  chefs: Chef[];
}

const apikey = import.meta.env.VITE_MAPS_API_KEY;
const darkMapId = import.meta.env.VITE_DARK_MAP_ID;
const lightMapId = import.meta.env.VITE_LIGHT_MAP_ID;

const containerStyle = {
  width: '100%',
  height: '300px'
};

export const NearDishesMap = ({ chefs }: NearDishesMapProps) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const { user } = useAuth();

  useEffect(() => {
    const getLocation = async () => {
      const data = await getLocationWithIPAddress();
      if (data) {
        setCenter({ lat: Number(data.lat), lng: Number(data.lng) });
      }
    };
    if (
      user?.addresses?.length &&
      user?.addresses[0].latitude &&
      user?.addresses[0].longitude
    ) {
      setCenter({
        lat: user?.addresses[0].latitude,
        lng: user?.addresses[0].longitude
      });
    } else {
      getLocation();
    }
  }, []);

  const { theme } = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapId = theme === 'dark' ? darkMapId : lightMapId;
  const markerPath =
    theme === 'light' ? '/images/marker_red.svg' : '/images/marker.svg';

  const userMarkerPath =
    theme === 'light'
      ? '/images/user_marker_red.svg'
      : '/images/user_marker.svg';

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.setZoom(10);
    map.setOptions({ mapId: mapId });

    setMap(map);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    libraries: ['geometry']
  });

  return (
    <Container>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{ disableDefaultUI: true }}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF
            key={'marker_user'}
            position={center}
            icon={{
              url: window.location.origin + userMarkerPath,
              labelOrigin: new google.maps.Point(25, -12)
            }}
            label={{
              text: user?.addresses
                ? user.addresses[0].name
                : 'Sua localização',
              color: theme === 'dark' ? '#FFF' : '#333',
              fontSize: '24px',
              fontWeight: '700'
            }}
          />
          {chefs.length
            ? chefs.map(chef =>
                chef.address &&
                chef.address.latitude &&
                chef.address.longitude ? (
                  <MarkerF
                    key={'marker_' + chef.id}
                    position={{
                      lat: chef.address.latitude,
                      lng: chef.address.longitude
                    }}
                    icon={{
                      url: window.location.origin + markerPath,
                      labelOrigin: new google.maps.Point(25, -8)
                    }}
                    label={{
                      text: chef.name,
                      color: theme === 'dark' ? '#FFF' : '#333',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}
                  />
                ) : (
                  ''
                )
              )
            : ''}
        </GoogleMap>
      ) : null}
    </Container>
  );
};
