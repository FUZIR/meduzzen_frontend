import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../features/token/loginSlice.js';
import { removeToken } from '../utils/Storage.js';
import { URLS } from '../utils/Urls.js';

function AccountMenu({ t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(token);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(deleteToken());
    removeToken();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 10, mt: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout}>
            <LogoutIcon>
              <PeopleIcon fontSize="small" />
            </LogoutIcon>
            {t('account_menu_logout')}
          </MenuItem>
        ) : (
          [
            <MenuItem key="login" onClick={handleClose} component={Link} to={URLS.LOGIN}>
              <LoginIcon>
                <PeopleIcon fontSize="small" />
              </LoginIcon>
              {t('account_menu_login')}
            </MenuItem>,
            <MenuItem key="registration" onClick={handleClose} component={Link} to={URLS.REGISTER}>
              <HowToRegIcon>
                <PeopleIcon fontSize="small" />
              </HowToRegIcon>
              {t('account_menu_registration')}
            </MenuItem>,
          ]
        )}

        <Divider />
        <MenuItem onClick={handleClose} component={Link} to={URLS.USERS}>
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          {t('account_menu_users')}
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={URLS.COMPANIES}>
          <ListItemIcon>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          {t('account_menu_companies')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
    ;
}

export default withTranslation()(AccountMenu);