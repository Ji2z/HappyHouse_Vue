<template>
    <div>
		<b-row class="ml-1">
			<b-col cols="1"></b-col>
			<b-col cols="3">
				<!-- 드롭다운 검색 -->
				<div class="d-flex justify-content-center mb-2">
					<div class="d-flex">
					<b-dropdown id="dropdown-1" text="서울특별시" class="dropdownBtn mr-2">
						<b-dropdown-item class="dropdownBtn">서울특별시</b-dropdown-item>
					</b-dropdown>
					<b-dropdown id="dropdown-1" v-model='guData' :text=guData class="dropdownBtn mr-2">
						<b-dropdown-item v-for="(gu,idx) in gus" :key="idx" :value="gu" class="dropdownBtn" @click="selectGu(gu)" >{{gu}}</b-dropdown-item>
					</b-dropdown>
					<b-dropdown id="dropdown-1" v-model='dongData' :text=dongData class="dropdownBtn mr-2">
						<b-dropdown-item v-for="(dong,idx) in dongs" :key="idx" :value="dong.dong" class="dropdownBtn" @click="selectDongBtn(dong)">{{dong.dong}}</b-dropdown-item>
					</b-dropdown>
					</div>
				</div>
				<div class="text-center">
					<b-button type="button" class="confirmBtn" style="height:100%;" @click="addInterest">관심지역으로 추가</b-button>
				</div>

				<div class="mb-3"></div>
				<hr>
				<h3 class="text-title ml-3 text-center">관심지역 목록</h3>
				<hr>
				<div class="pre-scrollable text-left" id="interestInfo" style="min-height: 87%;">
					<div v-if="userinfo.address.length==0">등록된 관심지역이 없습니다.</div>	
					<div v-for="(item, idx) in userinfo.address" :key="idx" class="roundDiv ml-3 mr-2 mb-3 pt-2 pb-2 pl-4 pr-4 d-flex justify-content-between">
						<div>
							<span class="text-title">{{item.dong}} </span>
							<span>{{item.gugun}}</span>
						</div>
						<div>
							<b-button v-b-hover="handleHover" type="button" class="btn btn-outline-danger text-small" style="height:100%;" @click="deleteInterest(item.num)">
								<b-icon v-if="isHovered" icon="trash" class="trash" variant="white" aria-hidden="true"></b-icon>
								<b-icon v-else icon="trash" class="trash" variant="danger" aria-hidden="true"></b-icon>
							</b-button>
							
						</div>
					</div>
				</div>
			</b-col>
			<!-- 지도 -->
			<b-col>
				<GmapMap id="map" ref="mapRef" :center="center" :zoom="11" style="height:65vh">
					<GmapMarker v-for="(item, idx) in userinfo.address" :key="idx"
					:position="item"
					@click="center=item"
					:clickable="true"
					:icon="{url:require('../../assets/pin/starPin35.png')}">
						<gmap-info-window>
							<div>
								<div class="text-title">{{item.dong}}</div>
							</div>
						</gmap-info-window>
					</GmapMarker>
					<GmapMarker v-for="item in dongs" :key="item.num"
					:position="item"
					:icon="{url:require('../../assets/pin/normalPin35.png')}"
					@mouseover="showByIndex = item.num"
        			@mouseout="showByIndex = -1">
						<gmap-info-window :opened="showByIndex === item.num">
							<div>
								<div>{{item.dong}}</div>
							</div>
						</gmap-info-window>
					</GmapMarker>
				</GmapMap>
			</b-col>
			<b-col cols="1"></b-col>
		</b-row>

    </div>
</template>

<script>
import rest from "@/js/httpCommon.js";
//import {gmapApi as google} from "vue2-google-maps";
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			showByIndex:-1,
			guData:'구',
			dongData:'동',
			selectDong:{},
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
			center: {
				lat: 37.5574976,
				lng: 126.9858981,
			},
			isHovered: false
		}
	},
	computed: {
        ...mapGetters(["userinfo"]),
    },
	methods: {
		...mapActions(["getUserInfo"]),
		addInterest(){
			console.log(this.dongs);
			console.log(this.selectDong);
			rest.user({
				url:this.userinfo.user_no+"/interest/"+this.selectDong.num,
				method:"post",
				data:this.userinfo,
				headers: {
					'jwt-auth-token' : localStorage.getItem("access-token"),
				},
			}).then(res=>{
				if(res.status==202){
					let token = res.headers["jwt-auth-token"];
					localStorage.setItem("access-token", token)
					console.log("토큰 값 저장 완료, 관심지역 추가 성공")
					alert("추가되었습니다.");
					this.$store.dispatch('getUserInfo')
					this.dongs = [];
				}
				console.log(res);
			}).catch(e=>{
				alert("잠시 후 다시 시도해주세요.")
				console.log("관심지역 추가 에러 :" + e);
			})
		},
		deleteInterest(num){
			rest.user({
				url:this.userinfo.user_no+"/interest/"+num,
				method:"delete",
				headers: {
					'jwt-auth-token' : localStorage.getItem("access-token"),
				},
			}).then(res=>{
				if(res.status==202){
					let token = res.headers["jwt-auth-token"];
					localStorage.setItem("access-token", token)
					console.log("토큰 값 저장 완료, 관심지역 삭제 성공")
					alert("삭제되었습니다.");
					this.$store.dispatch('getUserInfo')
				}
				console.log(res);
			}).catch(e=>{
				alert("잠시 후 다시 시도해주세요.")
				console.log("관심지역 삭제 에러 :" + e);
			})
		},
		selectGu(item){
			this.guData = item;
			rest.deal({
				url:"getDongByGu?gu="+item,
			}).then(res =>{
				this.dongs = res.data;
				this.dongData='동';
				//this.center = this.dongs[0];
			}).catch(()=>{
				alert("오류가 발생했습니다!")
			})
		},
		selectDongBtn(item){
			this.selectDong = item;
			this.dongData = item.dong;
		},
		handleHover(hovered){
			this.isHovered = hovered;
		}
	},
};

</script>

<style scoped>
#interestInfo::-webkit-scrollbar{
	display: none;
}
</style>