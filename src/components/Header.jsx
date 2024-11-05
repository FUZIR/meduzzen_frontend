import React from 'react';
import { Box } from '@mui/material';
import AccountMenu from './AccountMenu.jsx';
import LangSelect from './LangSelect.jsx';

function Header() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 1, position: 'absolute', top: 10, right: 18 }}>
      <AccountMenu />
      <LangSelect />
    </Box>
  );
}

export default Header;