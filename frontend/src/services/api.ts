import axios from 'axios';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://localhost:7001/api';

export const backendApi = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Handle HTTPS certificate issues in development
    ...(process.env.NODE_ENV === 'development' && {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        })
    })
});

// Axios interceptors for error handling
backendApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Backend API Error:', error);
        return Promise.reject(error);
    }
);