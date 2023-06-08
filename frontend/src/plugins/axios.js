import axios from 'axios';
import {API_URL, TOKEN_TYPE} from '@/configs';

const $axios = axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

$axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = TOKEN_TYPE + token;
        }
        return config;
    }
);
export default $axios;
