import { Container } from './styled';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Chef } from '../../types/Chef';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import { useCart } from '../../contexts/cartContex';

interface NearDishesMapProps {
  chefs: Chef[];
}

const apikey = import.meta.env.VITE_MAPS_API_KEY;
const darkMapId = import.meta.env.VITE_DARK_MAP_ID;
const lightMapId = import.meta.env.VITE_LIGHT_MAP_ID;

export const NearDishesMap = ({ chefs }: NearDishesMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, userLocation } = useAuth();
  const [cartLocation, setCartLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { activeAddress } = useCart();

  const containerStyle = {
    width: '100%',
    height: containerRef.current?.offsetHeight
  };

  useEffect(() => {
    if (activeAddress && activeAddress.latitude && activeAddress.longitude) {
      setCartLocation({
        lat: activeAddress.latitude,
        lng: activeAddress.longitude
      });
    }
  }, [activeAddress]);

  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const markerPath =
    theme === 'light' ? '/images/marker_red.svg' : '/images/marker.svg';

  const userMarkerPath =
    theme === 'light'
      ? '/images/user_marker_red.svg'
      : '/images/user_marker.svg';

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      map.setZoom(13);
      map.setOptions({ mapId: theme === 'dark' ? darkMapId : lightMapId });

      setMap(map);
    },
    [theme]
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    libraries: ['geometry']
  });

  return (
    <Container ref={containerRef}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={cartLocation || userLocation}
          options={{ disableDefaultUI: true }}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          key={`map_${theme}`}
        >
          <MarkerF
            key={'marker_user'}
            position={cartLocation || userLocation}
            icon={{
              url: window.location.origin + userMarkerPath,
              labelOrigin: new google.maps.Point(25, -12)
            }}
            label={{
              text: user?.addresses?.length
                ? user.addresses[0].name
                : 'Sua localização',
              color: theme === 'dark' ? '#FFF' : '#333',
              fontSize: '18px',
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
                      fontSize: '16px',
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
