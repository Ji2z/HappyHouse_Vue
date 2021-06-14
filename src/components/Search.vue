<template>
    <div>
		<div class="mb-2"></div>
		<b-row class="ml-1">
			<b-col cols="5">
				<hr>
				<h3 class="text-title ml-3">거래 정보</h3>
				<hr>
				<b-table id="my-table"
				:items="searchData[0]"
				:per-page="perP"
				:current-page="currP"
				class="roundDiv" hover selectable select-mode="single" @row-clicked="changeCenter"
				:fields="fields">
					<template #cell(index)="data">
						{{ data.index + 1 }}
					</template>
				</b-table>
				<b-pagination v-model="currP" :total-rows="rows" :per-page="perP" aria-controls="my-table" align="center"></b-pagination>
				<!-- <div class="pre-scrollable text-left" id="houseInfo" style="min-height: 87%;">		
					<div v-for="(item, idx) in resultData" :key="idx" class="roundDiv ml-3 mr-2 mb-3 p-4">
						<div class="text-title">{{item.aptName}}</div>
						<div>위치 : {{item.dong}}</div>
						<div>가격 : {{item.dealAmount}}</div>
						<div>면적 : {{item.area}}</div>
					</div>
				</div> -->
			</b-col>
			<b-col>
				<!-- 드롭다운 검색 -->
				<Dropdown/>
				<!-- 지도 -->
				<GmapMap id="map" ref="mapRef" :center="center" :zoom="zoom" style="height:60vh">
					
					<GmapMarker v-for="(item, idx) in searchData[0]" :key="idx"
					:position="item"
					@click="showInfo(item)"
					:clickable="true"
					:icon="{url:require('../assets/pin/housePin.png')}"
					@mouseover="showByIndex = idx"
        			@mouseout="showByIndex = -1">
						<gmap-info-window :opened="showByIndex === idx">
							<div>
								<div class="text-title">{{item.aptName}}</div>
								<div>위치 : {{item.dong}}</div>
								<div>가격 : {{item.dealAmount}}</div>
								<div>면적 : {{item.area}}</div>
							</div>
						</gmap-info-window>
					</GmapMarker>
				</GmapMap>
			</b-col>
		</b-row>
	</div>

</template>

<script>
import Dropdown from "./include/Dropdown.vue";
import { mapGetters} from "vuex";

export default {
	name:"GoogleMaps",
    components: {
       Dropdown,
    },
	data() {
		return {
			fields:[
                // {aptName:"아파트 이름", sortable: true},
                // {area:"면적", sortable: true},
                // {avgAmount :"평당 가격", sortable: true},
                // {dealAmount:"거래 가격", sortable: true},
				// {index:"번호"},
				{key:"aptName", label: '아파트 이름', sortable: true},
				{key:"dong", label: '동', sortable: true},
                {key:"area", label: '면적', sortable: true, filter: this.areaFilter},
                {key:"avgAmount", label: '평당 가격', sortable: true},
                {key:"dealAmount", label: '거래 가격', sortable: true},
            ],
			perP:8,
			currP:1,
			showByIndex:-1,
			dongData:'',
			aptName:'',
			resultData:[],
			center: {
				lat: 37.5574976,
				lng: 126.9858981,
			},
			markers:[],
			zoom:12,
		}
	},
	methods: {
		changeCenter(item){
			//console.log(this.$refs)
			console.log(item)
			this.center = {
				lat: item.lat,
				lng: item.lng,
			};
			this.zoom = 15;
		},
	},
	computed: {
	...mapGetters(["searchData"]),
      rows() {
        return this.searchData[0].length
      }
    },
	watch:{
		searchData:function(){
			this.currP = 1;
			this.zoom = 12;
			this.center = {
				lat: this.searchData[0][0].lat,
				lng: this.searchData[0][0].lng,
			};
			// console.log("써치 watcj")
			// console.log(this.searchData[0])
		}
	},
	filters: {
		areaFilter: function(value){
            return Math.round(value * 100) / 100;
        },
	}
};
</script>

<style scoped>
#houseInfo::-webkit-scrollbar{
	display: none;
}
</style>