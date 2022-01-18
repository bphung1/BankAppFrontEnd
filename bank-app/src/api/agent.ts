import axios from 'axios';
import React from 'react';
import { store } from '../stores/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})



const agent = {
    
};
export default agent;