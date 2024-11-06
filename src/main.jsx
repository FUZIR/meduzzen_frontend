import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './index.css';
import About from './pages/About.jsx';
import Users from './pages/Users/Users.jsx';
import UserInfo from './pages/Users/UserInfo.jsx';
import Companies from './pages/Companies/Companies.jsx';
import CompanyInfo from './pages/Companies/CompanyInfo.jsx';
import LanguageInitializer from './hooks/LanguageInitializer.jsx';
import Welcome from './pages/Welcome.jsx';
import { Provider } from 'react-redux';
import store, { persistore } from './stores/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Healthcheck from './pages/Healthcheck.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CheckExpirationDate from './hooks/CheckExpirationDate.jsx';

// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import i18n from './utils/i18n.js';

const router = createBrowserRouter([
  {
    path: '/info',
    element: <Welcome />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/healthcheck',
    element: <Healthcheck />,
  },
  {
    path: '/users',
    element: <PrivateRoute element={<Users />} />,
  },
  {
    path: '/users/:id',
    element: <PrivateRoute element={<UserInfo />} />,
  },
  {
    path: '/companies',
    element: <PrivateRoute element={<Companies />} />,
  },
  {
    path: '/companies/:id',
    element: <PrivateRoute element={<CompanyInfo />} />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <LanguageInitializer />
      <PersistGate loading={null} persistor={persistore}>
        <RouterProvider router={router}>
          <CheckExpirationDate />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
  ,
);
