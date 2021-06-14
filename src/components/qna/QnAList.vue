<template>
    <div>
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <b-dropdown id="dropdown-1" v-model='searchFilter' :text="searchFilter" class="dropdownBtn mr-2">
                    <b-dropdown-item v-for="(filter,idx) in filters" :key="idx" :value="filter" @click="selectFilter(filter)" class="dropdownBtn">{{filter}}</b-dropdown-item>
                </b-dropdown>
                <b-form-input class="keywordInput" style="width:50vw" v-model.lazy="keyword" placeholder="검색어를 입력하세요." @keyup.13="search"></b-form-input>
                <b-button type="button" class="confirmBtn searchBtn" variant="light" @click="search">검색</b-button>
            </div>
            <div>
                <b-button class="confirmBtn" @click="create">질문 작성하기</b-button>
            </div>
        </div>

    <div style="height:600px">
        <div style="height:430px">
         <b-table v-if="!keyword" class="roundDiv qnaTable" id="qna-table" :items="qnas" :fields="fields" bordered hover selectable select-mode="single" @row-clicked="move" :per-page="perPage" :current-page="currentPage">
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template #cell(answers)="data">
                {{ data.value.length }}
            </template>
        </b-table>
        <b-table v-else class="roundDiv qnaTable" id="search-table" :items="keywordResult" :fields="fields" bordered hover selectable select-mode="single" @row-clicked="move" :per-page="perPage" :current-page="currentPage">
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template #cell(answers)="data">
                {{ data.value.length }}
            </template>
        </b-table>
        </div>
        <b-pagination class="pagination" v-if="!keyword" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="qna-table" align="center"></b-pagination>
        <b-pagination class="pagination" v-else v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="search-table" align="center"></b-pagination>
         </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import 'bootstrap/dist/css/bootstrap.min.css'
import rest from "@/js/httpCommon.js";

export default {
    data() {
        return {
            fields:[
                {index:"글 번호"},
                {user_name:"작성자"},
                {title :"제목"},
                {day:"작성 날짜"},
                {answers: "답변 수"}
            ],
            keyword:'',
            keywordResult:[],
            filters:[
            '작성자',
            '제목',
            '내용',
            ],
            searchFilter: "필터",
            perPage:9,
            currentPage:1,
        }
    },
    computed:{
        ...mapGetters(["qnas","userinfo"]),
        rows(){
            if(!this.keyword){
                return this.qnas.length;
            }else {
                return this.keywordResult.length;
            }
        }
    },
    created() {
        this.$store.dispatch("setQnas");
    },
    methods:{
        selectFilter(item) {
            this.searchFilter = item;
        },
        move(item){
            console.log(this.userinfo);
            if(this.userinfo){
                this.$router.push({
                    path:"/qna/item/"+item.id,
                })
            }else{
                alert("로그인 후 이용해주세요.")
            }
        },
        create(){
            console.log("글 작성 권한 : " + this.userinfo);
            if(this.userinfo){
                this.$router.push({
                    path:"/qna/create",
                })
            }else{
                alert("로그인 후 이용해주세요.")
            }
        },
        search() {
            if (this.keyword) {
                if(this.searchFilter == '필터' || this.searchFilter == '제목'){
                    rest.qna({
                        url:"keyword/title/"+this.keyword,
                    }).then(res => {
                        this.keywordResult = res.data;
                    })
                }else if(this.searchFilter == '작성자') {
                    rest.qna({
                        url:"keyword/name/"+this.keyword,
                    }).then(res => {
                        this.keywordResult = res.data;
                    })
                }else {
                    rest.qna({
                        url:"keyword/content/"+this.keyword,
                    }).then(res => {
                        this.keywordResult = res.data;
                    })
                }
            }
        },
    }
};
</script>

<style scoped>
*{
    text-align: center;
    margin: 20px;
}
</style>