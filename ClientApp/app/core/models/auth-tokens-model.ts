export interface AuthTokenModel {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    token_type: string;
    expiration_date: string;
}
