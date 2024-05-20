import axios from "axios";
import { useCallback } from "react";

const useHttp = () => {
    const getOperation = useCallback(async(requestConfig, headerParams = null) => {       
        return axios.get(requestConfig.url, { withCredentials: true, headers: headerParams ? headerParams : {'Access-Control-Allow-Origin': process.env.HOST_URL, 'Content-Type': 'application/json'}})
            .catch(err => err);
    }, []);

    const postOperation = useCallback(async(requestConfig, headerParams = null) => {   
        return axios.post(requestConfig.url, requestConfig.body, { withCredentials: true, headers: headerParams ? headerParams : {'Access-Control-Allow-Origin': process.env.HOST_URL, 'Content-Type': 'application/json'}})
            .catch(err => err);      
    }, []);

    return {
        getOperation,
        postOperation
    }
}

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("Authorization");
        config.withCredentials = true;
        
        if (token) {
            config.headers["Authorization"] = token;
        } 
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return error.response;
});

export default useHttp;