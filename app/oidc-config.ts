const oidcConfig = {
  client_id: '88ab42e78f090a9ece1d',
  redirect_uri: 'http://localhost:4200/authentication/callback',
  silent_redirect_uri: 'http://localhost:4200/authentication/silent-callback',
  scope: 'openid profile email api offline_access',
  authority: 'http://20.192.10.19:807',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
};
export default oidcConfig;
