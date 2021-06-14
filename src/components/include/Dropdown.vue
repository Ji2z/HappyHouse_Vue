<template>
  <b-row>
    <b-col class="d-flex justify-content-center ml-2 mr-2">
      <div>
        <div class="d-flex mb-2">
          <div class="d-flex mr-4 roundDiv p-2">
            <b-dropdown id="dropdown-1" text="서울특별시" class="dropdownBtn mr-2">
              <b-dropdown-item class="dropdownBtn">서울특별시</b-dropdown-item>
            </b-dropdown>
            <b-dropdown id="dropdown-1" v-model='guData' :text=guData class="dropdownBtn mr-2">
              <b-dropdown-item v-for="(gu,idx) in gus" :key="idx" :value="gu" class="dropdownBtn" @click="selectGu(gu)" >{{gu}}</b-dropdown-item>
            </b-dropdown>
            <b-dropdown id="dropdown-1" v-model='dongData' :text=dongData class="dropdownBtn mr-2">
              <b-dropdown-item v-for="(dong,idx) in dongs" :key="idx" :value="dong.dong" class="dropdownBtn" @click="dongData = dong.dong">{{dong.dong}}</b-dropdown-item>
            </b-dropdown>
            <div>
              <b-button type="button" class="confirmBtn" style="height:100%;" @click="search(1)">검색</b-button>
            </div>
          </div>
          <div class="d-flex roundDiv p-2">
            <div class="mr-2">
              <b-form-input class="inputBtn text-default" style="width:100%" v-model.lazy="aptName" placeholder="아파트 이름으로 검색" @keyup.13="search"></b-form-input>
            </div>
            <div>
              <b-button type="button" class="confirmBtn" style="height:100%;" @click="search(2)">검색</b-button>
            </div>
          </div>
        </div>
      </div>
  </b-col>
</b-row>

</template>

<script>
import rest from "@/js/httpCommon.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
      aptName:'',
      resultData:[],
      center: {
				lat: 37.500131499999995,
				lng: 127.03242579999998,
			},
    }
  },
  methods: {
    ...mapActions(["setSearchData"]),
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
    search(key){
      console.log(this.$route)
      console.log("AA"+this.dongData)
        if(this.dongData != '동' && key ==1){
          this.$store.dispatch('setSearchData' , 'D'+this.dongData);
        }else if(this.aptName && key == 2){
          this.$store.dispatch('setSearchData' , 'A'+this.aptName);
        }else{
          alert("검색 조건을 설정해주세요")
        }
    },
  },
}
</script>

<style scoped>

</style>