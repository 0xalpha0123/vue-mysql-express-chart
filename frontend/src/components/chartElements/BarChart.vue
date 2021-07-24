<script>

//Importing Bar class from the vue-chartjs wrapper

import { Bar } from 'vue-chartjs'
import { mapMutations } from 'vuex';

let jobId, oldJobId, jobIdArray = [];

//Exporting this so it can be used in other components

export default {
    
    extends: Bar,

    props: ["showData"],

    data: function() {
        return {
            index: null,
            isShow: false,
            backgroundColorBuild: [],
            backgroundColorPurge: []
        }
    },

    computed: {
        data: function() {
            return this.showData;
        },
    },

    methods: {
        ...mapMutations({
            setSelectedMachineStatus: "chart/setSelectedMachineStatus"
        }),
        renderBarChart: function() {
            let build = [], purge = [], labels = [];
            jobIdArray = [];
            for (let i = 0; i < this.data.length; i ++) {
                build.push(this.data[i].build);
                purge.push(this.data[i].purge);
                labels.push(this.data[i].startTime);
                jobIdArray.push(this.data[i].jobId);
            }
            this.renderChart(
                {
                    labels: labels,

                    datasets: [
                        {
                            type: 'bar',
                            label: 'Build',
                            backgroundColor: this.backgroundColorBuild,
                            data: build,
                        },
                        {
                            type: 'bar',
                            label: 'Purge',
                            backgroundColor: this.backgroundColorPurge,
                            data: purge,
                        }
                    ]
                },
                {
                    title: {
                        display: false,
                    },
                    scales: {
                    yAxes: [{
                        stacked: true
                    }],
                    xAxes: [ {
                        stacked: true,
                    }]
                    },
                    categoryPercentage: 0.5,
                    barPercentage: 1,
                    legend: {
                        display: true
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return '';
                            },
                            label: function(item) {
                                return status + ': ' + item.yLabel;
                            }
                        }
                    },
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: this.handleClick,
                }
            )
        },
        handleClick: function(evt, array) {
            if (array.length != 0) {
                this.index = array[0]._index;
                jobId = jobIdArray[array[0]._index];
                if (oldJobId == jobId) {
                    this.isShow = false;
                    oldJobId = null;
                } else {
                    oldJobId = jobId;
                    this.isShow = true;
                    this.setSelectedMachineStatus(jobId)             
                }
                this.setBackgroundColor(this.index);
                this.$emit("showTimeData", this.isShow);
            }
        },
        setBackgroundColor: function(index) {
            this.backgroundColorBuild = [];
            this.backgroundColorPurge = [];
            for (let i = 0; i < this.data.length; i++ ) {
                if (this.isShow) {
                    if (i == index) {
                        this.backgroundColorBuild.push('green');
                        this.backgroundColorPurge.push('blue');
                        continue;
                    }
                    this.backgroundColorBuild.push('#6cd87e');
                    this.backgroundColorPurge.push('#636cb9');
                } else {
                    this.backgroundColorBuild.push('green');
                    this.backgroundColorPurge.push('blue');
                }
            }
        },
        initBackgroundColor() {
            this.backgroundColorBuild = [];
            this.backgroundColorPurge = [];
            for (let i = 0; i < this.data.length; i++ ) {
                this.backgroundColorBuild.push('green');
                this.backgroundColorPurge.push('blue');
            }
        }
    },

    mounted () {
        this.renderBarChart();
        this.initBackgroundColor();
    },

    watch: {
        data: function() {
            this.initBackgroundColor();
            this.renderBarChart();
        },
        backgroundColorBuild: function() {
            this.renderBarChart();
        },
        backgroundColorPurge: function() {
            this.renderBarChart();
        }
    }
}
</script>