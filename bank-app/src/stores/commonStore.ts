import { makeObservable, reaction } from "mobx";
import React from "react";

export default class CommonStore {
    token: string | null = null;

    constructor() {
        // makeObservable(this);

        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    setToken = (token: string | null) => {
        if (token) window.localStorage.setItem('jwt', token);
        this.token = token;
    }
}