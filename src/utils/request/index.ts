import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
request.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)


export default request