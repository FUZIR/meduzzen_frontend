import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../features/token/loginSlice.js';
import { removeToken } from '../utils/Storage.js';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../utils/Urls.js';

function CheckExpirationDate() {
  const expiry = useSelector(state => state.login.expirationDate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiry = () => {
      const currentTime = new Date().getTime();
      if (expiry && currentTime >= expiry) {
        dispatch(deleteToken());
        removeToken();
        navigate(URLS.LOGIN);
      }
    };
    const intervalId = setInterval(checkExpiry, 60000);
    checkExpiry();
    return () => clearInterval(intervalId);
  }, [dispatch, expiry, navigate]);

  return null;
}

export default CheckExpirationDate;