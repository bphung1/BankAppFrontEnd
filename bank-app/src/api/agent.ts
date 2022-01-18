import axios from 'axios';
import React from 'react';
import { User } from '../model/user';
import { store } from '../stores/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const url = 'https://team-hthb-bank-app-api.herokuapp.com/api';
class Agent {

    // public userFromAPI: Promise<User>;
    login(email: string | string, password: string | string) {
        let user = axios.post<any>(url + '/authenticate', {
            email,
            password
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            return undefined;
        })
        return user;
    }
}