export const baseUri = "http://gateway.ms.321.4alabs.com";
export const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const refresh_token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
export const user = {};

const env = {
    baseUri,
    token,
    refresh_token,
    user,
    defaultUri: {
        login: `${baseUri}/login`,
        register: {
            step1: `${baseUri}/register`,
            step2: `${baseUri}/user/profile/information`,
            verify: `${baseUri}/verify-code`,
            quiz: `${baseUri}/user/profile/quiz`,
        }
    }
}

export default env;