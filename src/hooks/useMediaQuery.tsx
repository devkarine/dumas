import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = () => {
      setIsMatch(media.matches);
    };

    media.addEventListener('change', updateMatches);
    updateMatches();

    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return isMatch;
};
