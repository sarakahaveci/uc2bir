export const baseUri = "http://gateway.ms.321.4alabs.com";
export const token = "";
export const refresh_token = "";
export const user = {};

const env = {
    baseUri,
    token,
    refresh_token,
    user,
    defaultUri: {
        login: `${baseUri}/login`,
    }
}

export default env;