// Add bellow trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users,
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here

const trustedDomains = {
  default: ['http://4.224.76.123/connect/token'],
  config_classic: ['http://4.224.76.123/connect/token'],
  config_without_silent_login: ['http://4.224.76.123/connect/token'],
  config_without_refresh_token: ['http://4.224.76.123/connect/token'],
  config_without_refresh_token_silent_login: [
    'http://4.224.76.123/connect/token',
  ],
  config_with_hash: ['http://4.224.76.123/connect/token'],
};
