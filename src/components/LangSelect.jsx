import { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../features/test/testSlice.js';

const defaultLang = 'en';

function LangSelect() {
  const lang = useSelector(state => state.test.lang);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    const storedLang = localStorage.getItem('language') || defaultLang;
    dispatch(changeLang(storedLang));
    i18n.changeLanguage(storedLang);
  }, [dispatch, i18n]);

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem('language', selectedLanguage);
    dispatch(changeLang(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <FormControl fullWidth sx={{ width: '10vw' }}>
      <InputLabel id="lang-select-label">Language</InputLabel>
      <Select
        labelId="lang-select-label"
        id="lang-select"
        value={lang}
        label="Language"
        onChange={handleChange}
      >
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'ua'}>Українська</MenuItem>
      </Select>
    </FormControl>
  );
}

export default LangSelect;