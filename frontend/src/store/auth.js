import Axios from 'axios'

import { serverUrl } from '../constants'

export default {
    strict: true,
    namespaced: true,
    state: {
    },
    getters: {
        _authState() {
            let data = localStorage.getItem("Authenticated");
            return data;
        },
        user() {
            return localStorage.getItem("user");
        }
    },
    mutations: {
        setAuthenticateState(currentState, user) {
            localStorage.setItem("Authenticated", true);
            localStorage.setItem("user", user.email);
        },
        clearAuthenticateState(currentState) {
            currentState.user = null;
            localStorage.removeItem("Authenticated");
        },
        _initializeUser(curentState) {
            curentState.user = localStorage.getItem("user")
        }
    },
    actions: {
        async authSignUp(context, user) {
            let result = (await Axios.post(`${serverUrl}/api/signup`, user)).data.state;
            return result;
        },
        async authSignIn(context, user) {
            let result = (await Axios.post(`${serverUrl}/api/login`, user)).data.state;
            context.commit("setAuthenticateState", user)
            return result;
        },
        async logout(context) {
            let result = (await Axios.get(`${serverUrl}/api/logout`)).data.state;
            context.commit("clearAuthenticateState");
            return result;
        },
        initializeUser(context) {
            context.commit("_initializeUser");
        }
    }
}
