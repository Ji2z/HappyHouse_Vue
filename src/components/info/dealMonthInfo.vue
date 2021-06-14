<template>
    <div class="d-flex justify-content-center" style="width:100%;">
        <div class="roundDiv mr-3 p-3" style="width:100%;">
            <div class="">{{month}}월 {{yoil[this.monthIdx.index]}}요일 <span class="text-bold" style="color:#EC407A;">최고가</span></div>
            <div class="text-title">{{monthChartInfo[0][this.monthIdx.index].maxD.aptName}}</div>
			<hr>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">가격 :</span> {{monthChartInfo[0][this.monthIdx.index].maxD.dealAmount | dealAmountFilter}}억</div>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">면적 :</span> {{monthChartInfo[0][this.monthIdx.index].maxD.area | areaFilter }}m<sup>2</sup></div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">평당가 :</span> {{monthChartInfo[0][this.monthIdx.index].maxD.avgAmount | avgFilter }}만원</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">층 :</span> {{monthChartInfo[0][this.monthIdx.index].maxD.floor}}</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">거래일시 :</span> {{monthChartInfo[0][this.monthIdx.index].maxD.dealMonth}}월 {{monthChartInfo[0][this.monthIdx.index].maxD.dealDay}}일</div>
        </div>
        <div class="roundDiv p-3" style="width:100%;">
            <div class="">{{month}}월 {{yoil[this.monthIdx.index]}}요일 <span class="text-bold" style="color:#5C6BC0;">최저가</span></div>
            <div class="text-title">{{monthChartInfo[0][this.monthIdx.index].minD.aptName}}</div>
			<hr>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">가격 :</span> {{monthChartInfo[0][this.monthIdx.index].minD.dealAmount | dealAmountFilter}}억</div>
			<div class="text-small"><span style="color:#00796b;" class="text-bold text-small">면적 :</span> {{monthChartInfo[0][this.monthIdx.index].minD.area | areaFilter }}m<sup>2</sup></div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">평당가 :</span> {{monthChartInfo[0][this.monthIdx.index].minD.avgAmount | avgFilter }}만원</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">층 :</span> {{monthChartInfo[0][this.monthIdx.index].minD.floor}}</div>
            <div class="text-small"><span style="color:#00796b;" class="text-bold text-small">거래일시 :</span> {{monthChartInfo[0][this.monthIdx.index].minD.dealMonth}}월 {{monthChartInfo[0][this.monthIdx.index].minD.dealDay}}일</div>
        </div>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
    data() {
        return {
            month: new Date().getMonth()+1,
            yoil: ['일','월','화','수','목','금','토'],
        }
    },
    props:['monthIdx'],
    computed: {
        ...mapGetters(["monthChartInfo"]),
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
    // created() {
    //     console.log("클릭 매물 확인")
    //     console.log(this.monthChartInfo)
    //     console.log(this.monthChartInfo[0])
    //     console.log(this.monthChartInfo[0][this.monthIdx.index])
    // },
    // watch:{
    //     monthIdx: function(){
    //         console.log("클릭 매물 확인 워치")
    //         console.log(this.monthIdx)
    //         console.log(this.monthChartInfo)
    //         console.log(this.monthChartInfo[0])
    //         console.log(this.monthChartInfo[0][this.monthIdx.index])
    //     }
    // }
};
</script>

<style>

</style>