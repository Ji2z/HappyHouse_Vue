<template>
    <div class="d-flex justify-content-center" style="width:100%;">
        <div class="roundDiv mr-3 p-3" style="width:100%;">
            <div class="">{{this.yearIdx.index+1}}월 <span class="text-bold" style="color:#EC407A;">최고가</span></div>
            <div class="text-title">{{yearChartInfo[0][this.yearIdx.index].maxD.aptName}}</div>
            <hr>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">가격 :</span> {{yearChartInfo[0][this.yearIdx.index].maxD.dealAmount | dealAmountFilter}}억</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">평당가 :</span> {{yearChartInfo[0][this.yearIdx.index].maxD.avgAmount | avgFilter }}만원</div>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">면적 :</span> {{yearChartInfo[0][this.yearIdx.index].maxD.area | areaFilter}}m<sup>2</sup></div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">층 :</span> {{yearChartInfo[0][this.yearIdx.index].maxD.floor}}</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">거래일시 :</span> {{yearChartInfo[0][this.yearIdx.index].maxD.dealMonth}}월 {{yearChartInfo[0][this.yearIdx.index].maxD.dealDay}}일</div>
        </div>
        <div class="roundDiv p-3" style="width:100%;">
            <div class="">{{this.yearIdx.index+1}}월 <span class="text-bold" style="color:#5C6BC0;">최저가</span></div>
            <div class="text-title">{{yearChartInfo[0][this.yearIdx.index].minD.aptName}}</div>
            <hr>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">가격 :</span> {{yearChartInfo[0][this.yearIdx.index].minD.dealAmount | dealAmountFilter}}억</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">평당가 :</span> {{yearChartInfo[0][this.yearIdx.index].minD.avgAmount | avgFilter }}만원</div>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">면적 :</span> {{yearChartInfo[0][this.yearIdx.index].minD.area | areaFilter}}m<sup>2</sup></div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">층 :</span> {{yearChartInfo[0][this.yearIdx.index].minD.floor}}</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">거래일시 :</span> {{yearChartInfo[0][this.yearIdx.index].minD.dealMonth}}월 {{yearChartInfo[0][this.yearIdx.index].minD.dealDay}}일</div>
        </div>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
   props:['yearIdx'],
    computed: {
        ...mapGetters(["yearChartInfo"]),
    },
    filters: {
        areaFilter: function(value){
            return Math.round(value * 100) / 100;
        },
        dealAmountFilter: function(value){
            let temp = parseFloat(value)/ 10;
            return parseFloat(temp).toFixed(1);
        },
        avgFilter: function(value) {
            return String(value * 1000).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
};
</script>

<style>

</style>