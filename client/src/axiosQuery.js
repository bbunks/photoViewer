import axios from "axios";

export const queryURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    //window.location.port +
    "3001/";
const instance = axios.create({
    baseURL: queryURL,
});

export default instance;
