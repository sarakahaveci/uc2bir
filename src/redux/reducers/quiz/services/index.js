// @ts-nocheck
import axios from "axios";
import env from "../../../../env";

const POST = data => axios({
    method: 'POST',
    url: env.defaultUri.register.quiz,
    data: data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.token}`
    }
});

export const services = {
    POST,
}