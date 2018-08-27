import { AuthConfig } from 'angular-oauth2-oidc';
import { Constants } from './Constants';

export const authConfig = (url: string): AuthConfig => {
    return {
        // Url of the Identity Provider
        issuer: url.replace('5005/', '5005'),
        // URL of the SPA to redirect the user to after login
        redirectUri: url + 'oidc-login-redirect.html',
        // The SPA's id. The SPA is registered with this id at the auth-server
        clientId: Constants.clientId,
        tokenEndpoint: url + 'connect/token',
        // requireHttps: environment.production,
        // set the scope for the permissions the client should request
        // The first three are defined by OIDC.
        scope: 'openid projects-api profile offline_access'
    };
};
