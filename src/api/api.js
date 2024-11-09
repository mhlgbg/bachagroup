import axios from 'axios';

const api = axios.create({
    baseURL: 'http://171.244.10.195:5005/api',
    //baseURL: 'http://localhost:5004/api',
    //baseURL: 'http://192.168.1.13:5000/api',
});

api.interceptors.request.use(
    (config) => {
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        if (auth && auth.token) {
            config.headers['Authorization'] = `Bearer ${auth.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;