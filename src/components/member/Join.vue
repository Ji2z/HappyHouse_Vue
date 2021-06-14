<template>
    <div id="app">
        <div class="container registerView adminView mt-5 mb-5">
            <h1 class="text-title mb-5" style="font-size:2vw">회원가입</h1>
            <div class="roundDiv p-5">
				<b-row class="form-group">
					<b-col cols="3">
						<label for="inputId">아이디</label>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputId" v-model.lazy="newinfo.id">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputPassword">비밀번호</label>
					</b-col>
					<b-col>
						<input type="password" class="form-control" id="inputPassword" name="userpwd" v-model.lazy="newinfo.password" style="font-family: auto;">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">
						<label for="inputPasswordCheck">비밀번호 확인</label>
					</b-col>
					<b-col>
						<input type="password" class="form-control" name="userpwdCheck" id="inputPasswordCheck" v-model.lazy="newinfo.passwordc" style="font-family: auto;">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputName">이름</label><br>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputName" name="username" v-model.lazy="newinfo.name">
					</b-col>
				</b-row>
				<b-row class="form-group">
					<b-col cols="3">	
						<label for="inputEmail">이메일</label>
					</b-col>
					<b-col>
						<input type="text" class="form-control" id="inputEmail" name="useremail" v-model.lazy="newinfo.email">
					</b-col>	
				</b-row>
				<div class="d-flex p-4">
					<button type="button" class="btn btn-block btn-warning" id="modiBtn" @click="join">가입하기</button>
				</div>
		    </div>
	    </div>
    </div>
</template>

<script>
import rest from "@/js/httpCommon.js";
export default {
    data() {
        return {
            newinfo:{
                id:'',
                name:'',
                password:'',
                passwordc:'',
                email:'',
            },
        }
    },
    methods: {
        join(){
            if(this.checkValidate()){
                rest.default({
                    url:"register",
                    method:"post",
                    data: this.newinfo,
                }).then(res=>{
                    if(res.data){
                        console.log(res.data);
                        alert("회원가입 완료");
                        window.location="/";
                    }else{
                        console.log(res);
                    }
                }).catch(e =>{
                    alert("오류가 발생했습니다.")
                    console.log("회원가입 실패")
                    console.log(e);
                })
            }
        },
        checkValidate(){
            if(this.newinfo.password=='' || this.newinfo.name=='' || this.newinfo.email==''){
                alert("빈칸을 채워주세요");
                return false;
            }
			if(this.newinfo.password != ''){
				if(this.newinfo.password != this.newinfo.passwordc){
					alert("비밀번호가 같지 않습니다.")
					return false;
				}
			}
			return true;
		}
    },
};
</script>

<style scoped>

</style>