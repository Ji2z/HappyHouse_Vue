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
              <b-form-input :value="question.user_name" readonly style="background-color:#fafafa"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="1">
              <label class="text-bold">제목:</label>
            </b-col>
            <b-col>
              <b-form-input :value="question.title" ref="title" readonly style="background-color:#fafafa"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="1">
              <label class="text-bold">내용:</label>
            </b-col>
            <b-col>
              <b-form-textarea style="background-color:#fafafa"
                :value="question.content"
                rows="3"
                max-rows="6"
                ref="content"
                readonly
              ></b-form-textarea>
            </b-col>
          </b-row>
        </div>

        <div v-if="userinfo.user_no === question.user_no" class="text-center">
           <b-button class="confirmBtn" @click="modifyItem">수정하기</b-button>
           <b-button variant="danger" @click="deleteItem">삭제하기</b-button>
           <b-button href="/qna" class="inputBtn">목록</b-button>
         </div>
         <div v-else class="text-center">
           <b-button href="/qna" class="inputBtn">목록</b-button>
         </div>

        <br />
        <div class="d-flex">
          <label>답변작성:</label>
          <b-form-textarea
            style="width: 1000px"
            v-model="answer.content"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-button class="confirmBtn" @click="postAnswer">등록</b-button>
        </div>
        <br />
        <h5 class="text-bold">답변</h5>
        <hr />
        <br />
        <div v-if="answers.length > 0">
          <div v-for="(item, idx) in answers" :key="idx" class="roundDiv ml-3 mr-2 mb-3 p-4 d-flex justify-content-between">
              <div>
                <div class="text-small"><span class="text-bold">{{item.user_name}}</span> {{item.day}} {{item.time}}</div>
                <div class="text-large">{{item.content}}</div>
              </div>
              <div>
                <b-button v-b-hover="handleHover" type="button" class="btn btn-outline-danger" style="height:100%;" @click="deleteInterest(item.num)">
                  <b-icon v-if="isHovered" icon="trash" class="trash" variant="white" aria-hidden="true"></b-icon>
                  <b-icon v-else icon="trash" class="trash" variant="danger" aria-hidden="true" @click="deleteAnswer(item)"></b-icon>
                </b-button>
                
              </div>
            </div>
          <!--
            <b-table :items="answers" :fields="fields">
              <template v-slot:cell(delete)="data">
                  <div class="delBtnDiv" v-if="userinfo.user_no === data.item.user_no">
                      <b-button size="sm" class="confirmBtn" @click="deleteAnswer(data.item)">
                        <b-icon icon="trash" variant="white" aria-hidden="true"></b-icon>
                      </b-button>
                  </div>
              </template>
            </b-table>
            -->
        </div>
        <div v-else class="text-center text-bold">답변이 없습니다ㅠㅠ</div>
      </b-container>
    </b-col>
    <b-col cols="1"></b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import rest from "@/js/httpCommon.js";

export default {
  data() {
    return {
      isHovered: false,
      question: {},
      answer: {},
      answers: [],
      fields: [{ key: 'content', label: "답변", thClass: 'w70'}, { key: 'user_name', label: "작성자", thClass: 'w8'}, { key: 'day', label: "날짜", thClass: 'w8' }, { key: 'time', label: "시간" , thClass: 'w6'}, {key: 'delete', label:"삭제", thClass: 'w8'}],
    };
  },
  computed: {
    ...mapGetters(["qnas", "userinfo"]),
  },
  methods: {
    modifyItem() {
      this.$router.push({
        path: "/qna/modify/" + this.question.id,
      });
    },
    deleteItem() {
      let token = localStorage.getItem("access-token")
      rest
        .qna({
          url: "/" + this.question.id,
          method: "delete",
          data: this.question,
          headers: {
            'jwt-auth-token' : token
          },
        })
        .then((res) => {
          if (res.data === 1) {
            alert("삭제되었습니다.");
            this.$router.push({
              path: "/qna/",
            });
          }
        });
    },
    deleteAnswer(ans) {
        let token = localStorage.getItem("access-token")
        rest.qna({
            url:"/"+this.question.id+"/"+ans.id,
            method: "delete",
            data: ans,
            headers: {
              'jwt-auth-token' : token
            },
        }).then((res) => {
            if(res.data === 1){
                alert("삭제되었습니다.");
                this.reload();
            }else {
                alert("삭제에 실패하였습니다.");
            }
        });
    },
    postAnswer() {
      let token = localStorage.getItem("access-token")
      if (!this.answer) {
        alert("답변을 입력해주세요.");
      } else {
        this.answer.question_id = this.question.id;
        this.answer.user_no = this.userinfo.user_no;
        console.log(this.answer);
        rest
          .qna({
            url: "/" + this.question.id,
            data: this.answer,
            method: "post",
            headers: {
              'jwt-auth-token' : token
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              alert("등록되었습니다.");
              this.answer = {};
              this.reload();
              //this.answers.push(this.answer);
            } else {
              alert("등록에 실패하였습니다.");
            }
          }); 
      }
    },
    reload() {
      let token = localStorage.getItem("access-token")
      let id = this.$route.params.id;
        rest
      .qna({
        url: id,
        method: "get",
        headers: {
          'jwt-auth-token' : token
        },
      })
      .then((res) => {
        this.question = res.data;
        this.answers = this.question.answers;
        console.log(this.question);
      });
    }
  },
  created() {
    let token = localStorage.getItem("access-token")
    let id = this.$route.params.id;
    rest
      .qna({
        url: id,
        method: "get",
        headers: {
          'jwt-auth-token' : token
        },
      })
      .then((res) => {
        this.question = res.data;
        this.answers = this.question.answers;
        console.log(this.question);
      });
  },
};
</script>

<style scoped>
* {
  margin: 5px;
}
</style>
