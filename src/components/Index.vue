<template>
  <div>

	<div class=""></div>
    
    <b-row class="ml-1 mr-1">
		<!--left side-->
		<b-col cols="3">
			<div class="ml-3 mr-2">
				<!-- 드롭다운 -->
				<div class="d-flex justify-content-center mb-2" style="width=80%;">
					<b-dropdown id="dropdown-1" text="서울특별시" class="dropdownBtn mr-1 text-small">
						<b-dropdown-item class="dropdownBtn">서울특별시</b-dropdown-item>
					</b-dropdown>
					<b-dropdown id="dropdown-1" v-model='guData' :text=guData class="dropdownBtn mr-1 text-small">
						<b-dropdown-item v-for="(gu,idx) in gus" :key="idx" :value="gu" class="dropdownBtn" @click="selectGu(gu)" >{{gu}}</b-dropdown-item>
					</b-dropdown>
					<b-dropdown id="dropdown-1" v-model='dongData' :text=dongData class="dropdownBtn mr-1 text-small">
						<b-dropdown-item v-for="(dong,idx) in dongs" :key="idx" :value="dong.dong" class="dropdownBtn" @click="dongData = dong.dong">{{dong.dong}}</b-dropdown-item>
					</b-dropdown>
					<div>
						<b-button type="button" class="confirmBtn text-small" style="height:100%;" @click="search"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
					</div>
				</div>
				<div class="text-center">
					<b-button type="button" class="goMap text-bold" style="width: 90%;" @click="goSearch"><b-icon icon="map" aria-hidden="true"></b-icon> 지도에서 검색하기</b-button>
				</div>
				<!-- end 드롭다운 -->
			</div>
			<div class="mb-4"></div>
			<div v-if="userinfo" class="roundDiv ml-3 mr-2 p-4">
				<span class="text-large">안녕하세요,</span>
				<span class="text-large text-bold">
					{{userinfo.name}}님
				</span>
			</div>
			<div class="mb-4"></div>
			 <div class="roundDiv small_pie ml-3 mr-2 pt-2 pl-3 pr-3 pb-3">
				 <div class="text-center text-bold">{{pieChartInfo[0][0].dong}} 상권 업종 비율</div>
				 <Pie class="text-default text-large" :dongIdx="dongIdx"/>
			 </div>
		</b-col>
		<!--end left side-->

		<!--right side-->
		<b-col>
			<div class="mb-5" v-if="userinfo != null && userinfo.address.length != 0">
				<span class="roundDiv p-2 mr-2 text-bold grad-color">{{userinfo.name}}님의 관심지역</span>
				<span class="roundDiv p-2 mr-2 mydongs clicked" style="overflow-x: auto" @click="changeClickColor($event, 0)">{{userinfo.address[0].gugun}} {{userinfo.address[0].dong}}</span>
				<span class="roundDiv p-2 mr-2 mydongs" style="overflow-x: auto" v-for="(item, idx) in userinfo.address.slice(1,userinfo.address.length)" :key="idx" @click="changeClickColor($event, idx+1)">{{item.gugun}} {{item.dong}}</span>
			</div>
			<div v-else class="mb-5">
				<span class="roundDiv p-2 mr-2 text-bold grad-color">관심지역이 설정되지 않았습니다. 로그인 후 관심지역을 설정해주세요.</span>
				<span class="roundDiv p-2 mr-2 clicked">강남구 역삼동</span>
			</div>

			<b-row>
				<!-- bar chart -->
				<b-col cols="8">
					<div>
						<span class="text-bold text-center roundDiv p-2 mr-1 mb-2" style="overflow-x: auto" v-for="(item, idx) in priceKeys" :key="idx" @click="changeKey(idx)">{{item}}</span>
					</div>
					<b-row class="mb-2">
						<b-col class="roundDiv small_bar">
							<year-bar class="small_bar text-default" @on-receive="changeYearIdx" :dongIdx="dongIdx" :priceKey="priceKey"></year-bar>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="roundDiv small_bar">
							<month-line class="small_bar text-default" @on-receive="changeMonthIdx" :dongIdx="dongIdx"></month-line>
						</b-col>
					</b-row>
				</b-col>
				<!-- end bar chart -->
				<b-col class="mr-2">
					<!-- click event -->
					<div class="mb-3 text-center" style="width:100%">
						<div class="text-bold text-center roundDiv p-2 mr-1">{{pieChartInfo[0][0].dong}} 거래 정보</div>
					</div>
					<b-row class="mb-2">
						<b-col class="">
							<div class="roundDiv mr-2 p-5" v-if="yearIdx == -1">월간 그래프에서 원하는 달을 클릭하여 해당 달의 거래 정보를 확인하세요.</div>
							<div v-else>
								<year-info :yearIdx="yearIdx"></year-info>
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="">
							<div class="roundDiv mr-2 p-5" v-if="monthIdx == -1">주간 그래프에서 원하는 요일을 클릭하여 해당 요일의 거래 정보를 확인하세요.</div>
							<div v-else>
								<month-info :monthIdx="monthIdx"></month-info>
							</div>
						</b-col>
					</b-row>
					<!-- end click event -->
				</b-col>
			</b-row>
		</b-col>
		<!--end right side-->
	</b-row>
  </div>
</template>

<script>
import Pie from "./chart/PieChart.vue";
import YearBar from "./chart/dealYearChart.vue";
import MonthLine from "./chart/dealMonthChart.vue";
import YearInfo from "./info/dealYearInfo.vue";
import MonthInfo from "./info/dealMonthInfo.vue";
import {mapGetters, mapActions} from "vuex";
import rest from "@/js/httpCommon.js";

export default {
    components: {
	   Pie,
	   YearBar,
	   MonthLine,
	   YearInfo,
	   MonthInfo
    },
	data() {
		return{
			yearIdx:-1,
			monthIdx:-1,
			dongIdx:0,
			priceKey:0,
			priceKeys: ["최고가", "최저가", "평균가"],
			guData:'구',
			dongData:'동',
			gus:[
				'강남구',
				'강동구',
				'강북구',
				'강서구',
				'관악구',
				'광진구',
				'구로구',
				'금천구',
				'노원구',
				'도봉구',
				'동대문구',
				'동작구',
				'마포구',
				'서대문구',
				'서초구',
				'성동구',
				'성북구',
				'송파구',
				'양천구',
				'영등포구',
				'용산구',
				'은평구',
				'종로구',
				'중구',
				'중랑구',
			],
			dongs:[],
		}
	},
	computed:{
        ...mapGetters(["userinfo" ,"pieChartInfo", "isLogin", "yearChartInfo", "monthChartInfo"]),
    },
	methods: {
		...mapActions(["getStatInfo"]),
		changeDong(idx){
			console.log('선택한 인덱스', idx);
			this.dongIdx = idx;
			console.log("idx확인 : "+this.dongIdx);
			this.yearIdx = -1;
			this.monthIdx = -1;
			this.$store.dispatch('getStatInfo' , this.userinfo.address[this.dongIdx].dong);
		},
		changeKey(idx){
			this.priceKey = idx;
		},
		changeYearIdx(data) {
			this.yearIdx = data;
			console.log("연간 그래프 클릭됨", this.yearIdx);
		},
		changeMonthIdx(data) {
			this.monthIdx = data;
			console.log("월간 그래프 클릭됨", this.monthIdx);
		},
		changeClickColor(event, idx){
			console.log("클릭이벤트")
			let mydongs = document.getElementsByClassName("mydongs");
			console.log(mydongs);

			for (var i = 0; i < mydongs.length; i++) {
				mydongs[i].classList.remove("clicked");
			}
			event.target.classList.add("clicked");
			this.changeDong(idx);
		},
		selectGu(item){
			this.guData = item;
			rest.deal({
				url:"getDongByGu?gu="+item,
			}).then(res =>{
				this.dongs = res.data;
				this.dongData='동';
			}).catch(()=>{
				alert("오류가 발생했습니다!")
			})
			},
		search(){
			let mydongs = document.getElementsByClassName("mydongs");
			console.log(mydongs);

			for (var i = 0; i < mydongs.length; i++) {
				mydongs[i].classList.remove("clicked");
			}
			console.log("찾기 아이콘 클릭");
			console.log(this.dongData);
			this.$store.dispatch('getStatInfo' , this.dongData);
		},
		goSearch(){
			this.$router.push({
                path:"/search",
            })
		}
	},
	// watch:{
	// 	yearChartInfo:function(){
	// 		this.yearIdx= 0;
	// 	},
	// 	monthChartInfo:function(){
	// 		this.monthIdx = 0;
	// 	}
	// }
	// mounted() {
	// 	let mydong = document.getElementsByClassName("mydongs")[0];
	// 	console.log("마이동")
	// 	console.log(mydong);
	// 	mydong.classList.add("clicked");
	// },
}

</script>

<style>

</style>