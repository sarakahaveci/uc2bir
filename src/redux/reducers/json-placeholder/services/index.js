import axios from "axios";

const GET = () => axios.get('https://jsonplaceholder.typicode.com/todos/1');
const GETALL = () => axios.get('https://jsonplaceholder.typicode.com/todos');
const POST = () => {}
const PUT = () => {}
const PATCH = () => {}
const DELETE = () => {}

export const jPService = {
    GET,
    GETALL,
    POST,
    PUT,
    PATCH,
    DELETE,
}