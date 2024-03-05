import axios from "axios";
import {baseUrl, getToken} from "@/app/common/globalVariables";

const axiosHttp = axios.create({
    baseURL: baseUrl
})

axiosHttp.interceptors.request.use(
    (config) => {
        const token = getToken()
        return {
            ...config,
            headers: {
                ...(token !== null && { Authorization: `Bearer ${token}` }),
                ...config.headers,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosHttp.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if (error.response.status == 401){
        }
        return Promise.reject(error)
    }
)

export default axiosHttp