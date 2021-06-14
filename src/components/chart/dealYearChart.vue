<script>
import { Bar } from 'vue-chartjs';
import {mapGetters} from "vuex";

export default {
	props: ['dongIdx', 'priceKey'],
	extends: Bar,
	data(){
		return {
			colors: [["#EC407A", "#F8BBD0"],["#5C6BC0", "#C5CAE9"],["#7E57C2", "#D1C4E9"]],
			dealAmount: [[],[],[]],
			avg: [],
			datalabel: ["최고가", "최저가", "평균가"],
			yearChartData: {
				labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				datasets: [{
						data: [],
						backgroundColor: [],
				}],
			},
			options: {
				title: {
                  display: true,
                  text: "평당 거래가(월간)",  
                },
      			responsive: true,
      			maintainAspectRatio: false,
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
        			xAxes: [{
						gridLines: {
                            display: false
                        },
            			barPercentage: 0.8
        			}]
    			}
    		}
		}
	},
	computed:{
        ...mapGetters(["yearChartInfo"]),
    },
	watch: {
		priceKey: function() {
			this.getData();
			this.fillData();
		},
		yearChartInfo: function() {
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
		getData() {
			this.dealAmount = [[],[],[]];
			let maxSum = 0;
			let minSum = 0;
			let avgSum = 0;

			for(let item of this.yearChartInfo[0]){
				this.dealAmount[0].push(Math.round(item.maxP * 1000));
				this.dealAmount[1].push(Math.round(item.minP * 1000));
				this.dealAmount[2].push(Math.round(item.avgP * 1000));
				maxSum += Math.round(item.maxP * 1000);
				minSum += Math.round(item.minP * 1000);
				avgSum += Math.round(item.avgP * 1000);
			}

			this.avg = [],
			this.avg.push(maxSum/12);
			this.avg.push(minSum/12);
			this.avg.push(avgSum/12);
		},
		fillData(){
			this.yearChartData.datasets[0].data = [];
			this.yearChartData.datasets[0].backgroundColor = [];
			this.yearChartData.datasets[0].label = this.datalabel[this.priceKey];
			this.options.title.text = this.yearChartInfo[0][0].maxD.dong + " 평당 거래가(월간)";
			for(let item of this.dealAmount[this.priceKey]){
				if(item > this.avg[this.priceKey]){
					this.yearChartData.datasets[0].data.push(item);
					this.yearChartData.datasets[0].backgroundColor.push(this.colors[this.priceKey][0]);
				}else {
					this.yearChartData.datasets[0].data.push(item);
					this.yearChartData.datasets[0].backgroundColor.push(this.colors[this.priceKey][1]);
				}
			}
			this.renderChart(this.yearChartData, this.options);
		},
	},
}
</script>

<style>

</style>