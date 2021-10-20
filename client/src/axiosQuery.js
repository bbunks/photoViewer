import axios from "axios";

export const queryURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port;

const instance = axios.create();

instance.interceptors.request.use(
    (req) => {
        if (localStorage.getItem("AuthToken")) {
            req.headers.Authorization =
                "Bearer " + localStorage.getItem("AuthToken");
        } else {
            req.headers.Authorization = null;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
