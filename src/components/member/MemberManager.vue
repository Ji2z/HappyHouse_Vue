<template>
    <div id="app">
        <!-- 탭 -->

	<ul class="nav nav-tabs mt-3">
		<li class="nav-item"><a class="btnMember nav-link ml-3 text-default text-large text-bold"
			id="edit " href="#" @click="toggleShow">나의 회원정보</a></li>
		<li class="nav-item"><a class="btnMember nav-link text-default text-large text-bold"
			id="edit " href="#" @click="toggleModify">회원정보 수정</a></li>
		<li class="nav-item"><a class="btnMember nav-link text-default text-large text-bold"
			id="delete " href="#" @click="toggleDelete">탈퇴하기</a></li>
	</ul>

	<!-- 내 회원정보 -->
	<div v-if="showInfo" class="container profileView adminView mt-5 mb-5">
		<h1 class="text-title mb-5" style="font-size:2vw">내 정보</h1>
		<div class="roundDiv  p-5">
			<b-row class="d-flex mb-3">
				<b-col cols="3">
					<div class="text-default text-large text-bold">아이디</div>
				</b-col>
				<b-col cols="3">
					<div class="text-default text-large">{{userinfo.id}}</div>
				</b-col>
			</b-row>
			<b-row class="d-flex mb-3">
				<b-col cols="3">
					<div class="text-default text-large text-bold">이름</div>
				</b-col>
				<b-col cols="3">
					<div class="text-default text-large">{{userinfo.name}}</div>
				</b-col>
			</b-row>
			<b-row class="d-flex mb-3">
				<b-col cols="3">
					<div class="text-default text-large text-bold">이메일</div>
				</b-col>
				<b-col cols="3">
					<div class="text-default text-large">{{userinfo.email}}</div>
				</b-col>
			</b-row>
			<b-row class="d-flex">
				<b-col cols="3">
					<div class="text-default text-large text-bold">관심 지역</div>
				</b-col>
				<b-col>
					<div v-if="userinfo.address.length==0" class="text-default text-large">관심있는 지역이 없습니다.</div>
					<div v-else class="text-default text-large">
						<span class="mr-2" v-for="(item,idx) in userinfo.address" :key="idx">{{item.dong}}</span>
					</div>
				</b-col>
			</b-row>
		</div>
		<div class="container-fluid text-center">
			<button class="btn btn-warning mt-3 text-large" id="goToEdit" @click="toggleModify">수정하기</button>
		</div>
	</div>

	<!-- 회원정보 수정 -->
	<div v-if="modifyInfo" class="container editView adminView mt-5 mb-5">
		<h1 class="text-title mb-3" style="font-size:2vw">회원정보 수정</h1>
		<div class="roundDiv p-5">
				<b-row class="form-group">
					<b-col cols="3">
						<label for="inputId">아이디</label>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputId" :value="userinfo.id" disabled>
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputPassword">새 비밀번호</label>
					</b-col>
					<b-col>
						<input type="password" class="form-control" id="inputPassword" name="userpwd" placeholder="new password" v-model.lazy="newinfo.password" style="font-family: auto;">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">
						<label for="inputPasswordCheck">새 비밀번호 확인</label>
					</b-col>
					<b-col>
						<input type="password" class="form-control" name="userpwdCheck" id="inputPasswordCheck" placeholder="new password" v-model.lazy="newinfo.passwordc" style="font-family: auto;">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputName">이름</label><br>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputName" name="username" :placeholder="userinfo.name" v-model.lazy="newinfo.name">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputEmail">이메일</label>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputEmail" name="useremail" :placeholder="userinfo.email" v-model.lazy="newinfo.email">
					</b-col>	
				</b-row>
				<div class="d-flex p-4">
					<button type="button" class="btn btn-block btn-warning" id="modiBtn" @click="modify">수정하기</button>
				</div>
		</div>
	</div>

	<!-- 회원탈퇴 -->
	<div v-if="deleteInfo" class="container deleteView adminView mt-5 mb-5">
		<h1 class="text-title" style="font-size:2vw">탈퇴하기</h1>
		<p class="mt-3">탈퇴할 경우 사용자의 데이터를 복구할 수 없습니다.</p>
		<div class="d-flex">
			<p>그래도 탈퇴를 원하실 경우 아래 입력창에</p>
			<p class="font-weight-bold font-italic">'탈퇴한다'</p>
			<p>를 적으신 후, 버튼을 눌러주세요.</p>
		</div>
		<div class="container-fluid text-center">
			<form action="" method="post" id="deleteform">
				<input type="text" class="form-control" placeholder="탈퇴한다" id="deleteInput" v-model="confirmDelete">
				<button type="button" class="btn btn-block btn-danger mt-2" id="deleteBtn" @click="deleteUser">탈퇴하기</button>
			</form>
		</div>
	</div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import rest from "@/js/httpCommon.js";
export default {
	data() {
		return {
			showInfo: true,
			modifyInfo: false,
			deleteInfo: false,
			newinfo:{
				password:'',
				passwordc:'',
				name:'',
				email:'',
			},
			confirmDelete:'',
		}
	},
	methods: {
		toggleShow: function(){
			this.showInfo = true;
			this.modifyInfo = false;
			this.deleteInfo = false;
		},
		toggleModify: function(){
			this.showInfo = false;
			this.modifyInfo = true;
			this.deleteInfo = false;
		},
		toggleDelete: function(){
			this.showInfo = false;
			this.modifyInfo = false;
			this.deleteInfo = true;
		},
		modify(){
			console.log(this.newinfo);
			if(this.checkValidate()){
				rest.user({
					url: ""+this.userinfo.user_no,
					method:"put",
					data:this.newinfo,
					headers:{
						"jwt-auth-token":localStorage.getItem("access-token"),
					}
				}).then(res=>{
					console.log(res);
					if(res.status==202){
						let token = res.headers["jwt-auth-token"];
						localStorage.setItem("access-token", token)
						console.log("토큰 값 저장 완료, 수정 성공")
						alert("수정되었습니다.");
						this.$store.dispatch('getUserInfo')
					}
				}).catch(e=>{
					console.log("수정 에러발생")
					console.log(e);
				})
			}
		},
		deleteUser(){
			console.log(this.confirmDelete);
			if(this.confirmDelete=="탈퇴한다"){
				rest.user({
					url:""+this.userinfo.user_no,
					method:"delete",
					headers:{
						"jwt-auth-token":localStorage.getItem("access-token"),
					}
				}).then(res=>{
					console.log(res);
					alert("탈퇴되었습니다.")
					window.location="/";
				}).catch(e=>{
					console.log("탈퇴 에러발생")
					console.log(e);
				})
			}else{
				alert("정확하게 입력해주세요.");
			}
		},
		checkValidate(){
			if(this.newinfo.password != ''){
				if(this.newinfo.password != this.newinfo.passwordc){
					alert("비밀번호가 같지 않습니다.")
					return false;
				}
			}
			if(this.newinfo.password=='' && this.newinfo.name=='' && this.newinfo.email==''){
				alert("빈칸을 채워주세요");
				return false;
			}
			return true;
		}
	},
	computed: {
    ...mapGetters(["userinfo"]),
    },
};

/*
$("#modiBtn").on('click', function() {
		let modiinfo = JSON.stringify({
			id : $("#inputId").val(),
			password : $("#inputPassword").val(),
			name : $("#inputName").val(),
			email : $("#inputEmail").val()
		})
		
		console.log("수정 정보 : " + modiinfo);
		
		$.ajax({
			url:'${root}/rest/user',
			type:'PUT',
			data: modiinfo,
			contentType: 'application/json;charset=utf-8',
			success:function(user){
				alert("수정 완료");
				console.log(modiinfo + " 수정 성공");
			}
		})
	});
	
	$("#deleteBtn").on('click', function() {
		if($("#deleteInput").val() == "탈퇴한다"){
			
			$.ajax({
				url:'${root}/rest/user',
				type:'DELETE',
				success:function(user){
					if(user){
						alert("탈퇴 완료");
						console.log(deleteinfo +  " 탈퇴 성공 ");	
						location.href="/";
					}	
				}
			})
		} else{
			alert("정확히 적어주세요.");
		}
	});
	$(".btnMember").on('click', function() {
		let list = $(".adminView");
		list.css("display", "none");
		let str = $(this).text();
		if (str == "나의 회원정보") {
			$(".profileView").css("display", "block");
		} else if (str == "회원정보 수정") {
			$(".editView").css("display", "block");
		} else if (str == "탈퇴하기") {
			$(".deleteView").css("display", "block");
		} else {
			$(".searchView").css("display", "block");
		}
		//alert($(this).text());
	})
	$("#goToEdit").on('click', function() {
		$(".profileView").css("display", "none");
		$(".editView").css("display", "block");
		//alert($(this).text());
	})
*/
</script>

<style scoped>

</style>