import axios from "axios";

const apiPub = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    withCredentials: true,
});

const apiAuth = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    withCredentials: true,
});

apiAuth.interceptors.request.use((config) => {
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export {apiPub, apiAuth};

