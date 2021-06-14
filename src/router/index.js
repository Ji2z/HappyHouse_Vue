import Vue from "vue";
import VueRouter from "vue-router";
import QnAList from "../components/qna/QnAList.vue"
import QnAListItem from "../components/qna/QnAListItem.vue"
import QnAListItemModify from "../components/qna/QnAListItemModify.vue"
import QnAListItemCreate from "../components/qna/QnAListItemCreate.vue"
import Join from "../components/member/Join.vue"
import MemberManager from "../components/member/MemberManager.vue"
import Interest from "../components/member/Interest.vue"
import Search from "../components/Search.vue"
import Index from "../components/Index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/qna",
    name: "QnAList",
    component: QnAList,
  },
  {
    path: "/qna/item/:id",
    name: "QnAListItem",
    component: QnAListItem,
  },
  {
    path: "/qna/create",
    name: "QnAListItemCreate",
    component: QnAListItemCreate,
  },
  {
    path: "/qna/modify/:id",
    name: "QnAListItemModify",
    component: QnAListItemModify,
  },
  {
    path: "/member/join",
    name: "Join",
    component: Join,
  },
  {
    path: "/member/manager",
    name: "MemberManager",
    component: MemberManager,
  },
  {
    path: "/member/interest",
    name: "Interest",
    component: Interest,
  },
  {
    path: "/search/:keyword",
    name: "Search",
    component: Search,
  },
  {
    path: "/search",
    name: "Search2",
    component: Search,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
