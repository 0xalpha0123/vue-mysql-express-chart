<template>
    <div class="container-fluid">
        <div class="bg-default text-black p-2 m-0">
            Logo
            <label class="float-right" v-on:click="handleLogout">
                {{ user }}
            </label>
        </div>
        <h4 class="bg-primary text-white text-center p-2">
            Linde Flow Monitoring
        </h4>
        <div class="row">
            <div class="col-md-3" v-for="machine in machinesData" v-bind:key="machine.id">
                <div class="card m-2 machine" v-on:click="_selectMachine(machine.machineId, machine.name)" v-active="machine.name == selectedMachine">
                    <div class="card-bdy m-2">
                        <h4 class="card-title">{{ machine.name }}</h4>
                        <p class="card-text">Last Updated: {{ machine.lastUpdated }}</p>
                        <p class="card-text">Current Flow: {{ machine.value }}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div v-if="!showData">
            <h4>No Data</h4>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{{ selectedMachine }}</h4>
                            <bar-chart v-bind:showData="showData" v-on:showTimeData="handelShowDataView" ></bar-chart>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div v-if="showTimeData && isShow">
                        <line-chart v-bind:showData="showTimeData"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import BarChart from '@/components/chartElements/BarChart'
import LineChart from '@/components/chartElements/LineChart'

import Active from '../directives/active'

export default {
    name: 'chart',
    data: function () {
        return {
            selectedMachine: "",
            isShow: true
        };
    },
    components: {
        BarChart,
        LineChart
    },
    directives: {
        Active
    },
    computed: {
        ...mapState({
            machinesData: state => state.chart.machinesData
        }),
        ...mapGetters({
            user: "auth/user",
            showData: "chart/showStatus",
            showTimeData: "chart/showTimeData"
        })
    },
    methods: {
        ...mapMutations({
            selectMachine: "chart/selectMachine"
        }),
        ...mapActions({
            logout: "auth/logout"
        }),
        _selectMachine(machineId, name) {
            this.selectedMachine = name
            this.selectMachine(machineId);
        },
        handelShowDataView(isShow) {
            this.isShow = isShow;
        },
        async handleLogout() {        
                let result = (await this.logout(this.user));
                if (result == 'success') 
                    this.$router.go('/login')
        }
    },
    created: function() {
    },
}
</script>

<style scoped>

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 3px solid #8080db ;
}

.machine {
    cursor: pointer;
    color:black;
    background-color: white;
    transition-duration: .2s;
}

.machine:hover {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
    color:white;
    background-color: dodgerblue;
}

.machine:active {
    background-color: dodgerblue;
    color:white;
}

</style>
