import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../features/token/loginSlice.js';
import { removeToken } from '../utils/Storage.js';
import { URLS } from '../utils/Urls.js';

function TokenExpirationWrapper({ children }) {
  console.log('TokenExpirationWrapper rendered');
  const expirationDate = localStorage.getItem('token_expiry');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkExpiry = () => {
      const currentTime = new Date().getTime();

      if (expirationDate && currentTime >= expirationDate) {
        dispatch(deleteToken());
        removeToken();
        window.location.replace(URLS.LOGIN);
      }
    };

    if (expirationDate) {
      checkExpiry();
      const intervalId = setInterval(checkExpiry, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return <>{children}</>;
}

export default TokenExpirationWrapper;
