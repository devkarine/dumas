// export const getLocation = () => {
//   if ('geolocation' in navigator) {
//     return navigator.geolocation.getCurrentPosition(function (position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       return { latitude, longitude };
//     });
//   }
// };

const getLocation = () => {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not available in this browser.'));
      }
    }
  );
};

export async function getAndUseLocation() {
  try {
    const location = await getLocation();
    return location;
  } catch (error) {
    console.error('Erro ao obter a localização:', error);
  }
}
