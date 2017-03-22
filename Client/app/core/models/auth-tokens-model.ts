export interface AuthTokenModel {
    access_token: string | null;
    refresh_token: string | null;
    id_token: string | null;
    expires_in: number | null;
    token_type: string | null;
    expiration_date: string | null;
}
