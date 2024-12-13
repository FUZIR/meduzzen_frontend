import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../features/token/loginSlice.js';
import { removeToken } from '../utils/Storage.js';
import { Urls } from '../utils/urls.js';

function TokenExpirationWrapper({ children }) {
  const expirationDate = localStorage.getItem('token_expiry');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkExpiry = () => {
      const currentTime = new Date().getTime();

      if (expirationDate && currentTime >= expirationDate) {
        dispatch(deleteToken());
        removeToken();
        window.location.replace(Urls.LOGIN);
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
