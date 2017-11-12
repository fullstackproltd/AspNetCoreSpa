import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: 'http://localhost:5000/',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://localhost:5000/',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: 'aspnetcorespa',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access client_id roles'
};
