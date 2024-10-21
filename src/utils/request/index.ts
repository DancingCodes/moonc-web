import axios from 'axios';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
import '@/assets/css/nprogress/index.scss'
nProgress.configure({ showSpinner: false });

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

request.interceptors.request.use(
    (config) => {
        nProgress.start();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        nProgress.done();
        if (response.data.status === 500) {
            ElNotification({
                title: 'warning',
                message: response.data.message,
                type: 'warning',
            })
            return Promise.reject(response.data.message);
        }

        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;