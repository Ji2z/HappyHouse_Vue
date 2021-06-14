<script>
import { Line } from 'vue-chartjs';
import { mapGetters } from "vuex";

export default {
    props: ['dongIdx'],
    extends: Line,
    data() {
        return {
            month: new Date().getMonth()+1,
            colors: [["#EC407A", "rgba(255, 56, 96, 0.1)"],["#5C6BC0", "rgba(50, 115, 220, 0.1)"],["#7E57C2", "rgba(209, 196, 233, 0.1)"]],
            dealAmount: [[],[],[],[],[],[],[]],
			datalabel: ["최고가", "최저가", "평균가"],
            dongName: "",
			monthChartData: {
				labels: ["일", "월", "화", "수", "목", "금", "토"],
				datasets: [{
						data: [],
				    },
                    {
						data: [],
				    },
                    {
						data: [],
				    }
                ],
			},
			options: {
                title: {
                  font: {
                      size: 30
                  },
                  display: true,
                  text: "평당 거래가(주간)",  
                },
                onClick: this.handle,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        },
                        scaleLabel: {
							display: true,
							labelString: '단위 (만원)'
						}
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    computed: {
        ...mapGetters(["monthChartInfo"]),
    },
    watch: {
        monthChartInfo: function() {
            this.getData();
            this.fillData();
        },
    },
    methods: {
        handle(point, event){
			const item = event[0]
			this.$emit('on-receive', {
				index: item._index,
			})
		},
        fillData() {
            for(let item of this.dealAmount){
                if(item == null){
                    this.monthChartData.datasets[0].data.push(0);
                    this.monthChartData.datasets[1].data.push(0);
                    this.monthChartData.datasets[2].data.push(0);
                }else{
                    this.monthChartData.datasets[0].data.push(Math.round(item.maxP * 1000));
                    this.monthChartData.datasets[1].data.push(Math.round(item.minP * 1000));
                    this.monthChartData.datasets[2].data.push(Math.round(item.avgP * 1000));
                }
            }
            this.renderChart(this.monthChartData, this.options);
        },
        getData() {
            this.deleteData();
            for(let item of this.monthChartInfo[0]){
                let day = parseInt(item.dealDay7)-1;
                this.dealAmount[day] = item;
            }
            this.options.title.text = this.month + "월 " + this.monthChartInfo[0][0].maxD.dong + " 평당 거래가(주간)";
        },
        deleteData() {
            this.dealAmount = [[],[],[],[],[],[],[]];
            for(let idx = 0; idx<3; idx++){
                this.monthChartData.datasets[idx].data = [];
			    this.monthChartData.datasets[idx].borderColor = this.colors[idx][0];
                this.monthChartData.datasets[idx].backgroundColor = this.colors[idx][1];
			    this.monthChartData.datasets[idx].label = this.datalabel[idx];
            }
        }
    }
};
</script>

<style>

</style>