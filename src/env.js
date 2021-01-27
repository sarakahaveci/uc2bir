let _token = "";
let _refresh_token = "";

if (typeof(localStorage) !== "undefined") {
    _token = localStorage.getItem("token") || sessionStorage.getItem("token");
    _refresh_token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
} else {
    console.log("Bundle Succsess");
}

export const baseUri = "http://gateway.ms.321.4alabs.com";
export const token = _token;
export const refresh_token = _refresh_token;
export const user = 0;
const env = {
    baseUri,
    token,
    refresh_token,
    user,
    defaultUri: {
        login: `${baseUri}/login`,
        get_profile: `${baseUri}/user/profile`,
        register: {
            step1: `${baseUri}/register`,
            step2: `${baseUri}/user/profile/information`,
            verify: `${baseUri}/verify-code`,
            quiz: `${baseUri}/user/profile/quiz`,
        }
    }
}

export default env;