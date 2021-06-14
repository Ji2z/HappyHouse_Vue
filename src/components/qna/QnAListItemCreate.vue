<template>
    <b-row>
    <b-col cols="1"></b-col>
    <b-col>
        <b-container fluid>
            <div class="roundDiv p-5 mb-3">
                <b-row>
                    <b-col sm="1">
                        <label class="text-bold">작성자:</label>
                    </b-col>
                    <b-col>
                        <b-form-input :value="userinfo.name" readonly></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="1">
                        <label class="text-bold">제목:</label>
                    </b-col>
                    <b-col>
                        <b-form-input v-model="question.title" ref="title"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="1">
                        <label class="text-bold">내용:</label>
                    </b-col>
                    <b-col>
                        <b-form-textarea v-model="question.content" rows="3" max-rows="6" ref="content"></b-form-textarea>
                    </b-col>
                </b-row>
            </div>

            <div class="text-center">
                <b-button class="confirmBtn" @click="postQuestion">등록하기</b-button>
                <b-button href="/qna" class="inputBtn">목록</b-button>
            </div>
        </b-container>
    </b-col>
    <b-col cols="1"></b-col>
  </b-row>
</template>

<script>
import {mapGetters} from "vuex";
import rest from "@/js/httpCommon.js";

export default {
    data() {
        return {
            question:{},
        }
    },
    computed:{
        ...mapGetters(["qnas","userinfo"]),
    },
    methods: {
        postQuestion(){
            if(this.checkValidate()){
                let token = localStorage.getItem("access-token")
                console.log(this.question);
                rest.qna({
                    data: this.question,
                    method: "post",
                    headers: {
                        'jwt-auth-token' : token
                    },
                }).then(res =>{
                    console.log(res.data);
                    if(res.data === 1){
                        alert("등록되었습니다.");
                        this.$router.push({
                            path:"/qna",
                        })
                    }else{
                        alert("등록에 실패하였습니다.")
                    }
                })
            }
        },
        checkValidate() {
            let keys = ["title", "content"];
            for (let key of keys) {
                if (!this.question[key]) {
                alert(key + " is empty");
                this.$refs[key].focus();
                return false;
                }
            }
            this.question.user_no = this.userinfo.user_no;
            return true;
        },
    },
};
</script>

<style scoped>
*{
    margin:5px;
}
</style>