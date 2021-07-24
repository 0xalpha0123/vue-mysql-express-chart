import Vue from "vue";
import Vuex from "vuex";

import ChartModule from "./chart";
import AuthModule from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules:  { chart: ChartModule, auth: AuthModule }
})
