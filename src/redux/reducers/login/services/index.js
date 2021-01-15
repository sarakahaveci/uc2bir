// @ts-nocheck
import axios from "axios";
import env from "../../../../env";

const GETTOKEN = data => axios({
    method: 'POST',
    url: env.defaultUri.login,
    data: data,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
    }
});

export const loginServices = {
    GETTOKEN,
}