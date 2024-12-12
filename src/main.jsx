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
import TokenExpirationWrapper from './hooks/TokenExpirationWrapper.jsx';

// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import i18n from './utils/i18n.js';
import Profile from './pages/Profile.jsx';
import UpdateInfo from './pages/UpdateInfo.jsx';
import Requests from './pages/UserRequests.jsx';
import Invitations from './pages/Invitations.jsx';
import CompanyDetails from './pages/CompanyDetails.jsx';
import CompanyQuizzes from './pages/CompanyQuizzes.jsx';
import Quiz from './pages/Quiz.jsx';
import CompanyAnalytics from './pages/CompanyAnalytics.jsx';

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
    path: '/profile',
    element: <PrivateRoute element={<Profile />} />,
  },
  {
    path: '/profile/update_info',
    element: <PrivateRoute element={<UpdateInfo />} />,
  },
  {
    path: '/requests',
    element: <PrivateRoute element={<Requests />} />,
  },
  {
    path: '/invitations',
    element: <PrivateRoute element={<Invitations />} />,
  },
  {
    path: '/companies/:id/details',
    element: <PrivateRoute element={<CompanyDetails />} />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/company_quizzes/:id',
    element: <PrivateRoute element={<CompanyQuizzes />} />,
  },
  {
    path: '/quiz/:hash',
    element: <PrivateRoute element={<Quiz />} />,
  },
  {
    path: '/companies/:id/analytics',
    element: <PrivateRoute element={<CompanyAnalytics />} />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <TokenExpirationWrapper>
        <CssBaseline />
        <LanguageInitializer />
        <PersistGate loading={null} persistor={persistore}>
          <RouterProvider router={router} />
        </PersistGate>
      </TokenExpirationWrapper>
    </Provider>
  </StrictMode>,
);
