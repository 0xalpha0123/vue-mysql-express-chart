import Vue from "vue";
import VueRouter  from "vue-router";
import Chart from "../components/Chart";
import Login from "../components/Login";
import Register from "../components/Register";

import dataStore from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/chart", component: Chart },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/", redirect: "/login"},
        { path: "*", redirect: "/login"}
    ]
});

export default router;

router.beforeEach((to, from , next) => {
    if(to.path == '/login' || to.path == '/register') {
        if(dataStore.getters["auth/_authState"]) {
            next('chart');
        } else {
            next();
        }
    } else {
        if(dataStore.getters["auth/_authState"]) {
            next();
        } else {
            next('login');
        }
    }
});
// dataStore.getters["auth/_authState"]
