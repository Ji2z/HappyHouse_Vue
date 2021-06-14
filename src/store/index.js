import Vue from "vue";
import Vuex from "vuex";
import rest from "@/js/httpCommon.js";
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qnas: [],
    userinfo: null,
    isLogin: false,
    isLoginError: false,
    pieChartInfo: [],
    yearChartInfo: [],
    monthChartInfo: [],
    searchData:[0,],
  },
  getters: {
    qnas(state) {
      return state.qnas;
    },
    userinfo(state) {
      return state.userinfo;
    },
    pieChartInfo(state) {
      return state.pieChartInfo;
    },
    yearChartInfo(state) {
      return state.yearChartInfo;
    },
    monthChartInfo(state) {
      return state.monthChartInfo;
    },
    isLogin(state) {
      return state.isLogin;
    },
    searchData(state) {
      return state.searchData;
    }
  },
  mutations: {
    setQnas(state, payload) {
      state.qnas = payload;
    },
    setUserinfo(state, payload) {
      state.userinfo = payload;
    },
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userinfo = payload
      console.log("userinfo : " + state.userinfo)
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userinfo = null
      localStorage.removeItem("access-token");
    },
    setDefault(state) {
      state.pieChartInfo = [];
      state.yearChartInfo = [];
      state.monthChartInfo = [];
    },
    setPieChartInfo(state, payload){
      state.pieChartInfo.push(payload);
    },
    setYearChartInfo(state, payload){
      state.yearChartInfo.push(payload);
    },
    setMonthChartInfo(state, payload){
      state.monthChartInfo.push(payload);
    },
    setSearchData(state, payload) {
      state.searchData = [];
      state.searchData.push(payload);
    }
  },
  actions: {
    setSearchData(store, keyword) {
      if(keyword.charAt(0) == 'D'){
        		let dongData = keyword.substring(1);
        		rest.deal({
        			url:"dong/"+dongData,
        		}).then(res =>{
        			//console.log(res.data);
        			store.commit("setSearchData", res.data);
        		}).catch(()=>{
        			alert("오류가 발생했습니다!")
        		})
        	}else if(keyword.charAt(0) == 'A'){
        		let aptName = keyword.substring(1);
        		rest.deal({
        			url:"apt/"+aptName,
        		}).then(res =>{
        			store.commit("setSearchData", res.data);
        		}).catch(()=>{
        			alert("오류가 발생했습니다!")
        		})
        	}
    },
    setQnas(store) {
      rest.qna({
        
      }).then(res => {
        console.log(res);
        store.commit("setQnas", res.data);
      }).catch(err => {
        console.log(err);
        alert("목록 조회 실패");
      })
    },
    setUserinfo(store, payload) {
      store.commit("setUserinfo", payload);
    },
    login({ dispatch }, payload) {
      console.log("로그인 유저 정보 : " + payload.id + " , "  + payload.password);
			rest.default({
				url:"login",
				method:"post",
				data:payload,
      }).then(res => {
        console.log("데이터 검증 중")
        if(res.data.status && res.data.data){
          //this.hideModal();
          let token = res.headers["jwt-auth-token"];
          localStorage.setItem("access-token", token)
          console.log("토큰 값 저장 완료, 로그인 성공")
          alert("로그인 성공")
          dispatch("getUserInfo")
        } else {
          console.log("로그인 데이터에 오류 있음")
          alert("아이디와 비밀번호를 확인해주세요.");
        }
        }).catch((e) =>{
				console.log(e);
				alert("존재하지 않는 아이디입니다.");
			})
    },
    logout({ commit, dispatch }) {
      commit("logout");
      dispatch("getStatInfo", "역삼동");
      alert("로그아웃 되었습니다.");
    },
    getUserInfo({ commit , dispatch}) {
      console.log("유저 정보 받아오는 중")
      let token = localStorage.getItem("access-token")
      console.log("저장되어있는 토큰 : " + token)
      rest.user({
        method: "post",
        headers: {
          'jwt-auth-token' : token
        },
      }).then(res => {
        commit("loginSuccess", res.data.User);
        console.log("유저 정보 받아오기 성공")
        console.log(res.data.User);
        console.log(res.data.User.address);
        // for문 돌기 전에 배열 비우고 값을 push
        //commit("setDefault");
        // getInterestInfo 관심 지역 관련 차트 정보 User.address의 길이만큼 for문
        if (res.data.User.address.length > 0) {
          dispatch("getStatInfo", res.data.User.address[0].dong);
          // for (let item of res.data.User.address) {
          //   let dong = item.dong;
          //   dispatch("getStatInfo", dong);
          // }
        } else {
          dispatch("getStatInfo", "역삼동");
        }
      }).catch(err => {
        console.log("유저 정보 받아오기 실패")
        console.log(err);
        commit("setDefault");
        dispatch("getStatInfo", "역삼동");
      })
    },
    getStatInfo(store, dong) {
      store.commit("setDefault");
      var month = new Date().getMonth()+1;

      // 일년치 => 월간
      console.log(dong+" 차트 정보 가져오는 중...")
      rest.deal({
        url: "stat/"+dong,
      }).then(res => {
        console.log("일년치 정보 : ");
        console.log(res.data);
        store.commit("setYearChartInfo", res.data);
      }).catch({});

      // 한달치 => 요일
      rest.deal({
        url: "stat/"+dong+"/"+month,
      }).then(res => {
        console.log("한달치 정보 : ");
        console.log(res.data);
        store.commit("setMonthChartInfo", res.data);
      }).catch({});

      // 상권 분석
      rest.deal({
        url: "store/"+dong,
      }).then(res => {
        console.log("상권 정보 : ");
        console.log(res.data);
        store.commit("setPieChartInfo", res.data);
      }).catch({});
    },
  },
});
