import * as qs from "qs";
import { PathLike } from "fs";
import axios from "axios";

const apiConfig = {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    baseURL: "http://localhost:8000/",
    headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
    paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}

const apiClient = axios.create(apiConfig);

export default apiClient;