export interface Login {
    access_token: string;
    refresh_token: string;
    refreshTime: Date | string | undefined;
    expireDate: Date | string | undefined;
}
