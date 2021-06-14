<template>
<div>
	<b-row class="blank-div"></b-row>
	<b-row>
	<b-col></b-col>

	<b-col cols="9" class="d-flex justify-content-between">
		<div class=" justify-content-start d-flex">
			<h2 class="text-center">
				<a class="text-header-title" href="/">Happy House</a><br>
			</h2>
			<p class="text-center text-default mt-1 ml-3 font-italic font-weight-lighter">
				아파트별, 동별 실거래가 검색
			</p>
		</div>

		<div class="d-flex">
			<div class="mr-3"><a class="text-default" href="/qna">질문 게시판</a></div>
			<div class="d-flex" v-if="userinfo != null">
				<p class="mr-3 text-default"> | </p>
				<a class="text-default user" href="/member/interest">관심 지역 설정</a>
			</div>	
		</div>

		<div class="d-flex">
			<div class="d-flex" v-if="userinfo == null">
				<a class="text-color-light guest" @click="showModal">로그인</a>
				<p class="ml-2 mr-2 text-color-dark"> | </p>
				<a class="text-color-light guest" id="joinBtn" @click="goJoin">회원가입</a>
			</div>
			<div class="d-flex" v-if="userinfo != null">
				<a class="text-color-light user" href="/member/manager">{{userinfo.name}}님</a>
				<p class="ml-2 mr-2 text-color-dark"> | </p>
				<a class="text-color-light user" id="logoutBtn" @click="logout">로그아웃</a>
			</div>
		</div>
	
		<!-- 로그인 Modal -->
		<b-modal class="my-modal grad-color" ref="login-modal" id="loginModal" title="로그인" hide-footer>
			<!-- Modal body -->
			<form id="loginform">
				<div class="form-group m-4">
					<label class="text-default text-large" for="usrId">아이디:</label>
					<input type="text" class="form-control text-default text-large" id="usrId" name="usrId" v-model.lazy="user.id">
				</div>
				<div class="form-group m-4">
					<label class="text-default text-large" for="usrPwd">비밀번호:</label>
					<input type="password" class="form-control" id="usrPwd" name="usrPwd" v-model="user.password" style="font-family: auto;">
				</div>
			</form>

			<!-- Modal footer -->
			<div class="modal-footer">
				<button type="button" class="btn confirmBtn text-large" id="loginBtn" @click="loginCheck">로그인</button>
				<button type="button" class="btn cancelBtn text-large" @click="hideModal">취소</button>
			</div>
		</b-modal>	
	</b-col>
	<b-col></b-col>
	</b-row>
	<div class="mb-4"></div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
    data() {
        return {
			user:{
				id:'',
				password:'',
			},
			status:"",
			token:"",
		};
    },
    computed: {
		...mapState(["isLogin", "isLoginError"]),
        ...mapGetters(["userinfo", "monthChartInfo"]),
    },
	methods: {
		...mapActions(["login", "logout", "getUserInfo"]),
		showModal(){
			this.$refs['login-modal'].show();
		},
		hideModal(){
			this.$refs['login-modal'].hide();
		},
		loginCheck(){
			this.$store.dispatch('login' , this.user)
			this.hideModal();
		},
		logout(){
			this.$store.dispatch('logout' , this.user);
			console.log(this.$router)
			console.log(this.$route)
			if(this.$route.fullPath!="/"){
				window.location="/";
			}else{
				console.log("맞음")
			}
			
		},
		goJoin(){
			window.location="/member/join";
		}
	},
	created() {
		this.$store.dispatch('getUserInfo')
		console.log(this.monthChartInfo);
	},
};
</script>

<style scoped>
p, a{
	line-height: 60px;
	height: 60px;
}
input{
	color:black;
}
</style>