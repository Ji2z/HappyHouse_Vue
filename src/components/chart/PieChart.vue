<!--
<template>
  <div>
      <pie-chart :data="pieChartData">

      </pie-chart>
  </div>
</template>
-->
<script>
import { mapGetters} from "vuex";
import { Doughnut } from "vue-chartjs";
//import 'chartjs-plugin-labels';
let color = ['#004D40','#00695C','#00796B','#00897B','#26A69A','#4DB6AC','#80CBC4','#B2DFDB'];
export default {
    extends: Doughnut,
    props:['dongIdx'],
    data() {
        return {
            pieChartData:{
                labels:[],
                datasets:[{
                    data:[],
                    backgroundColor: [],
                }],
            },
            options:{
                // hoverBorderWidth:20,
                plugins: {
                    legend:{
                        labels:{
                            font:{
                                size:20,
                            }
                        }
                    },
                },
                title: {
                  display: false,
                  text: "상권 업종 비율",  
                },
            }
        }
    },
    methods: {
        draw(){
            console.log("draw 함수시작")
            console.log(this.pieChartInfo)
            //for(let idx in this.pieChartInfo){
                let idx = 0;
                let step = parseInt(8/this.pieChartInfo[0].length);
                this.pieChartData.labels = [];
                this.pieChartData.datasets[0].data = [];
                this.pieChartData.datasets[0].backgroundColor = [];
                this.options.title.text = this.pieChartInfo[0][0].dong + " 상권 업종 비율";

                for(let item of this.pieChartInfo[0]){
                    //console.log(0+" : 아이템 확인")
                    //console.log(item);
                    this.pieChartData.labels.push(item.codename1);
                    this.pieChartData.datasets[0].data.push(item.count);
                    this.pieChartData.datasets[0].backgroundColor.push(color[idx]);
                    idx += step;
                }
                // console.log("잘 받아왔나")
                // console.log(this.pieChartData.labels);
                // console.log(this.pieChartData.datasets[0].data);
                // console.log(this.$data._chart);
                // console.log(this.$data);
                //this.$data._chart.destroy();
                this.renderChart(this.pieChartData, this.options)
            //}
        },
    },
     computed: {
        ...mapGetters(["pieChartInfo"]),
    },
    watch:{
        pieChartInfo: function(){
            this.draw();
        },
        dongIdx: function(){
            this.draw();
        }
    },
    mounted() {
        this.draw();
    },
}
</script>

<style>

</style>