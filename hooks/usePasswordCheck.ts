import { useEffect, useState } from 'react';

const usePasswordCheck = (): boolean | undefined => {
  const [canVisit, setCanVisit] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // initialize sessionStorage
    if (typeof window === undefined || !window.sessionStorage) {
      setCanVisit(undefined);
    }
    const sessionStorage = window.sessionStorage;
    if (!sessionStorage.getItem('canVisit')) {
      //eslint-disable-next-line
      if (process.env.NODE_ENV === 'production' || true) {
        // || true for testing
        sessionStorage.setItem('canVisit', 'false');
      } else {
        sessionStorage.setItem('canVisit', 'true');
      }
    }
    setCanVisit(sessionStorage.getItem('canVisit') === 'true');
  }, []);

  return canVisit;
};

export default usePasswordCheck;
