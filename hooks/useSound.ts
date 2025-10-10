import { useCallback } from 'react';

// Sound has been removed from the application. This is a dummy hook to prevent crashes from any missed usages.
export const useSound = () => {
  return useCallback(() => {}, []);
};
