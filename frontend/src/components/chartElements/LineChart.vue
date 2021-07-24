<script>
  //Importing Line class from the vue-chartjs wrapper
  import { Line } from 'vue-chartjs'

  //Exporting this so it can be used in other components
  export default {

    extends: Line,

    props: ["showData"],

    computed: {
        data: function() {
            return this.showData;
        },
    },

    methods: {
        renderLineChart: function() {
            let build = [], purge = [], labels = [];
            for (let i = 0; i < this.data.length; i ++) {
                labels.push(this.data[i].timeStamp);
                if (this.data[i].status == 'Build') {
                    build.push(this.data[i].value);
                    purge.push('null');
                } else if (this.data[i].status == 'Purge') {
                    build.push('null');
                    purge.push(this.data[i].value);
                }
            }
            this.renderChart(
              {
                  labels: labels,

                  datasets: [
                      {
                          label: 'Build',
                          backgroundColor: "transparent",
                          borderWidth: 3,
                          borderColor: "green",
                          pointBorderColor: 'green',
                          pointRadius: 0,
                          //Data to be represented on y-axis
                          data: build
                      },
                      {
                          label: 'Purge',
                          backgroundColor: "transparent",
                          borderWidth: 3,
                          borderColor: "blue",
                          pointBorderColor: 'blue',
                          pointRadius: 0,
                          //Data to be represented on y-axis
                          data: purge
                      }
                  ]
              },

            )
        }
    },

    mounted () {
        this.renderLineChart();
    },

    watch: {
        data: function() {
            this.renderLineChart();
        },
    }
  }
</script>