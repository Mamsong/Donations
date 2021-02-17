import axios from 'axios';
require('dotenv').config();

export const useHttp = () => {
    const http = axios.create({
        baseURL: process.env.BASE_URL || "http://localhost:3000",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    http.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            config.headers.token = token;
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );

    return { http };
}