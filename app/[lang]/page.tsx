/*
'use client';
import React from 'react';
import LoginPage from '../../hive/pages/login';
import { OidcProvider } from '@axa-fr/react-oidc';
// import { AppProps } from 'next/app';
const oidcConfiguration = {
  client_id: '88ab42e78f090a9ece1d',
  // redirect_uri: 'http://4.224.76.123/authentication/callback',
  redirect_uri: 'http://20.192.10.19:3000/authentication/callback',
  silent_redirect_uri: 'http://20.192.10.19:3000/en/dashboard', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email api offline_access',
  //Change this url with you url.
  authority: 'http://4.224.76.123',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
};
const page = () => {
  return (
    <div>
      <OidcProvider configuration={oidcConfiguration}>
        <LoginPage />
      </OidcProvider>
    </div>
  );
};

export default page;
*/
'use client';
import React from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPageWrapper from '../../hive/pages//login'; // Adjust the import path as necessary
import AuthenticationCallback from '../../hive/pages/authentication/callback'; // Adjust the import path as necessary
import Dashboard from '../../hive/pages/dashboard'; // Adjust the import path as necessary, assuming you have a Dashboard component
const oidcConfiguration = {
  client_id: '88ab42e78f090a9ece1d',
  // redirect_uri: 'http://4.224.76.123/authentication/callback',
  redirect_uri: 'http://20.192.10.19:3000/authentication/callback',
  silent_redirect_uri: 'http://20.192.10.19:3000', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email api offline_access',
  //Change this url with you url.
  authority: 'http://4.224.76.123',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
};
const App = () => {
  return (
    <OidcProvider configuration={oidcConfiguration}>
      <Router>
        <Routes>
          <Route path="/" Component={LoginPageWrapper} />
          <Route
            path="/authentication/callback"
            Component={AuthenticationCallback}
          />
          <Route path="/en/dashboard" Component={Dashboard} />
          {/* You can add more routes here as needed for your application */}
        </Routes>
      </Router>
    </OidcProvider>
  );
};

export default App;
